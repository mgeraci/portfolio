# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-03-12 17:52
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0004_auto_20160312_1752'),
    ]

    operations = [
        migrations.AlterField(
            model_name='composition',
            name='score',
            field=models.CharField(blank=True, max_length=200),
        ),
    ]