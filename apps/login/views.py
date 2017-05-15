from django.shortcuts import render, redirect
from django.urls import reverse
from django.contrib import auth


# Create your views here.
def login(request):
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
				auth.login(request, user)
#				messages.success(request, "Identificación correcta")
				return redirect('teacher:home')
			else:
#				messages.warning(request, "Cuenta desactivada")
				return redirect('login')
		else:
#			messages.warning(request, "Nombre de usuario o contraseña incorrecta")
			return redirect('login')

def logout(request):
    auth.logout(request)
    return redirect('login')
