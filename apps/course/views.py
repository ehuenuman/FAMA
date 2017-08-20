from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import JsonResponse
from django.utils import timezone
from datetime import date
import csv, os

from .forms import CourseForm
from .models import Course, CourseHasStudent
from apps.student.models import Student


@login_required
def view_courses(request):
    #courses = Course.objects.all()
    courses = Course.objects.filter(
        teacher=request.user.teacher)#.order_by('id').reverse()
    return render(request, 'course/index.html', {'courses': courses})


@login_required
def show_course(request, course_id_char):
    course = Course.objects.get(id_char=course_id_char)
    students = course.student.all().order_by('last_name')
    return render(request, 'course/show.html', {'course': course, 'students': students})


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
    return render(request, 'course/create.html', {'form': form, 'title': 'MAs Play - Crear Curso'})


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
    # return render(request, 'course/create.html', {'form': form, 'title':
    # 'MAs Play - Editar Curso'})


@login_required
def add_students(request, course_id_char):
    course = Course.objects.get(id_char=course_id_char)
    course_id = course.id
    if request.method == 'POST':
        data = {}
        if request.FILES:
            csvfile = request.FILES['csv_file']
            
            fout = open('templates/course/{0}.csv'.format(course_id), 'wb')
            for chunk in csvfile.chunks():
                fout.write(chunk)
            fout.close()            

            with open('templates/course/{0}.csv'.format(course_id)) as csvfile:
                reader = csv.DictReader(csvfile)
                for row in reader:
                    #print(row['RUT'], row['NOMBRES'], row['APELLIDOS'], row['EMAIL'])  
                    if Student.objects.filter(rut=row['RUT'].upper()):
                        student = Student.objects.get(rut=row['RUT'].upper())
                        #print("Existe entre todos los estudiantes")
                        try:
                            CourseHasStudent.objects.get(course=course, student=student)
                            #print("Existe en el curso")
                        except Exception as e:
                            #print("No existe en el curso")
                            m = CourseHasStudent(course=course, student=student)
                            m.save()
                            data[student.id] = {'rut': student.rut, 'name': student.name,
                                                'last_name': student.last_name}
                    else:
                        #print("Nuevo")
                        student = Student.objects.create(
                            rut=row['RUT'].upper(), 
                            name=row['NOMBRES'], 
                            last_name=row['APELLIDOS'])
                            #Agregar email!
                        m = CourseHasStudent(course=course, student=student)
                        m.save()
                        data[student.id] = {'rut': student.rut, 'name': student.name,
                                            'last_name': student.last_name}
                    student = None
                    m = None

            os.remove('templates/course/{0}.csv'.format(course_id))
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
                        data[student.id] = {'rut': student.rut, 'name': student.name,
                                            'last_name': student.last_name}
                else:
                    #print("Nuevo")
                    student = Student.objects.create(rut=i[1][0].upper(), name=i[1][1], last_name=i[1][2])
                    m = CourseHasStudent(course=course, student=student)
                    m.save()
                    data[student.id] = {'rut': student.rut, 'name': student.name,
                                        'last_name': student.last_name}
                student = None
                m = None
    return JsonResponse(data)


@login_required
def download_csv(request, course_id):
    course = Course.objects.get(id=course_id)

    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="EstudiantesCurso-{0}.csv"'.format(course.name)

    writer = csv.writer(response)
    writer.writerow(['RUT', 'NOMBRES', 'APELLIDOS', 'EMAIL'])    

    return response

@login_required
def get_courses(request):
    data = {}
    courses = Course.objects.filter(teacher=request.user.teacher, year=date.today().year).order_by('id').reverse()

    for course in courses:
        data[course.code+"-"+course.name] = None

    return JsonResponse(data)