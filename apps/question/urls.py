from django.conf.urls import url

from apps.question.views import *

urlpatterns = [    
    url(r'nueva/choice', create_choice, name='create_choice'),
]