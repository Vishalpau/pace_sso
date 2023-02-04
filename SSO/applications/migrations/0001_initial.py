import applications.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AppHostings',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('appDomain', models.CharField(help_text='Application URL', max_length=256, unique=True)),
                ('active', models.BooleanField(default=True, help_text='Flag for status of hosting')),
                ('created', models.DateTimeField(auto_now_add=True, help_text='Created date of User invitation')),
                ('updated', models.DateTimeField(auto_now=True, help_text='last updated date of invitaion')),
            ],
            options={
                'verbose_name_plural': 'App Hostings',
            },
        ),
        migrations.CreateModel(
            name='Applications',
            fields=[
                ('appId', models.AutoField(primary_key=True, serialize=False)),
                ('appCode', models.CharField(help_text='Application Code must be unique and max length of 10 characters', max_length=10, unique=True)),
                ('appName', models.CharField(help_text='Name for application', max_length=100)),
                ('appDesc', models.TextField(blank=True, help_text='application description', null=True)),
                ('appURL', models.CharField(blank=True, help_text='URL of application', max_length=500, null=True)),
                ('appLogo', models.ImageField(blank=True, help_text='Logo file for Application', null=True, upload_to=applications.models.update_filename)),
                ('active', models.BooleanField(blank=True, default=True, help_text='Flag to set Status of Application')),
                ('created_at', models.DateTimeField(auto_now_add=True, help_text='Application created time')),
                ('updated_at', models.DateTimeField(auto_now=True, help_text='application last updated time')),
            ],
            options={
                'verbose_name_plural': 'Applications',
            },
        ),
        migrations.CreateModel(
            name='Invites',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('referralEmail', models.EmailField(blank=True, help_text='Email of user to be invited', max_length=75, null=True)),
                ('referralPhone', models.BigIntegerField(blank=True, help_text='mobile number of user to be invited', null=True)),
                ('referralCode', models.CharField(blank=True, help_text='auto generated referral code to be sent with invitaion link', max_length=45, null=True)),
                ('action', models.CharField(blank=True, help_text='Action to be performed after clicking on referral link', max_length=10, null=True)),
                ('isInviteSent', models.BooleanField(default=True, help_text='Flag for invitaion sent')),
                ('reminderCount', models.IntegerField(blank=True, default=0, help_text='count of reminders sent', null=True)),
                ('stopReminder', models.BooleanField(default=False, help_text='Flag to stop the reminders')),
                ('inviteeStatus', models.CharField(blank=True, default='pending', help_text='Action to be performed after clicking on referral link', max_length=10, null=True)),
                ('created', models.DateTimeField(auto_now_add=True, help_text='Created date of User invitation')),
                ('updated', models.DateTimeField(auto_now=True, help_text='last updated date of invitaion')),
            ],
            options={
                'verbose_name_plural': 'Invites',
            },
        ),
        migrations.CreateModel(
            name='UserAppAccess',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('active', models.BooleanField(default=True, help_text='Flag for status of subscription')),
                ('createdAt', models.DateTimeField(auto_now_add=True, help_text='Subscription created time')),
                ('updatedAt', models.DateTimeField(auto_now=True, help_text='subscription last updated time')),
                ('fkAppId', models.ForeignKey(default=None, help_text='Application to which user wants to subscribe', on_delete=django.db.models.deletion.CASCADE, related_name='fkApplicationId', to='applications.Applications')),
            ],
            options={
                'verbose_name_plural': 'User App Access',
            },
        ),
    ]