from django.shortcuts import render, redirect
#from django.core.urlresolvers import reverse
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import JsonResponse
from datetime import date

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
def show_course(request, course_id):
    course = Course.objects.get(id=course_id)
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
            course.save()
            return redirect('course:show', course_id=course.id)
    else:
        form = CourseForm()
    return render(request, 'course/create.html', {'form': form, 'title': 'MAs Play - Crear Curso'})


@login_required
def edit_course(request, course_id):
    course = Course.objects.get(id=course_id)
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
def add_students(request, course_id):
    course = Course.objects.get(id=course_id)
    if request.method == 'POST':
        data = {}
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
