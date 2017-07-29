"""Play URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from django.views.generic import TemplateView

from apps.login.views import login, logout, create_account, validate_email
#from django.contrib.auth.views import login

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', login, name='login'),
    url(r'^logout$', logout, name='logout'),
    url(r'^crear-cuenta$', create_account, name='create_account'),
    url(r'^crear-cuenta/email$', validate_email, name='validate_email'),
	url(r'^', include ('apps.teacher.urls', namespace='teacher')),
    url(r'^curso/', include('apps.course.urls', namespace='course')),
    url(r'^formativa/', include('apps.formative.urls', namespace='formative')),  
    url(r'^pregunta/', include('apps.question.urls', namespace='question')),  
]
