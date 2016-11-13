from django.conf.urls import url
from django.contrib import admin
from django.conf import settings
from django.views.generic.base import RedirectView

from . import views
from feeds import PhotoblogFeed
from django.conf.urls.static import static


home_redirect = RedirectView.as_view(url='/', permanent=False)

urlpatterns = [
    # admin
    url(r'^admin/', admin.site.urls),

    # redirects
    url(r'^photography/dantes/?$', home_redirect, name='index_url'),
    url(r'^photography/vegan/?$', home_redirect, name='index_url'),
    url(r'^extras/.+$', home_redirect, name='index_url'),

    # main pages
    url(r'^$', views.index, name='index_url'),
    url(r'^web/(?P<slug>[^/]+)/$', views.web_item, name='web_item_url'),
    url(r'^web$', views.web, name='web_url'),
    url(r'^photography/blog/rss/?', PhotoblogFeed(), name='photography_rss_url'),
    url(r'^photography/blog', views.photography, name='photography_url'),
    url(r'^photography/blog/*', views.photography, name='photography_url'),
    url(r'^graphic/(?P<slug>[^/]+)/$', views.graphic_item, name='graphic_item_url'),
    url(r'^graphic', views.graphic, name='graphic_url'),
    url(r'^composition/(?P<slug>[^/]+)/$', views.composition_item, name='composition_item_url'),
    url(r'^composition/$', views.composition, name='composition_url'),
    url(r'^recordings/(?P<slug>[^/]+)/$', views.recordings_item, name='recordings_item_url'),
    url(r'^recordings', views.recordings, name='recordings_url'),
    url(r'^links', views.links, name='links_url'),

    # verification pages
    url('keybase.txt', views.keybase, name='keybase_url'),
    url('google1d143f0e0c8262c1.html', views.google, name='google_url'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
