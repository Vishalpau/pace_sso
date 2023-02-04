# Generated by Django 3.0.4 on 2021-08-04 05:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('versions', '0004_auto_20210803_1147'),
    ]

    operations = [
        migrations.AlterField(
            model_name='deviceregistry',
            name='status',
            field=models.CharField(blank=True, choices=[('active', 'active'), ('inactive', 'inactive')], default='active', help_text='Status of device', max_length=11, null=True),
        ),
    ]
