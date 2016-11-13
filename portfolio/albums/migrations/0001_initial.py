# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Album',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('artist', models.CharField(max_length=200)),
                ('name', models.CharField(max_length=200)),
                ('year', models.PositiveSmallIntegerField()),
                ('cover', models.ImageField(null=True, upload_to=b'covers', blank=True)),
                ('sample', models.FileField(null=True, upload_to=b'samples', blank=True)),
            ],
            options={
                'ordering': ['year', 'artist'],
            },
            bases=(models.Model,),
        ),
    ]
