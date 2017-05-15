from django.conf.urls import url

from apps.teacher.views import index

urlpatterns = [
    url(r'^home', index, name='home'),
]