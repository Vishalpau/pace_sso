from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0011_update_proxy_permissions'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('companies', '0002_auto_20210706_0913'),
        ('applications', '0002_auto_20210706_0913'),
    ]

    operations = [
        migrations.AddField(
            model_name='userappaccess',
            name='fkUserId',
            field=models.ForeignKey(default=None, help_text='UserID for Subscription', on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='invites',
            name='fkAppId',
            field=models.ForeignKey(blank=True, help_text='Application to which user wants to subscribe', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='applications', to='applications.Applications', verbose_name='App Id'),
        ),
        migrations.AddField(
            model_name='invites',
            name='fkCompanyId',
            field=models.ForeignKey(blank=True, help_text='Company associated with user', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='companies', to='companies.Companies', verbose_name='Company Id'),
        ),
        migrations.AddField(
            model_name='invites',
            name='fkGroupId',
            field=models.ForeignKey(blank=True, help_text='ApplicationRoles Role to be specified', null=True, on_delete=django.db.models.deletion.CASCADE, to='auth.Group', verbose_name='Role Id'),
        ),
        migrations.AddField(
            model_name='invites',
            name='fkUserId',
            field=models.ForeignKey(default=None, help_text='User Id of user who invites', on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='User Id'),
        ),
        migrations.AddField(
            model_name='apphostings',
            name='fkAppId',
            field=models.ForeignKey(default=None, help_text='Application to which user wants to subscribe', on_delete=django.db.models.deletion.CASCADE, to='applications.Applications', verbose_name='App Id'),
        ),
        migrations.AddField(
            model_name='apphostings',
            name='fkCompanyId',
            field=models.ForeignKey(default=None, help_text='Company associated with user', on_delete=django.db.models.deletion.CASCADE, to='companies.Companies', verbose_name='Company Id'),
        ),
        migrations.AlterUniqueTogether(
            name='userappaccess',
            unique_together={('fkUserId', 'fkAppId', 'fkCompanyId')},
        ),
        migrations.AlterUniqueTogether(
            name='apphostings',
            unique_together={('fkAppId', 'fkCompanyId', 'appDomain')},
        ),
    ]