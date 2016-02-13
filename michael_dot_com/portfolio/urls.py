from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index_url'),
    url(r'^web$', views.web, name='web_url'),
]
