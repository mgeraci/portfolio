from django.db import models


class Album(models.Model):
  artist = models.CharField(max_length=200)
  name = models.CharField(max_length=200)
  year = models.PositiveSmallIntegerField()
  cover = models.ImageField(upload_to='covers', blank=True, null=True)
  sample = models.FileField(upload_to='samples', blank=True, null=True)
  sample_name = models.CharField(max_length=200, blank=True, null=True)

  class Meta:
    ordering = ['year', 'artist']

  def __unicode__(self):
    return u'{} - {} - {}'.format(self.artist, self.year, self.name)


class AlbumList(models.Model):
  name = models.CharField(max_length=200)
  slug = models.SlugField(max_length=200, unique=True)
  hidden = models.BooleanField(default=False)

  class Meta:
    ordering = ['-name']

  def __unicode__(self):
    return unicode(self.name)


class AlbumSelection(models.Model):
  album_list = models.ForeignKey(AlbumList)
  album = models.ForeignKey(Album)
  position = models.PositiveSmallIntegerField(blank=True, null=True)
  description = models.TextField(blank=True)

  class Meta:
    ordering = ['position']

  def __unicode__(self):
    return u'{}: {} - {}'.format(self.album_list, self.position, self.album)


class AlbumLink(models.Model):
  name = models.CharField(max_length=100)
  href = models.URLField()
  classes = models.CharField(max_length=100, blank=True, null=True)
  album = models.ForeignKey(Album)

  class Meta:
    ordering = ['name']

  def __unicode__(self):
    return u'{} - {}'.format(self.album, self.name)
