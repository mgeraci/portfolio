from django.contrib import admin
from portfolio.models import (
    Composition
)

class CompositionAdmin(admin.ModelAdmin):
    pass

admin.site.register(Composition, CompositionAdmin)
