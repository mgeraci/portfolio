from __future__ import unicode_literals
from django.db import models

class Composition(models.Model):
    title = models.CharField(max_length=200)
    year = models.PositiveSmallIntegerField()
    slug = models.SlugField(max_length=200, unique=True)
    materials = models.CharField(max_length=400)
    performers = models.CharField(max_length=800, blank=True)
    video = models.URLField(max_length=200, blank=True)
    audio = models.FileField(upload_to='composition', blank=True, null=True)
    description = models.TextField(blank=True)

    class Meta:
        ordering = ['year']

    def __unicode__(self):
        return u'{} - {}'.format(self.year, self.title)
