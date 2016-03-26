from django.contrib import admin
from portfolio.models import (
    Composition,
    Web,
    WebImage,
)

class CompositionAdmin(admin.ModelAdmin):
    pass

class WebAdmin(admin.ModelAdmin):
    pass

class WebImageAdmin(admin.ModelAdmin):
    pass

admin.site.register(Composition, CompositionAdmin)
admin.site.register(Web, WebAdmin)
admin.site.register(WebImage, WebImageAdmin)
