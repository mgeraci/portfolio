from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^albums/?$', views.album_lists, name='album_lists_url'),
    url(r'^albums/list/(?P<slug>[^/]+)/$', views.album_list, name='album_list_url'),
]
