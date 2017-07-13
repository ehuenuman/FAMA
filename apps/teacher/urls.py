from django.conf.urls import url

from apps.teacher.views import index, view_questions

urlpatterns = [
    url(r'^home', index, name='home'),
    url(r'^mis-preguntas', view_questions , name='questions'),
]