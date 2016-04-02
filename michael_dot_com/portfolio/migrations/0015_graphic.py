# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-04-02 17:22
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0014_recording'),
    ]

    operations = [
        migrations.CreateModel(
            name='Graphic',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('year', models.PositiveSmallIntegerField()),
                ('description', models.TextField(blank=True)),
                ('thumbnail', models.FileField(blank=True, null=True, upload_to='graphic')),
                ('image', models.FileField(blank=True, null=True, upload_to='graphic')),
            ],
        ),
    ]
