# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('albums', '0005_albumlink_classes'),
    ]

    operations = [
        migrations.AlterField(
            model_name='albumlink',
            name='href',
            field=models.URLField(),
            preserve_default=True,
        ),
    ]
