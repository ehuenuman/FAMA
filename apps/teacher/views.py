from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

from apps.course.models import Course
from apps.formative.models import Formative


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
