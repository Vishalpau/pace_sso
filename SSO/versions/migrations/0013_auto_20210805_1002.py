# Generated by Django 3.0.4 on 2021-08-05 10:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('versions', '0012_auto_20210804_1207'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='MobileAppliaction',
            new_name='MobileApplication',
        ),
        migrations.AlterModelTable(
            name='mobileapplication',
            table='mobile_application',
        ),
    ]
