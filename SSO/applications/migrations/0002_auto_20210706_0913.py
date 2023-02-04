from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0011_update_proxy_permissions'),
        ('companies', '0001_initial'),
        ('applications', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='userappaccess',
            name='fkCompanyId',
            field=models.ForeignKey(blank=True, help_text='Company associated with user', null=True, on_delete=django.db.models.deletion.CASCADE, related_name='fkCompanyId', to='companies.Companies'),
        ),
        migrations.AddField(
            model_name='userappaccess',
            name='fkGroupId',
            field=models.ForeignKey(default=None, help_text='Application group to be specified', on_delete=django.db.models.deletion.CASCADE, to='auth.Group'),
        ),
    ]