# Generated by Django 3.0.4 on 2021-08-19 07:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('companies', '0005_auto_20210723_0719'),
    ]

    operations = [
        migrations.AddField(
            model_name='companies',
            name='IsADConfigured',
            field=models.BooleanField(blank=True, default=False, help_text='Flag to be set for Company AD status'),
        ),
    ]
