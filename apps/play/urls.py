from django.conf.urls import url

from apps.play.views import *

urlpatterns = [
    url(r'^stop$', stop_play),
]