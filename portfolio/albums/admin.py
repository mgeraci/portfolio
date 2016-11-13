from django.contrib import admin

from albums.models import (
    Album,
    AlbumList,
    AlbumSelection,
    AlbumLink,
  )


class AlbumAdmin(admin.ModelAdmin):
  pass


class AlbumListAdmin(admin.ModelAdmin):
  pass


class AlbumSelectionAdmin(admin.ModelAdmin):
  pass


class AlbumLinkAdmin(admin.ModelAdmin):
  pass


admin.site.register(Album, AlbumAdmin)
admin.site.register(AlbumList, AlbumListAdmin)
admin.site.register(AlbumSelection, AlbumSelectionAdmin)
admin.site.register(AlbumLink, AlbumLinkAdmin)
