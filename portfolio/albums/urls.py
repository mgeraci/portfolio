from django.conf.urls import re_path
from . import views

urlpatterns = [
    re_path(r'^albums/?$', views.album_lists, name='album_lists_url'),
    re_path(r'^albums/(?P<slug>[^/]+)/$', views.album_list, name='album_list_url'),
]
