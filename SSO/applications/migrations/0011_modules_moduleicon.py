# Generated by Django 3.0.4 on 2021-11-23 04:15

import applications.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('applications', '0010_auto_20210915_1228'),
    ]

    operations = [
        migrations.AddField(
            model_name='modules',
            name='moduleIcon',
            field=models.ImageField(blank=True, help_text='icon of an application module', null=True, upload_to=applications.models.uploadModuleIcon),
        ),
    ]
