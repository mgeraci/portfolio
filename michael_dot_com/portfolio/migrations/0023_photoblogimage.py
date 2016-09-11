# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-09-11 16:20
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0022_remove_graphic_image'),
    ]

    operations = [
        migrations.CreateModel(
            name='PhotoblogImage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('year', models.PositiveSmallIntegerField()),
                ('thumbnail', models.FileField(blank=True, null=True, upload_to='photoblog')),
                ('image', models.FileField(blank=True, null=True, upload_to='photoblog')),
            ],
        ),
    ]
