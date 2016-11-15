from django.conf.urls import include, url
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = []


urlpatterns += [
    url(r'^', include('portfolio.urls')),
    url(r'^', include('albums.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
