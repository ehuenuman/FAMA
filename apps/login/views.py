from django.shortcuts import render, redirect
from django.urls import reverse
from django.contrib import messages
from django.contrib import auth
from django.http import JsonResponse

from django.contrib.auth.models import User, Group
from apps.teacher.models import Teacher

# Create your views here.
def login(request):
    """Verify credential account for teacher and student"""
    if request.method == 'GET':
        if request.user.is_authenticated:            
            return redirect('teacher:home')
        else:
            return render(request, 'index.html')
    else:       
        username = request.POST['username']
        password = request.POST.get('password', request.POST['username'])        
        user = auth.authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                print("Identificación correcta")
                auth.login(request, user)
                if teacher_check(user):
                    print("Profesor")
                    return redirect('teacher:home')
                else:
                    print("Estudiante")
                    request.session.set_expiry(3600)
                    return redirect('student:home')
            else:
                print("Cuenta desactivada")
                return redirect('login:login')
        else:
            print("Identificación incorrecta")
            return redirect('login:login')


def logout(request):
    """System logout"""
    auth.logout(request)
    return redirect('login:login')


def create_account(request):
    """Create a new account for a teacher"""
    if request.method == 'GET':
        return render(request, 'login/new-account.html')
    else:
        group = Group.objects.get(name='Teachers')
        user = User.objects.create_user(
            username=request.POST.get('email', ''),
            email=request.POST.get('email', ''),
            password=request.POST.get('password1', ''),
            first_name=request.POST.get('first_name', ''),
            last_name=request.POST.get('last_name', ''))
        user.save()

        teacher = Teacher.objects.create(user=user)        

        user.groups.add(group)
        user.save()

        return redirect('login:login')


def validate_email(request):
    if request.method == 'POST':
        email=request.POST.getlist('email')[0]
        data = {}
        try:
            user = User.objects.get(username=email) 
            data['message'] = "occupied"
        except Exception as e:
            data['message'] = "available"
            
        return JsonResponse(data)     
        

def teacher_check(user):
    return user.groups.filter(name='Teachers').exists()


def student_check(user):
    return user.groups.filter(name='Students').exists()