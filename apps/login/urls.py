from django.conf.urls import url

from .views import *

urlpatterns = [
    url(r'^$', login, name='login'),
    url(r'^logout$', logout, name='logout'),
    url(r'^crear-cuenta$', create_account, name='create_account'),
    url(r'^crear-cuenta/email$', validate_email, name='validate_email'),
]
