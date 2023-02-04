# Generated by Django 3.0.4 on 2021-09-15 12:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('companies', '0008_auto_20210911_0915'),
        ('applications', '0009_auto_20210913_1335'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='modules',
            name='name',
        ),
        migrations.AddField(
            model_name='modules',
            name='moduleMobileName',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='modules',
            name='moduleWebName',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterUniqueTogether(
            name='apphostings',
            unique_together={('fkAppId', 'fkCompanyId', 'appDomain')},
        ),
        migrations.CreateModel(
            name='HostingsMaster',
            fields=[
                ('hostId', models.AutoField(primary_key=True, serialize=False)),
                ('awsRegion', models.CharField(default=None, help_text='AWS Region', max_length=45)),
                ('apiDomain', models.CharField(default=None, help_text='API domain URL', max_length=256)),
                ('appDomain', models.CharField(default=None, help_text='App domain URL', max_length=256)),
                ('status', models.BooleanField(default=True, help_text='Flag for status of hosting')),
                ('created', models.DateTimeField(auto_now_add=True, help_text='Created date of User invitation')),
                ('updated', models.DateTimeField(auto_now=True, help_text='last updated date of invitaion')),
                ('fkAppId', models.ForeignKey(default=None, help_text='Application to which user wants to subscribe', on_delete=django.db.models.deletion.CASCADE, to='applications.Applications', verbose_name='App Id')),
            ],
            options={
                'verbose_name_plural': 'Hostings Master',
                'unique_together': {('fkAppId', 'awsRegion')},
            },
        ),
    ]