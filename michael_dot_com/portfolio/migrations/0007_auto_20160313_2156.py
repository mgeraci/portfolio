# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-03-13 21:56
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0006_web_webitem'),
    ]

    operations = [
        migrations.AlterField(
            model_name='web',
            name='subtitle',
            field=models.CharField(blank=True, max_length=400),
        ),
        migrations.AlterField(
            model_name='web',
            name='tech',
            field=models.CharField(blank=True, max_length=400),
        ),
    ]