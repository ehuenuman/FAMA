from django.conf.urls import url

from apps.teacher.views import *

urlpatterns = [
    url(r'^principal/$', index, name='home'),
    url(r'^agregar-pregunta$', add_question, name='add_question'),
    url(r'^mis-preguntas/$', view_questions, name='questions'),
    url(r'^mis-preguntas/share/(?P<question_id>\d+)$', share_question),
    url(r'^mis-preguntas/download$', download_question),
    url(r'^mis-preguntas/download/(?P<question_id>\d+)$', download_question),
    url(r'^mis-preguntas/delete$', delete_question),
    url(r'^mis-preguntas/delete/(?P<question_id>\d+)$', delete_question),
    url(r'^delete-folder$', delete_folder),    
]