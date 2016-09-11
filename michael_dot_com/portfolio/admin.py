from django.contrib import admin
from portfolio.models import (
    Composition,
    Web,
    WebImage,
    RecordingPage,
    Recording,
    Graphic,
    GraphicImage,
    PhotoblogImage,
)


class CompositionAdmin(admin.ModelAdmin):
    pass

class WebAdmin(admin.ModelAdmin):
    pass

class WebImageAdmin(admin.ModelAdmin):
    pass

class RecordingPageAdmin(admin.ModelAdmin):
    pass

class RecordingAdmin(admin.ModelAdmin):
    pass

class GraphicAdmin(admin.ModelAdmin):
    pass

class GraphicImageAdmin(admin.ModelAdmin):
    pass

class PhotoblogImageAdmin(admin.ModelAdmin):
    pass


admin.site.register(Composition, CompositionAdmin)
admin.site.register(Web, WebAdmin)
admin.site.register(WebImage, WebImageAdmin)
admin.site.register(RecordingPage, RecordingPageAdmin)
admin.site.register(Recording, RecordingAdmin)
admin.site.register(Graphic, GraphicAdmin)
admin.site.register(GraphicImage, GraphicImageAdmin)
admin.site.register(PhotoblogImage, PhotoblogImageAdmin)
