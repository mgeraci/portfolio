import os
from django.contrib.syndication.views import Feed
from michael_dot_com.localsettings import MEDIA_URL
from portfolio.models import PhotoblogImage

class PhotoblogFeed(Feed):
    title = "Michael P. Geraci - Photoblog"
    link = "/photography/blog"
    description = "Photos from my life"

    def items(self):
        return PhotoblogImage.objects.all()

    def item_title(self, item):
        return item.title

    def item_author_name(self, item):
        return "Michael P. Geraci"

    def item_description(self, item):
        return "{}{}".format(
            MEDIA_URL,
            item.image2000
        )

    def item_link(self, item):
        return "/photography/blog/{}".format(item.lightroom_id)
