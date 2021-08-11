from django.conf.urls import re_path
from django.contrib import admin
from django.views.generic.base import RedirectView

from . import views
from .feeds import PhotoblogFeed


home_redirect = RedirectView.as_view(url='/', permanent=False)

urlpatterns = [
    # admin
    re_path(r'^admin/', admin.site.urls),

    # redirects
    re_path(r'^photography/dantes/?$', home_redirect, name='index_url'),
    re_path(r'^photography/vegan/?$', home_redirect, name='index_url'),
    re_path(r'^extras/.+$', home_redirect, name='index_url'),

    # main pages
    re_path(r'^$', views.index, name='index_url'),
    re_path(r'^work/(?P<slug>[^/]+)/$', views.project, name='project_url'),
    re_path(r'^web/(?P<slug>[^/]+)/$', views.web_item, name='web_item_url'),
    re_path(r'^web$', views.web, name='web_url'),
    re_path(r'^photography/blog/rss/?', PhotoblogFeed(), name='photography_rss_url'),
    re_path(r'^photography/blog', views.photography, name='photography_url'),
    re_path(r'^photography/blog/*', views.photography, name='photography_url'),
    re_path(r'^graphic/(?P<slug>[^/]+)/$', views.graphic_item, name='graphic_item_url'),
    re_path(r'^graphic', views.graphic, name='graphic_url'),
    re_path(r'^composition/(?P<slug>[^/]+)/$', views.composition_item, name='composition_item_url'),
    re_path(r'^composition/$', views.composition, name='composition_url'),
    re_path(r'^recordings/(?P<slug>[^/]+)/$', views.recordings_item, name='recordings_item_url'),
    re_path(r'^recordings', views.recordings, name='recordings_url'),
    re_path(r'^links', views.links, name='links_url'),
    re_path(r'^steel', views.steel, name='steel_url'),
    re_path(r'^resume', views.resume, name='resume_url'),

    # verification pages
    re_path('keybase.txt', views.keybase, name='keybase_url'),
    re_path('google1d143f0e0c8262c1.html', views.google, name='google_url'),
]
