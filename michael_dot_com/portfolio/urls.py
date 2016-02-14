from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index_url'),
    url(r'^web$', views.web, name='web_url'),
    url(r'^photography', views.photography, name='photography_url'),
    url(r'^graphic', views.graphic, name='graphic_url'),
    url(r'^composition', views.composition, name='composition_url'),
    url(r'^recordings', views.recordings, name='recordings_url'),
    url(r'^links', views.links, name='links_url'),
]
