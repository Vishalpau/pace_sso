from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.OAUTH2_PROVIDER_APPLICATION_MODEL),
        ('companies', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('applications', '0002_auto_20210706_0913'),
    ]

    operations = [
        migrations.AddField(
            model_name='departmentuser',
            name='fkUserId',
            field=models.ForeignKey(help_text='department assgin to User', on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='User Name'),
        ),
        migrations.AddField(
            model_name='department',
            name='fkCompanyId',
            field=models.ForeignKey(help_text='company details', on_delete=django.db.models.deletion.CASCADE, to='companies.Companies'),
        ),
        migrations.AddField(
            model_name='azureadcredentials',
            name='fkCompanyId',
            field=models.ForeignKey(help_text='company details', on_delete=django.db.models.deletion.CASCADE, to='companies.Companies'),
        ),
        migrations.AddField(
            model_name='apikey',
            name='OauthClientId',
            field=models.ForeignKey(help_text='OAuth ClientID to be selected/mentioned', on_delete=django.db.models.deletion.CASCADE, related_name='clientId', to=settings.OAUTH2_PROVIDER_APPLICATION_MODEL),
        ),
        migrations.AddField(
            model_name='apikey',
            name='applicationId',
            field=models.ForeignKey(help_text='ApplicationId to be selected/mentioned', on_delete=django.db.models.deletion.CASCADE, to='applications.Applications'),
        ),
        migrations.AddField(
            model_name='apikey',
            name='companyId',
            field=models.ForeignKey(help_text='CompanyId to be selected/mentioned', on_delete=django.db.models.deletion.CASCADE, to='companies.Companies'),
        ),
        migrations.AlterUniqueTogether(
            name='operatinglocation',
            unique_together={('companyId', 'locationName')},
        ),
        migrations.AlterUniqueTogether(
            name='azureadcredentials',
            unique_together={('fkCompanyId', 'adAppId', 'adTenantId')},
        ),
        migrations.AlterUniqueTogether(
            name='apikey',
            unique_together={('OauthClientId', 'companyId', 'applicationId', 'clientType')},
        ),
    ]