from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import JsonResponse, HttpResponse
from django.utils import timezone
from datetime import date
import xlrd
import csv, os

from play.settings import BASE_DIR
from django.contrib.auth.models import User, Group
from .forms import CourseForm
from .models import Course, CourseHasStudent
from apps.student.models import Student
from apps.play.models import Play


@login_required
def view_courses(request):
    #courses = Course.objects.all()
    courses = Course.objects.filter(
        teacher=request.user.teacher)#.order_by('id').reverse()
    return render(request, 'course/index.html', {'courses': courses})


@login_required
def show_course(request, course_id_char):
    course = Course.objects.get(id_char=course_id_char)
    students = course.student.all().order_by('user__last_name')
    plays = Play.objects.filter(course=course)
    return render(
        request,
        'course/show.html',
        {'course': course, 'students': students, 'plays': plays})


@login_required
def create_course(request):
    if request.method == "POST":
        form = CourseForm(request.POST)        
        if form.is_valid():
            course = form.save(commit=False)
            course.teacher = request.user.teacher
            course.year = date.today().year
            course.creation_date = timezone.now()
            course.id_char = "{0}{1}{2}".format(
                course.name.replace(" ", "")[:6].upper(),
                course.year,
                course.semester)           
            course.save()
            course.id_char = "{0}{1}{2}".format(
                course.id_char,
                course.id,
                request.user.teacher.user_id)
            course.save()
            return redirect('course:show', course_id_char=course.id_char)
    else:
        form = CourseForm()
    return render(request, 'course/create.html', {'form': form, 'title': 'Crear Curso'})


@login_required
def edit_course(request, course_id_char):
    course = Course.objects.get(id_char=course_id_char)
    if request.method == 'GET':
        form = CourseForm(instance=course)
    else:
        form = CourseForm(request.POST, instance=course)
        if form.is_valid():
            form.save()
        return redirect('course:index')
    return render(request, 'course/create.html', {'form': form, 'title': 'MAs Play - Editar Curso'})


@login_required
def delete_course(request, course_id):
    course = Course.objects.get(id=course_id)
    if request.method == 'POST':
        course.delete()
        messages.add_message(request, messages.SUCCESS, course.code +
                             ' ' + course.name + ' borrado exitosamente')
        return redirect('course:index')    


@login_required
def add_students(request, course_id_char):
    course = Course.objects.get(id_char=course_id_char)
    course_id = course.id
    if request.method == 'POST':
        data = {}
        if request.FILES:
            csvfile = request.FILES['csv_file']
            
            fout = open(BASE_DIR+'/templates/course/{0}.xls'.format(course_id), 'wb')
            for chunk in csvfile.chunks():
                fout.write(chunk)
            fout.close() 

            book = xlrd.open_workbook(BASE_DIR+'/templates/course/{0}.xls'.format(course_id))
            sh = book.sheet_by_index(0)
            for rx in range(1, sh.nrows):
                rx_rut = sh.row(rx)[0].value.strip(" ").lstrip("0").upper()           
                if Student.objects.filter(rut=rx_rut):
                    #Account exist
                    student = Student.objects.get(rut=rx_rut)                
                    try:
                        #In this course
                        CourseHasStudent.objects.get(course=course, student=student)
                    except Exception as e:
                        #Havent this course
                        m = CourseHasStudent(course=course, student=student)
                        m.save()
                        data[student.user.id] = {'rut': student.rut, 'name': student.user.first_name,
                                                'last_name': student.user.last_name}
                else:
                    #New student                    
                    rx_last_name = sh.row(rx)[1].value.split(',')[0].strip(" ").title()
                    rx_first_name = sh.row(rx)[1].value.split(',')[1].strip(" ").title()
                    rx_email = sh.row(rx)[2].value.strip(" ")
                    rx_study = sh.row(rx)[3].value.strip(" ").title()
                    
                    user = User.objects.create_user(
                        username=rx_rut,
                        password=rx_rut,
                        first_name=rx_first_name,
                        last_name=rx_last_name)
                    user.save()
                    student = Student.objects.create(
                        user=user,
                        rut=rx_rut,
                        study=rx_study)

                    group = Group.objects.get(name='Students')
                    user.groups.add(group)
                    user.save()

                    m = CourseHasStudent(course=course, student=student)
                    m.save()
                    data[student.user.id] = {'rut': student.rut, 'name': student.user.first_name,
                                        'last_name': student.user.last_name}
                student = None
                m = None
            
            os.remove(BASE_DIR+'/templates/course/{0}.xls'.format(course_id))            
        else:            
            for i in request.POST.lists():
                if Student.objects.filter(rut=i[1][0].upper()):
                    student = Student.objects.get(rut=i[1][0].upper())
                    #print("Existe entre todos los estudiantes")
                    try:
                        CourseHasStudent.objects.get(course=course, student=student)
                        #print("Existe en el curso")
                    except Exception as e:
                        #print("No existe en el curso")
                        m = CourseHasStudent(course=course, student=student)
                        m.save()
                        data[student.user.id] = {'rut': student.rut, 'name': student.user.first_name,
                                            'last_name': student.user.last_name}
                else:
                    #print("Nuevo")
                    user = User.objects.create_user(
                        username=i[1][0].upper(),
                        password=i[1][0].upper(),
                        first_name=i[1][1],
                        last_name=i[1][2])
                    user.save()

                    student = Student.objects.create(
                        user=user,
                        rut=i[1][0].upper())

                    group = Group.objects.get(name='Students')
                    user.groups.add(group)
                    user.save()

                    m = CourseHasStudent(course=course, student=student)
                    m.save()
                    data[student.user.id] = {'rut': student.rut, 'name': student.user.first_name,
                                        'last_name': student.user.last_name}
                student = None
                m = None
    return JsonResponse(data)


@login_required
def download_template(request, course_id):
    if request.method == "GET":
        course = Course.objects.get(id=course_id)

        #response = HttpResponse(content_type='text/csv')
        #response['Content-Disposition'] = 'attachment; filename="EstudiantesCurso-{0}.csv"'.format(course.code)

        #writer = csv.writer(response)
        #writer.writerow(['RUT', 'NOMBRES', 'APELLIDOS', 'EMAIL'])

        xls = open(BASE_DIR+"/templates/course/StudentsTemplate.xls", "rb")

        response = HttpResponse(xls, content_type="application/vnd.ms-excel")
        response["content-Disposition"] = "attachment; filename='EstudiantesCurso-{0}.xls'".format(course.code)

        xls.close()

        return response

@login_required
def get_courses(request):    
    if request.method == "POST":
        #print("POST")
        data = {}
        courses = Course.objects.filter(teacher=request.user.teacher, year=date.today().year).order_by('id').reverse()

        for course in courses:
            data[course.id] = {"code": course.code, "name": course.name}

        return JsonResponse(data)