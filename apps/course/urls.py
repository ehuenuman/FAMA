from django.conf.urls import url

from .views import *

urlpatterns = [
    url(r'^$', view_courses, name='index'),
    url(r'^nuevo/$', create_course, name='create'),
    url(r'^all$', get_courses, name='all'), #only POST
    url(r'^(?P<course_id_char>\w+)/$', show_course, name='show'),
    url(r'^(?P<course_id_char>\w+)/agregar-estudiantes$', add_students, name='add_students'),
    url(r'^(?P<course_id>\d+)/download-csv$', download_csv, name='download_csv'),
    url(r'^editar/(?P<course_id_char>\w+)/$', edit_course, name='edit'),
    url(r'^borrar/(?P<course_id>\d+)$', delete_course, name='delete'),
]
