# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-12-23 22:16
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0013_remove_homeproject_image_full_bleed'),
    ]

    operations = [
        migrations.AddField(
            model_name='homeproject',
            name='class_name',
            field=models.TextField(blank=True, max_length=200),
        ),
    ]
