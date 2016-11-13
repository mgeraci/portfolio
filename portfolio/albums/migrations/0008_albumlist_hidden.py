# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('albums', '0007_album_sample_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='albumlist',
            name='hidden',
            field=models.BooleanField(default=False),
            preserve_default=True,
        ),
    ]
