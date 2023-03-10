# Generated by Django 3.0.4 on 2021-08-03 09:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('versions', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='DeviceRegistry',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('deviceType', models.CharField(help_text='Please enter device type', max_length=45, null=True, verbose_name='Device Type')),
                ('deviceModel', models.CharField(help_text='Please enter Model type', max_length=45, null=True, verbose_name='Model Type')),
                ('userName', models.CharField(help_text='Please enter User Name', max_length=75, verbose_name='User Name')),
                ('userId', models.CharField(help_text='Please enter User Id', max_length=75, verbose_name='User Id')),
                ('deviceId', models.CharField(help_text='Please enter device Id', max_length=45, null=True, unique=True, verbose_name='Device Id')),
                ('osVersion', models.CharField(help_text='Please enter OS type', max_length=75, null=True, verbose_name='OS Type')),
                ('status', models.CharField(blank=True, choices=[('active', 'active'), ('inactive', 'inactive')], help_text='Status of notifications', max_length=11)),
                ('createdAt', models.DateTimeField(auto_now_add=True, help_text='created date')),
                ('createdBy', models.IntegerField(blank=True, default=None, help_text='User ID who creates', null=True)),
                ('updatedAt', models.DateTimeField(auto_now=True, help_text='updated date')),
                ('updatedBy', models.IntegerField(blank=True, default=None, help_text='UserID who updates', null=True)),
            ],
            options={
                'unique_together': {('deviceId', 'userId', 'deviceType')},
            },
        ),
    ]
