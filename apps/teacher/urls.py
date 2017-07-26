from django.conf.urls import url

from apps.teacher.views import *

urlpatterns = [
    url(r'^home', index, name='home'),
    url(r'^mis-preguntas$', view_questions , name='questions'),
    url(r'^agregar-pregunta$', add_question , name='add_question'),
    url(r'^mis-preguntas/share/(?P<question_id>\d+)$', share_question , name='share_question'),
    url(r'^delete-folder$', delete_folder),
]