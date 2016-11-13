# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('albums', '0002_albumlist_albumselection'),
    ]

    operations = [
        migrations.AddField(
            model_name='albumlist',
            name='slug',
            field=models.SlugField(default='', unique=True, max_length=200),
            preserve_default=False,
        ),
    ]
