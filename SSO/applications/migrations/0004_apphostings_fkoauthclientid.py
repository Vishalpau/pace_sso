from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.OAUTH2_PROVIDER_APPLICATION_MODEL),
        ('applications', '0003_auto_20210706_0913'),
    ]

    operations = [
        migrations.AddField(
            model_name='apphostings',
            name='fkOauthClientId',
            field=models.ForeignKey(default=None, help_text='OAuth ClientID to be selected/mentioned', on_delete=django.db.models.deletion.CASCADE, to=settings.OAUTH2_PROVIDER_APPLICATION_MODEL),
        ),
    ]