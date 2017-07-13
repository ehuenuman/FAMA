from django.conf.urls import url

from apps.teacher.views import index, view_questions, share_question

urlpatterns = [
    url(r'^home', index, name='home'),
    url(r'^mis-preguntas$', view_questions , name='questions'),
    url(r'^mis-preguntas/share/(?P<question_id>\d+)$', share_question , name='share_question'),
]