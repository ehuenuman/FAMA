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

    return render(request, 'teacher/questions.html', {'questions': questions})


@login_required
def share_question(request, question_id):
    print("share")
    if request.method == 'POST':
        question = Question.objects.get(id = question_id)

        if question.share == 1: #Shared
            question.share = 0; #Stop share
            data = {'code': "dontshare"}
        else:
            question.share = 1; #Start share
            data = {'code': question.code}

        question.save()
    return JsonResponse(data)

