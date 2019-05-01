from django.conf.urls import url

from .views import *

urlpatterns = [
    url(r'^student/$', index, name='home'),
    url(r'^delete/(?P<course_id_char>\w+)/(?P<student_rut>[\w-]+)$', delete_student, name='delete'),
]