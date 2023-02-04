from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('companies', '0002_auto_20210706_0913'),
    ]

    operations = [
        migrations.AddField(
            model_name='structures',
            name='depth',
            field=models.CharField(default=' ', help_text='Depth of 1L,2L...5L', max_length=100, verbose_name='Depth'),
        ),
        migrations.AlterField(
            model_name='projects',
            name='projectCode',
            field=models.CharField(blank=True, default=None, help_text='Number of Projects', max_length=20, null=True, unique=True, verbose_name='Projects Code'),
        ),
    ]