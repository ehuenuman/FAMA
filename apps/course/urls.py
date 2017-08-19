from django.conf.urls import url

from .views import *

urlpatterns = [
    url(r'^nuevo', create_course, name='create'),
    url(r'^$', view_courses, name='index'),
    url(r'^(?P<course_id>\d+)$', show_course, name='show'),
    url(r'^(?P<course_id>\d+)/agregar-estudiantes$', add_students, name='add_students'),
    url(r'^(?P<course_id>\d+)/download-csv$', download_csv, name='download_csv'),
    url(r'^editar/(?P<course_id>\d+)$', edit_course, name='edit'),
    url(r'^borrar/(?P<course_id>\d+)$', delete_course, name='delete'),
]
