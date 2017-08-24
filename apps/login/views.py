from django.shortcuts import render, redirect
from django.urls import reverse
from django.contrib import messages
from django.contrib import auth
from django.http import JsonResponse

from django.contrib.auth.models import User
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
        username = request.POST.get('username', '')
        password = request.POST.get('password', '')
        user = auth.authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
#                request.session.set_expiry(1800)
                auth.login(request, user)
                print("Identificación correcta")
#               messages.success(request, "Identificación correcta")
                return redirect('teacher:home')
            else:
#               messages.warning(request, "Cuenta desactivada")
                print("Cuenta desactivada")
                return redirect('login:login')
        else:
#           messages.warning(request, "Nombre de usuario o contraseña incorrecta")
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
        user = User.objects.create_user(
            username=request.POST.get('email', ''),
            email=request.POST.get('email', ''),
            password=request.POST.get('password1', ''),
            first_name=request.POST.get('first_name', ''),
            last_name=request.POST.get('last_name', ''))

        teacher = Teacher.objects.create(
            user=user,
            email=request.POST.get('email', ''))
        user.save()
        teacher.save()

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
        
        

