from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse

from apps.course.models import Course
from apps.formative.models import Formative
from apps.teacher.models import Teacher, Question


@login_required
def index(request):
    user = request.user
    courses = Course.objects.filter(teacher=user.teacher).order_by('id').reverse()[:5]
    total_course = Course.objects.filter(teacher=user.teacher).count()
    formatives = Formative.objects.filter(teacher=user.teacher)[:5]
    total_formatives = Formative.objects.filter(teacher=user.teacher).count()
    return render(request,'teacher/home.html', {
      'user': user, 
      'courses': courses, 
      'total_course': total_course,
      'formatives': formatives ,
      'total_formatives': total_formatives
      })


@login_required
def view_questions(request):
    user = request.user.teacher
    questions = user.question.filter(teacherhasquestion__deleted=0)

    #questions = {}
    #cont = 0
    #for question in query:
    #    questions[cont] = {
    #      'id': question.id,
    #      'title': question.title, 
    #      'type': question.type,
    #      'creation_date': question.creation_date,
    #      'share': question.share,
    #      'code': question.code,
    #      'url': question.url,
    #      'extension': question.extension}
    #    cont = cont + 1

    #questions = JsonResponse(questions)
    return render(request, 'teacher/questions.html', {'questions': questions})
    
    #Revisando el código de MAS para traer todas las preguntas.
    #Deben devolverse en un JSON para que el html pueda trabajarlos.