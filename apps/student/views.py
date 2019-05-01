from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

from apps.login.views import student_check
from apps.course.models import Course
from apps.student.models import Student
from apps.play.models import Play

# Create your views here.
@login_required
def index(request):    
    if student_check(request.user):
        student = request.user.student
        courses = Course.objects.filter(student=student)        
        active_plays = Play.objects.filter(course__in=courses, is_active=1)        
        closed_plays = Play.objects.filter(course__in=courses, is_active=0).order_by("-close_play")

        return render(request,'student/home.html', {
            'courses': courses,
            'active_plays': active_plays,
            'closed_plays': closed_plays,
            })
    else:
        return redirect('teacher:home')