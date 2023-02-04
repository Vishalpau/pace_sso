# Generated by Django 3.0.4 on 2021-10-26 13:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('companies', '0010_auto_20211020_1318'),
    ]

    operations = [
        migrations.AddField(
            model_name='projectstructures',
            name='fkCompanyId',
            field=models.ForeignKey(blank=True, default=0, help_text='company details', null=True, on_delete=django.db.models.deletion.CASCADE, to='companies.Companies', verbose_name='Company ID'),
        ),
        migrations.AddField(
            model_name='structures',
            name='fkCompanyId',
            field=models.ForeignKey(blank=True, default=0, help_text='company details', null=True, on_delete=django.db.models.deletion.CASCADE, to='companies.Companies', verbose_name='Company ID'),
        ),
        migrations.AlterField(
            model_name='projects',
            name='primaryNumber',
            field=models.CharField(blank=True, default='-', help_text='Primary Number for SOS', max_length=30, null=True, verbose_name='Primary Number'),
        ),
        migrations.AlterField(
            model_name='projects',
            name='secondaryNumber',
            field=models.CharField(blank=True, default='-', help_text='Secondary Number for SOS', max_length=30, null=True, verbose_name='Secondary Number'),
        ),
    ]
