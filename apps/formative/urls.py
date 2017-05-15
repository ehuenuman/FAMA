from django.conf.urls import url

from .views import *

urlpatterns = [
    url(r'^nuevo', create_formative, name='create'),
    url(r'^$', view_formatives, name='index'),
    url(r'^(?P<formative_id>\d+)$', show_formative, name='show'),
    #url(r'^(?P<formative_id>\d+)/agregar-estudiantes$', add_students, name='add_students'),
    url(r'^editar/(?P<formative_id>\d+)$', edit_formative, name='edit'),
    #url(r'^borrar/(?P<formative_id>\d+)$', delete_course, name='delete'),
]
