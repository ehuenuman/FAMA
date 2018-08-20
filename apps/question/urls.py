from django.conf.urls import url

from apps.question.views import *

urlpatterns = [    
    url(r'nueva/choice', create_choice, name='create_choice'),
    url(r'nueva/order', create_order, name='create_order'),
    url(r'nueva/inline', create_inlinechoice, name='create_inlinechoice'),
    url(r'nueva/entry', create_textentry, name='create_textentry'),
    url(r'editar/(?P<question_id>\d+)$', edit_choice, name='edit_choice'),
]