from django.conf.urls import include, re_path
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = []


urlpatterns += [
    re_path(r'^', include('portfolio.urls')),
    re_path(r'^', include('albums.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
