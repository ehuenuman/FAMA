from django.conf.urls import url

from apps.question.views import *

urlpatterns = [    
    url(r'nueva/choice', create_choice, name='create_choice'),
    url(r'nueva/order', create_order, name='create_order'),
    url(r'nueva/inline', create_inlinechoice, name='create_inlinechoice'),
    url(r'nueva/entry', create_textentry, name='create_textentry'),
    url(r'nueva/slider', create_slider, name='create_slider'),
    url(r'nueva/associate', create_associate, name='create_associate'),
    url(r'nueva/hotspot', create_hotspot, name='create_hotspot'),
    url(r'editar/(?P<question_id>\d+)$', edit_choice, name='edit_choice'),
]