from __future__ import unicode_literals
from django.db import models

class Composition(models.Model):
    title = models.CharField(max_length=200)
    year = models.PositiveSmallIntegerField()
    slug = models.SlugField(max_length=200, unique=True)
    materials = models.CharField(max_length=400)
    performers = models.CharField(max_length=800, blank=True)
    duration = models.CharField(max_length=10, blank=True)
    video = models.URLField(max_length=200, blank=True)
    audio = models.FileField(upload_to='composition', blank=True, null=True)
    description = models.TextField(blank=True)
    score = models.CharField(max_length=200, blank=True)

    class Meta:
        ordering = ['-year']

    def __unicode__(self):
        return u'{} - {}'.format(self.year, self.title)

class Web(models.Model):
    title = models.CharField(max_length=200)
    year = models.PositiveSmallIntegerField()
    slug = models.SlugField(max_length=200, unique=True)
    tech = models.CharField(max_length=400, blank=True)
    subtitle = models.CharField(max_length=400, blank=True)
    link = models.URLField(max_length=200, blank=True)
    description = models.TextField(blank=True)

    class Meta:
        ordering = ['-year']

    def __unicode__(self):
        return u'{} - {}'.format(self.year, self.title)

class WebItem(models.Model):
    web = models.ForeignKey(Web)
    order = models.PositiveSmallIntegerField(unique=True, blank=True)
    image = models.FileField(upload_to='web', blank=True, null=True)
    video = models.URLField(max_length=200, blank=True)

    class Meta:
        ordering = ['order']

    def __unicode__(self):
        return u'{} - {}'.format(self.web, self.order)
