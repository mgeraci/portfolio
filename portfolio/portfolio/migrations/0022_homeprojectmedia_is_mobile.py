# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2017-02-09 19:39
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0021_auto_20170122_2318'),
    ]

    operations = [
        migrations.AddField(
            model_name='homeprojectmedia',
            name='is_mobile',
            field=models.BooleanField(default=False),
        ),
    ]