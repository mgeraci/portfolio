from __future__ import unicode_literals
from django.db import models
from django.contrib.auth.models import User
from django.template.defaultfilters import slugify


class UserProfile(models.Model):
    user = models.OneToOneField(User, primary_key=True, on_delete=models.CASCADE)
    headline = models.CharField(blank=True, max_length=200)
    blurb = models.TextField(blank=True)


class HomeProject(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    description = models.TextField(blank=True)
    long_description = models.TextField(blank=True)
    background = models.CharField(max_length=6, blank=True)
    light_text = models.BooleanField(default=False)
    image = models.FileField(upload_to='projects', blank=True, null=True)
    image_max_width = models.PositiveSmallIntegerField(blank=True, null=True)
    order = models.PositiveSmallIntegerField()
    is_hidden = models.BooleanField(default=False)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return '{} - {}'.format(self.order, self.title)


class HomeProjectMedia(models.Model):
    project = models.ForeignKey(HomeProject, on_delete=models.CASCADE)
    caption = models.CharField(max_length=200, blank=True)
    image = models.FileField(upload_to='projects', blank=True, null=True)
    video_mp4 = models.FileField(upload_to='projects', blank=True, null=True)
    video_webm = models.FileField(upload_to='projects', blank=True, null=True)
    position = models.PositiveSmallIntegerField(blank=True)
    is_mobile = models.BooleanField(default=False)
    max_width = models.PositiveSmallIntegerField(blank=True, null=True)

    def __str__(self):
        return u'{} - {}'.format(self.project.title, self.caption)


class HomeProjectLink(models.Model):
    project = models.ForeignKey(HomeProject, on_delete=models.CASCADE)
    text = models.CharField(max_length=200)
    url = models.URLField(max_length=200)
    order = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return u'{} - {}'.format(self.project, self.text)


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

    def __str__(self):
        return u'{} - {}'.format(self.title, self.year)


class Web(models.Model):
    title = models.CharField(max_length=200)
    year = models.PositiveSmallIntegerField()
    slug = models.SlugField(max_length=200, unique=True)
    tech = models.CharField(max_length=400, blank=True)
    subtitle = models.CharField(max_length=400, blank=True)
    link = models.URLField(max_length=200, blank=True)
    source = models.URLField(max_length=200, blank=True)
    description = models.TextField(blank=True)
    thumbnail = models.FileField(upload_to='web', blank=True, null=True)

    class Meta:
        ordering = ['-year']

    def __str__(self):
        return u'{} - {}'.format(self.year, self.title)


class WebImage(models.Model):
    web = models.ForeignKey(Web, on_delete=models.CASCADE)
    order = models.PositiveSmallIntegerField(blank=True)
    image = models.FileField(upload_to='web', blank=True, null=True)
    video = models.URLField(max_length=200, blank=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return u'{} - {}'.format(self.web, self.order)


class Graphic(models.Model):
    title = models.CharField(max_length=200)
    year = models.PositiveSmallIntegerField()
    slug = models.SlugField(max_length=200, unique=True)
    materials = models.TextField()
    description = models.TextField(blank=True)
    thumbnail = models.FileField(upload_to='graphic')

    class Meta:
        ordering = ['-year']

    def __str__(self):
        return u'{} - {}'.format(self.title, self.year)


class GraphicImage(models.Model):
    graphic = models.ForeignKey(Graphic, on_delete=models.CASCADE)
    image = models.FileField(upload_to='graphic', blank=True, null=True)
    order = models.PositiveSmallIntegerField(blank=True, null=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return u'{} - {}'.format(self.graphic.title, self.image)


class RecordingPage(models.Model):
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=200)
    year = models.PositiveSmallIntegerField()
    slug = models.SlugField(max_length=200, unique=True)
    notes = models.TextField(blank=True)
    description = models.TextField(blank=True)
    thumbnail = models.FileField(upload_to='web', blank=True, null=True)

    class Meta:
        ordering = ['-year']

    def __str__(self):
        return u'{} - {}'.format(self.title, self.year)


class Recording(models.Model):
    recording_page = models.ForeignKey(RecordingPage, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    audio = models.FileField(upload_to='recordings')
    order = models.PositiveSmallIntegerField(blank=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return u'{}'.format(self.title)


class PhotoblogTag(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)

    class Meta:
        ordering = ['name']

    # add a slug on save, if one doesn't exist
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)

        super(PhotoblogTag, self).save(*args, **kwargs)

    def to_json(self):
        return {
            'name': self.name,
            'slug': self.slug,
        }

    def __str__(self):
        return u'{}'.format(self.name)


class PhotoblogImage(models.Model):
    lightroom_id = models.IntegerField(blank=True, null=True)
    title = models.CharField(max_length=200)
    year = models.PositiveSmallIntegerField()
    thumbnail = models.FileField(upload_to='photoblog/thumbnails', blank=True, null=True)
    image700 = models.FileField(upload_to='photoblog/images700', blank=True, null=True)
    image2000 = models.FileField(upload_to='photoblog/images2000', blank=True, null=True)
    tags = models.ManyToManyField(PhotoblogTag, blank=True)

    class Meta:
        ordering = ['-lightroom_id']

    def to_json(self):
        json_tags = []

        for tag in self.tags.all():
            json_tags.append(tag.to_json())

        return {
            'id': self.lightroom_id,
            'title': self.title,
            'year': self.year,
            'thumbnail': self.thumbnail.url,
            'image700': self.image700.url,
            'image2000': self.image2000.url,
            'tags': json_tags,
        }

    def __str__(self):
        return u'{} - {}'.format(self.lightroom_id, self.title)
