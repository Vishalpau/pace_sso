import applications.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='APIKey',
            fields=[
                ('keyId', models.AutoField(primary_key=True, serialize=False)),
                ('apiKey', models.CharField(editable=False, help_text='API Key generated automatically', max_length=100, unique=True)),
                ('clientType', models.CharField(help_text='Client Platform Name eg: web,android,ios,desktop,server', max_length=20)),
                ('clientAppVersions', models.CharField(help_text='Comma separated app versions', max_length=20)),
                ('revoked', models.BooleanField(blank=True, default=False, help_text='Flag to revoke the key')),
                ('whiteListedIPV4', models.BinaryField(blank=True, help_text='In case of server to server access IPV4 ip can be set- should automatically detects', null=True)),
                ('whiteListedIPV6', models.BinaryField(blank=True, help_text='In case of server to server access IPV6 ip can be set- should automatically detects', null=True)),
                ('createdAt', models.DateTimeField(auto_now_add=True, help_text='APIKey Created date- automatically created')),
                ('updatedAt', models.DateTimeField(auto_now=True, help_text='Date updated when regenerates API Key - automatically updated')),
                ('expiredAt', models.DateField(help_text='Expiry data of a API key')),
                ('reset', models.BooleanField(blank=True, default=False, help_text='Flag to regenrate the APIKey')),
            ],
        ),
        migrations.CreateModel(
            name='AzureADCredentials',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('adAppId', models.CharField(blank=True, default=None, help_text='Application ID of SSO APP in Azure AD', max_length=50, null=True)),
                ('adTenantId', models.CharField(default=None, help_text='Tenant ID of company Azure AD', max_length=50)),
                ('adClientId', models.CharField(default=None, help_text='Client ID of SSO APP in Azure AD', max_length=50)),
                ('adClientSecret', models.CharField(default=None, help_text='Client Secret key value of social provider', max_length=50)),
                ('status', models.BooleanField(default=True, help_text='Status of AD')),
                ('createdAt', models.DateTimeField(auto_now_add=True, help_text='created date')),
                ('createdBy', models.IntegerField(blank=True, default=None, help_text='User ID who creates', null=True)),
                ('updatedAt', models.DateTimeField(auto_now=True, help_text='updated date')),
                ('updatedBy', models.IntegerField(blank=True, default=None, help_text='UserID who updates', null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Companies',
            fields=[
                ('companyId', models.AutoField(primary_key=True, serialize=False)),
                ('companyName', models.CharField(help_text='Name of a company', max_length=100)),
                ('companyCode', models.CharField(help_text='CompanyCode must be unique and max length of 10 characters', max_length=10, unique=True)),
                ('businessVertical', models.CharField(help_text='Business Vertical of a company.. Eg: Construction,Petroleum,Real Estate etc', max_length=100)),
                ('panOrTaxid', models.CharField(blank=True, help_text='Pan or TaxId of a company', max_length=50, null=True)),
                ('gstNo', models.CharField(blank=True, help_text='GST No. of a company', max_length=50, null=True)),
                ('description', models.TextField(blank=True, help_text='Description of a company', null=True)),
                ('logo', models.ImageField(blank=True, help_text='Company Logo file to be uploaded', null=True, upload_to='companylogos')),
                ('addressLine1', models.CharField(blank=True, help_text='Company Address line one', max_length=500, null=True)),
                ('addressLine2', models.CharField(blank=True, help_text='Company Address line two', max_length=500, null=True)),
                ('zipCode', models.CharField(blank=True, help_text='Zip code of a Company address', max_length=50, null=True)),
                ('city', models.CharField(help_text='City where company located', max_length=50)),
                ('state', models.CharField(help_text='State where company located', max_length=50)),
                ('country', models.CharField(help_text='Country where company located', max_length=50)),
                ('latitude', models.FloatField(blank=True, default=None, editable=False, help_text='Automatically detects latitude with City and Country inputs', null=True)),
                ('longitude', models.FloatField(blank=True, default=None, editable=False, help_text='Automatically detects longitude with City and Country inputs', null=True)),
                ('Active', models.BooleanField(blank=True, default=True, help_text='Flag to be set for Company status')),
                ('createdAt', models.DateTimeField(auto_now_add=True, help_text='Company Created date- automatically created')),
                ('createdBy', models.IntegerField(blank=True, default=None, editable=False, help_text='UserID who creates the company- automatically updated', null=True)),
                ('updatedAt', models.DateTimeField(auto_now=True, help_text='updated date on company changes- automatically updated')),
                ('updatedBy', models.IntegerField(blank=True, default=None, editable=False, help_text='UserID who updates the company details- automatically updated', null=True)),
            ],
            options={
                'verbose_name_plural': 'Companies',
            },
        ),
        migrations.CreateModel(
            name='Department',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('departmentName', models.CharField(help_text='Name for departments', max_length=100, null=True)),
                ('departmentDescription', models.CharField(help_text='Name for prescription details', max_length=100)),
                ('departmentCode', models.CharField(help_text='Code of departments', max_length=100, null=True, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Projects',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('projectName', models.CharField(help_text='Name of a projects', max_length=100, verbose_name='Projects Name')),
                ('projectCode', models.IntegerField(blank=True, default=None, help_text='Number of Projects', null=True, verbose_name='Projects Code')),
                ('projectImage', models.ImageField(blank=True, help_text='Logo file for Projects', null=True, upload_to=applications.models.update_filename, verbose_name='Projects Image')),
                ('projectDescription', models.CharField(blank=True, default=None, help_text='Descriptions of a projects', max_length=100, null=True, verbose_name='Projects Descriptions')),
                ('publish', models.BooleanField(blank=True, default='True', help_text='Flag to be set for pulish status')),
                ('projectPhase', models.CharField(default=' ', help_text='Phases of a projects', max_length=100, verbose_name='Projects Phases')),
                ('projectNature', models.CharField(default=' ', help_text='Natures of a projects', max_length=100, verbose_name='Projects Natures')),
                ('vendorContext', models.CharField(default=' ', help_text='Name of a Vendor', max_length=100, verbose_name='Vendor Name')),
                ('vendorReferenceId', models.CharField(default=' ', help_text='Id of a Vendor', max_length=100, verbose_name='Vendor Id')),
                ('createdAt', models.DateTimeField(auto_now_add=True, help_text='created date')),
                ('createdBy', models.IntegerField(blank=True, default=None, help_text='User ID who creates', null=True)),
                ('updatedAt', models.DateTimeField(auto_now=True, help_text='updated date')),
                ('updatedBy', models.IntegerField(blank=True, default=None, help_text='UserID who updates', null=True)),
                ('fkCompanyId', models.ForeignKey(help_text='company details', on_delete=django.db.models.deletion.CASCADE, to='companies.Companies', verbose_name='Company ID')),
            ],
            options={
                'verbose_name_plural': 'Projects',
            },
        ),
        migrations.CreateModel(
            name='Structures',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(help_text='Names', max_length=100, verbose_name='Name')),
                ('parentId', models.BigIntegerField(blank=True, help_text='Parent Id details', null=True, verbose_name='Parent Id')),
                ('createdAt', models.DateTimeField(auto_now_add=True, help_text='created date')),
                ('createdBy', models.IntegerField(blank=True, default=None, help_text='User ID who creates', null=True)),
                ('updatedAt', models.DateTimeField(auto_now=True, help_text='updated date')),
                ('updatedBy', models.IntegerField(blank=True, default=None, help_text='UserID who updates', null=True)),
                ('fkProjectId', models.ForeignKey(help_text='Projects details', on_delete=django.db.models.deletion.CASCADE, to='companies.Projects', verbose_name='Project ID')),
            ],
            options={
                'verbose_name_plural': 'Structures',
            },
        ),
        migrations.CreateModel(
            name='ProjectStructures',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('structureName', models.CharField(help_text='Name of a Structure', max_length=100, verbose_name='Structure Name')),
                ('parentId', models.BigIntegerField(blank=True, help_text='Parent Id details', null=True, verbose_name='Parent Id')),
                ('depth', models.CharField(default=' ', help_text='Depth of 1L,2L...5L', max_length=100, verbose_name='Depth')),
                ('name', models.CharField(help_text='Names', max_length=100, verbose_name='Name')),
                ('createdAt', models.DateTimeField(auto_now_add=True, help_text='created date')),
                ('createdBy', models.IntegerField(blank=True, default=None, help_text='User ID who creates', null=True)),
                ('updatedAt', models.DateTimeField(auto_now=True, help_text='updated date')),
                ('updatedBy', models.IntegerField(blank=True, default=None, help_text='UserID who updates', null=True)),
                ('fkProjectId', models.ForeignKey(help_text='Projects details', on_delete=django.db.models.deletion.CASCADE, to='companies.Projects', verbose_name='Project ID')),
                ('fkStructureId', models.ForeignKey(default=None, help_text='Structures details', on_delete=django.db.models.deletion.CASCADE, to='companies.Structures', verbose_name='Structures ID')),
            ],
            options={
                'verbose_name_plural': 'Projects Structures',
            },
        ),
        migrations.CreateModel(
            name='OperatingLocation',
            fields=[
                ('locationId', models.AutoField(primary_key=True, serialize=False)),
                ('locationName', models.CharField(help_text='name of a company location', max_length=100)),
                ('addressLineOne', models.CharField(help_text='Address of a company location line one', max_length=500)),
                ('addressLineTwo', models.CharField(blank=True, help_text='Address of a company location line two', max_length=500, null=True)),
                ('landmark', models.CharField(blank=True, help_text='landmark where company location located', max_length=500, null=True)),
                ('city', models.CharField(help_text='City where Company Location resided ', max_length=50)),
                ('state', models.CharField(help_text='State where Company Location resided ', max_length=50)),
                ('postalCode', models.CharField(help_text='Postal code of Company Location', max_length=50)),
                ('country', models.CharField(help_text='Country where Company Location resided ', max_length=50)),
                ('latitude', models.FloatField(blank=True, default=None, editable=False, help_text='Automatically detects latitude with City and Country inputs', null=True)),
                ('longitude', models.FloatField(blank=True, default=None, editable=False, help_text='Automatically detects longitude with City and Country inputs', null=True)),
                ('panOrTaxid', models.CharField(blank=True, help_text='Pan or TaxId of a company', max_length=50, null=True)),
                ('gstNo', models.CharField(blank=True, help_text='GST No. of a company', max_length=50, null=True)),
                ('createdaAt', models.DateTimeField(auto_now_add=True, help_text='Company Location Created date- automatically created')),
                ('updatedAt', models.DateTimeField(auto_now=True, help_text='Company Location updated date- automatically updated')),
                ('companyId', models.ForeignKey(help_text='company Id to which locations are adding', on_delete=django.db.models.deletion.CASCADE, to='companies.Companies')),
            ],
        ),
        migrations.CreateModel(
            name='DepartmentUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fkCompanyId', models.ForeignKey(help_text='company details', on_delete=django.db.models.deletion.CASCADE, to='companies.Companies', verbose_name='Company ID')),
                ('fkDepartmentId', models.ForeignKey(blank=True, help_text='Company associated with deparment', null=True, on_delete=django.db.models.deletion.CASCADE, to='companies.Department', verbose_name='Department Name')),
            ],
        ),
    ]