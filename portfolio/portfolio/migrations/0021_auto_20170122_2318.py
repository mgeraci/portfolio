# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2017-01-22 23:18
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0020_auto_20170108_2348'),
    ]

    operations = [
        migrations.RenameField(
            model_name='homeprojectmedia',
            old_name='video',
            new_name='video_mp4',
        ),
        migrations.AddField(
            model_name='homeprojectmedia',
            name='video_webm',
            field=models.FileField(blank=True, null=True, upload_to='projects'),
        ),
    ]
