from django.conf.urls import url

from apps.play.views import *

urlpatterns = [
    url(r'^$', view_plays, name='index'),
    url(r'^stop$', stop_play, name='stop'), #Only POST
    url(r'^(?P<play_id_char>\w+)/$', show_play, name='show'),
    url(r'^(?P<play_id_char>\w+)/reply/(?P<question_id>\d+)/$', reply_play, name='reply'),
    url(r'^(?P<play_id_char>\w+)/dashboard/$', play_result, name='result'),
]