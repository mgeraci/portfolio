# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-11-20 18:45
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0006_homeproject_slug'),
    ]

    operations = [
        migrations.AlterField(
            model_name='homeproject',
            name='image',
            field=models.FileField(blank=True, null=True, upload_to='projects'),
        ),
    ]