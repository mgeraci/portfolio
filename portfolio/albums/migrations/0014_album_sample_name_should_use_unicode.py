# Generated by Django 3.2.14 on 2022-12-27 17:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('albums', '0013_alter_album_options'),
    ]

    operations = [
        migrations.AddField(
            model_name='album',
            name='sample_name_should_use_unicode',
            field=models.BooleanField(default=False),
        ),
    ]
