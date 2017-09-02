from django.conf.urls import url

from apps.play.views import *

urlpatterns = [
    url(r'^stop$', stop_play),
    url(r'^(?P<play_id_char>\w+)/$', show_play, name='show'),
    url(r'^(?P<play_id_char>\w+)/reply/(?P<question_id>\d+)/$', reply_play, name='reply'),
]