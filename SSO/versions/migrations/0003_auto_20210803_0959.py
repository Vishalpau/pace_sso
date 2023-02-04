# Generated by Django 3.0.4 on 2021-08-03 09:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('versions', '0002_deviceregistry'),
    ]

    operations = [
        migrations.AlterField(
            model_name='deviceregistry',
            name='deviceId',
            field=models.CharField(blank=True, help_text='Please enter device Id', max_length=45, null=True, unique=True, verbose_name='Device Id'),
        ),
        migrations.AlterField(
            model_name='deviceregistry',
            name='deviceModel',
            field=models.CharField(default=None, help_text='Please enter Model type', max_length=45, verbose_name='Model Type'),
        ),
        migrations.AlterField(
            model_name='deviceregistry',
            name='deviceType',
            field=models.CharField(blank=True, help_text='Please enter device type', max_length=45, null=True, verbose_name='Device Type'),
        ),
        migrations.AlterField(
            model_name='deviceregistry',
            name='osVersion',
            field=models.CharField(default=None, help_text='Please enter OS type', max_length=75, verbose_name='OS Type'),
        ),
        migrations.AlterField(
            model_name='deviceregistry',
            name='status',
            field=models.CharField(blank=True, choices=[('active', 'active'), ('inactive', 'inactive')], default=True, help_text='Status of notifications', max_length=11),
        ),
        migrations.AlterField(
            model_name='deviceregistry',
            name='userId',
            field=models.CharField(blank=True, help_text='Please enter User Id', max_length=75, null=True, verbose_name='User Id'),
        ),
        migrations.AlterField(
            model_name='deviceregistry',
            name='userName',
            field=models.CharField(default=None, help_text='Please enter User Name', max_length=75, verbose_name='User Name'),
        ),
    ]
