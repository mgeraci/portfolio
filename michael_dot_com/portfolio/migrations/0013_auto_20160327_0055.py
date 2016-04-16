# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-03-27 00:55
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0012_recordingpage'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='recordingpage',
            options={'ordering': ['-year']},
        ),
        migrations.AddField(
            model_name='recordingpage',
            name='subtitle',
            field=models.CharField(default='Playing music in a basement', max_length=200),
            preserve_default=False,
        ),
    ]