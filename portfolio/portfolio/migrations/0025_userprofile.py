# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-03-05 03:39
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0008_alter_user_username_max_length'),
        ('portfolio', '0024_homeprojectmedia_max_width'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('blurb', models.TextField(blank=True)),
            ],
        ),
    ]