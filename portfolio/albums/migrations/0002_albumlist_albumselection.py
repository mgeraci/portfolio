# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('albums', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='AlbumList',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=200)),
            ],
            options={
                'ordering': ['name'],
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='AlbumSelection',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('position', models.PositiveSmallIntegerField(null=True, blank=True)),
                ('description', models.TextField(blank=True)),
                ('album', models.ForeignKey(to='albums.Album')),
                ('album_list', models.ForeignKey(to='albums.AlbumList')),
            ],
            options={
                'ordering': ['position'],
            },
            bases=(models.Model,),
        ),
    ]
