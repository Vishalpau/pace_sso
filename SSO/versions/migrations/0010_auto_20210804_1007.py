# Generated by Django 3.0.4 on 2021-08-04 10:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('versions', '0009_auto_20210804_1006'),
    ]

    operations = [
        migrations.RenameField(
            model_name='versiontype',
            old_name='versioninfo',
            new_name='versionInfo',
        ),
    ]
