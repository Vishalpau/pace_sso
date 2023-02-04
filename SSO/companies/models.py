# from django.contrib import admin
from django.db import models
from oauth2_provider.models import Application
from applications.models import *
# from applications.models import Applications
from django.contrib.auth import get_user_model
from rest_framework.response import Response
from user.models import Users
from django.db.models.fields.files import ImageField




User = get_user_model()

# Create your models here.


def update_filename(instance, filename):
        path = "projects/"
        prefix, extension = os.path.splitext(filename)
        format = instance.projectCode + extension
        return os.path.join(path, format)


class Companies(models.Model):
    companyId = models.AutoField(primary_key=True)
    companyName = models.CharField(
        max_length=100, blank=False, null=False, help_text="Name of a company")
    companyCode = models.CharField(max_length=10,unique=True, blank=False, null=False,help_text="CompanyCode must be unique and max length of 10 characters")
    businessVertical = models.CharField(
        max_length=100, blank=False, null=False,help_text="Business Vertical of a company.. Eg: Construction,Petroleum,Real Estate etc")
    panOrTaxid = models.CharField(max_length=50, blank=True, null=True,help_text="Pan or TaxId of a company")
    gstNo = models.CharField(max_length=50, blank=True, null=True,help_text="GST No. of a company")
    description = models.TextField(blank=True, null=True,help_text="Description of a company")
    logo = models.ImageField(upload_to='companylogos', blank=True, null=True,help_text="Company Logo file to be uploaded")
    addressLine1 = models.CharField(max_length=500, blank=True, null=True,help_text="Company Address line one")
    addressLine2 = models.CharField(max_length=500, blank=True, null=True,help_text="Company Address line two")
    zipCode = models.CharField(max_length=50, blank=True, null=True,help_text="Zip code of a Company address")
    city = models.CharField(max_length=50, blank=False, null=False,help_text="City where company located")
    state = models.CharField(max_length=50, blank=False, null=False,help_text="State where company located")
    country = models.CharField(max_length=50, blank=False, null=False,help_text="Country where company located")
    latitude = models.FloatField(default=None, blank=True, null=True,editable=False,help_text="Automatically detects latitude with City and Country inputs")
    longitude = models.FloatField(default=None, blank=True, null=True,editable=False,help_text="Automatically detects longitude with City and Country inputs")
    Active = models.BooleanField(blank=True, default=True,help_text="Flag to be set for Company status")
    IsADConfigured=models.BooleanField(blank=True, default=False,help_text="Flag to be set for Company AD status")
    createdAt = models.DateTimeField(auto_now_add=True,help_text="Company Created date- automatically created")
    createdBy = models.IntegerField(
        default=None, blank=True, null=True, editable=False,help_text="UserID who creates the company- automatically updated")
    updatedAt = models.DateTimeField(auto_now=True,help_text="updated date on company changes- automatically updated")
    updatedBy = models.IntegerField(
        default=None, blank=True, null=True, editable=False,help_text="UserID who updates the company details- automatically updated")

    def __str__(self):
        return self.companyName

    class Meta:
        verbose_name_plural = "Companies"


class OperatingLocation(models.Model):

    locationId = models.AutoField(primary_key=True)
    companyId = models.ForeignKey(Companies, on_delete=models.CASCADE,help_text="company Id to which locations are adding")
    locationName = models.CharField(max_length=100, blank=False, null=False,help_text="name of a company location")
    addressLineOne = models.CharField(max_length=500, blank=False, null=False,help_text="Address of a company location line one")
    addressLineTwo = models.CharField(max_length=500, blank=True, null=True,help_text="Address of a company location line two")
    landmark = models.CharField(max_length=500, blank=True, null=True,help_text="landmark where company location located")
    city = models.CharField(max_length=50, blank=False, null=False,help_text="City where Company Location resided ")
    state = models.CharField(max_length=50, blank=False, null=False,help_text="State where Company Location resided ")
    postalCode = models.CharField(max_length=50, blank=False, null=False,help_text="Postal code of Company Location")
    country = models.CharField(max_length=50, blank=False, null=False,help_text="Country where Company Location resided ")
    latitude = models.FloatField(default=None, blank=True, null=True,editable=False,help_text="Automatically detects latitude with City and Country inputs")
    longitude = models.FloatField(default=None, blank=True, null=True,editable=False,help_text="Automatically detects longitude with City and Country inputs")
    panOrTaxid = models.CharField(max_length=50, blank=True, null=True,help_text="Pan or TaxId of a company")
    gstNo = models.CharField(max_length=50, blank=True, null=True,help_text="GST No. of a company")
    createdaAt = models.DateTimeField(auto_now_add=True,help_text="Company Location Created date- automatically created")
    updatedAt = models.DateTimeField(auto_now=True,help_text="Company Location updated date- automatically updated")

    class Meta:
        unique_together = ('companyId', 'locationName')


class APIKey(models.Model):
    keyId = models.AutoField(primary_key=True)
    apiKey = models.CharField(
        max_length=100, blank=False, null=False, unique=True, editable=False,help_text="API Key generated automatically")
    OauthClientId = models.ForeignKey(
        Application, on_delete=models.CASCADE, related_name='clientId',help_text="OAuth ClientID to be selected/mentioned")
    companyId = models.ForeignKey(Companies, on_delete=models.CASCADE,help_text="CompanyId to be selected/mentioned")
    applicationId = models.ForeignKey(
        'applications.Applications', on_delete=models.CASCADE,help_text="ApplicationId to be selected/mentioned")
    clientType = models.CharField(max_length=20, blank=False, null=False,help_text="Client Platform Name eg: web,android,ios,desktop,server")
    clientAppVersions = models.CharField(
        max_length=20, blank=False, null=False,help_text="Comma separated app versions")
    revoked = models.BooleanField(blank=True, default=False,help_text="Flag to revoke the key")
    whiteListedIPV4 = models.BinaryField(blank=True, null=True,help_text="In case of server to server access IPV4 ip can be set- should automatically detects")
    whiteListedIPV6 = models.BinaryField(blank=True, null=True,help_text="In case of server to server access IPV6 ip can be set- should automatically detects")
    createdAt = models.DateTimeField(auto_now_add=True,help_text="APIKey Created date- automatically created")
    updatedAt = models.DateTimeField(auto_now=True,help_text="Date updated when regenerates API Key - automatically updated")
    expiredAt = models.DateField(help_text="Expiry data of a API key")
    reset = models.BooleanField(blank=True, default=False,help_text="Flag to regenrate the APIKey")

    class Meta:
        unique_together = ('OauthClientId', 'companyId','applicationId','clientType')


class AzureADCredentials(models.Model):
    fkCompanyId=models.ForeignKey(Companies, on_delete=models.CASCADE,help_text="company details")
    adAppId=models.CharField(max_length=50,blank=True,null=True,default=None,help_text="Application ID of SSO APP in Azure AD")
    adTenantId=models.CharField(max_length=50,default=None,help_text="Tenant ID of company Azure AD")
    adClientId=models.CharField(max_length=50,default=None,help_text="Client ID of SSO APP in Azure AD")
    adClientSecret=models.CharField(max_length=50,default=None,help_text="Client Secret key value of social provider")
    status=models.BooleanField(default=True,help_text="Status of AD")
    createdAt = models.DateTimeField(auto_now_add=True,help_text="created date")
    createdBy = models.IntegerField(default=None, blank=True, null=True,help_text="User ID who creates")
    updatedAt = models.DateTimeField(auto_now=True,help_text="updated date")
    updatedBy = models.IntegerField(default=None, blank=True, null=True,help_text="UserID who updates")

    class Meta:
        unique_together = ('fkCompanyId', 'adAppId','adTenantId')

class Department(models.Model):
    fkCompanyId=models.ForeignKey(Companies, on_delete=models.CASCADE,help_text="company details")
    departmentName=models.CharField(max_length=100,default=" ", blank=False, null=False,help_text="Name for departments")
    departmentDescription=models.CharField(max_length=100, default=" ",blank=False, null=True,help_text="Name for prescription details")
    departmentCode=models.CharField(max_length=100,unique=True, blank=False, null=True,help_text="Code of departments")
    # status=models.BooleanField(default=True,help_text="Status of Department")

    def __str__(self):
        return self.departmentName

class DepartmentUser(models.Model):
    fkCompanyId=models.ForeignKey(Companies, on_delete=models.CASCADE,help_text="company details",verbose_name='Company ID')
    fkUserId = models.ForeignKey(Users,on_delete=models.CASCADE,null=False,help_text="department assgin to User", verbose_name='User Name')
    fkDepartmentId = models.ForeignKey(Department,on_delete=models.CASCADE,null=True, blank= True, help_text="Company associated with deparment", verbose_name='Department Name')

    def __str__(self):
        return "{}".format(self.fkUserId)

def updateProjectFilename(instance, filename):
        path = "projects/"
        prefix, extension = os.path.splitext(filename)
        format = instance.projectName + instance.projectCode + str(instance.id) + extension
        return os.path.join(path, format)

class Projects(models.Model):
    fkCompanyId=models.ForeignKey(Companies,null=False,blank=False, on_delete=models.CASCADE,help_text="company details",verbose_name='Company ID')
    projectName=models.CharField(max_length=100, blank=False, null=False, help_text="Name of a projects",verbose_name='Projects Name')
    projectCode=models.CharField(max_length=20,default=None, blank=True,unique=True, null=True,help_text="Number of Projects",verbose_name='Projects Code')
    projectImage=models.ImageField(upload_to=updateProjectFilename, blank=True, null=True,help_text="Logo file for Projects",verbose_name='Projects Image')
    projectDescription=models.CharField(max_length=100, default=None, blank=True, null=True, help_text="Descriptions of a projects",verbose_name='Projects Descriptions')
    publish=models.BooleanField(max_length=11, default=None,help_text="Flag to be set for pulish status")
    projectPhase=models.CharField(max_length=100, default=None,blank=False, null=False, help_text="Phases of a projects",verbose_name='Projects Phases')
    projectNature=models.CharField(max_length=100, default=None,blank=False, null=False, help_text="Natures of a projects",verbose_name='Projects Natures')
    vendorContext=models.CharField(max_length=100, default=None,blank=True, null=True, help_text="Name of a Vendor",verbose_name='Vendor Name',)
    vendorReferenceId=models.CharField(max_length=100,default=None, blank=True, null=True, help_text="Id of a Vendor",verbose_name='Vendor Id')
    primaryNumber = models.CharField(max_length=30,default='-',blank=True,null=True,help_text="Primary Number for SOS",verbose_name='Primary Number')
    secondaryNumber = models.CharField(max_length=30,default='-',blank=True,null=True,help_text="Secondary Number for SOS",verbose_name='Secondary Number')
    createdAt = models.DateTimeField(auto_now_add=True,help_text="created date")
    createdBy = models.IntegerField(default=None, blank=True, null=True,help_text="User ID who creates")
    updatedAt = models.DateTimeField(auto_now=True,help_text="updated date")
    updatedBy = models.IntegerField(default=None, blank=True, null=True,help_text="UserID who updates")


    def __str__(self):
        return self.projectName
    
    class Meta:
        verbose_name_plural = "Projects"

class Structures(models.Model):
    id = models.AutoField(primary_key=True)
    fkCompanyId=models.ForeignKey(Companies,default=None,blank=True,null=True, on_delete=models.CASCADE,help_text="company details",verbose_name='Company ID')
    fkProjectId=models.ForeignKey(Projects,null=False, blank=False, on_delete=models.CASCADE,help_text="Projects details",verbose_name='Project ID')
    name=models.CharField(max_length=100, blank=False, null=False, help_text="Names",verbose_name='Name')
    parentId=models.BigIntegerField(blank=True, null=True,help_text="Parent Id details",verbose_name='Parent Id')
    depth=models.CharField(max_length=100, default=" ",blank=False, null=False, help_text="Depth of 1L,2L...5L",verbose_name='Depth')
    createdAt = models.DateTimeField(auto_now_add=True,help_text="created date")
    createdBy = models.IntegerField(default=None, blank=True, null=True,help_text="User ID who creates")
    updatedAt = models.DateTimeField(auto_now=True,help_text="updated date")
    updatedBy = models.IntegerField(default=None, blank=True, null=True,help_text="UserID who updates")

    def __str__(self):
        return self.name
    class Meta:
        verbose_name_plural = "Structures"

class ProjectStructures(models.Model):
    id = models.AutoField(primary_key=True)
    fkCompanyId=models.ForeignKey(Companies,default=None,blank=True,null=True, on_delete=models.CASCADE,help_text="company details",verbose_name='Company ID')
    fkProjectId=models.ForeignKey(Projects,null=False, blank=False, on_delete=models.CASCADE,help_text="Projects details",verbose_name='Project ID')
    fkStructureId=models.ForeignKey(Structures,default=None,null=False, blank=False, on_delete=models.CASCADE,help_text="Structures details",verbose_name='Structures ID')
    structureName=models.CharField(max_length=100, blank=False, null=False, help_text="Name of a Structure",verbose_name='Structure Name',)
    structureCode=models.CharField(max_length=100, blank=True, null=True, help_text="project structure code",verbose_name='project structure code')
    parentId=models.BigIntegerField(blank=True, null=True,help_text="Parent Id details",verbose_name='Parent Id')
    depth=models.CharField(max_length=100, default=" ",blank=False, null=False, help_text="Depth of 1L,2L...5L",verbose_name='Depth')
    name=models.CharField(max_length=100, blank=False, null=False, help_text="Names",verbose_name='Name')
    vendorContext=models.CharField(max_length=100, default=None,blank=True, null=True, help_text="Name of a Vendor",verbose_name='Vendor Name',)
    vendorReferenceId=models.CharField(max_length=100,default=None, blank=True, null=True, help_text="Id of a Vendor",verbose_name='Vendor Id')
    createdAt = models.DateTimeField(auto_now_add=True,help_text="created date")
    createdBy = models.IntegerField(default=None, blank=True, null=True,help_text="User ID who creates")
    updatedAt = models.DateTimeField(auto_now=True,help_text="updated date")
    updatedBy = models.IntegerField(default=None, blank=True, null=True,help_text="UserID who updates")

    class Meta:
        verbose_name_plural = "Projects Structures"

class Subscriptions(models.Model):
    fkCompanyId=models.ForeignKey(Companies,null=False, blank=False, on_delete=models.CASCADE,help_text="company details",verbose_name='Company')
    fkAppId=models.ForeignKey(Applications,null=False, blank=False, on_delete=models.CASCADE,help_text="application details",verbose_name='Application')
    fkModuleId=models.ForeignKey(Modules,null=False, blank=False, on_delete=models.CASCADE,help_text="module details",verbose_name='Module')
    status=models.BooleanField(default=True,help_text="Status of subscription")
    createdAt = models.DateTimeField(auto_now_add=True,help_text="created date")
    updatedAt = models.DateTimeField(auto_now=True,help_text="updated date")


class ProjectACL(models.Model):
    fkCompanyId=models.ForeignKey(Companies, on_delete=models.CASCADE,help_text="company details",verbose_name='Company')
    fkProjectId=models.ForeignKey(Projects,on_delete=models.CASCADE,help_text="Projects details",verbose_name='Project ID')
    fkUserId = models.ForeignKey(Users,on_delete=models.CASCADE,help_text="User", verbose_name='User Name')
    projectStructureIds=models.CharField(max_length=50, default='*', help_text="project structureIds",verbose_name='Project StructureIds')
    disciplineId=models.BigIntegerField(default=0,help_text="discipline Id details",verbose_name='discipline Id')
    status=models.BooleanField(default=True,help_text="Status of subscription")
    createdAt = models.DateTimeField(auto_now_add=True,help_text="created date")
    updatedAt = models.DateTimeField(auto_now=True,help_text="updated date")
    createdBy = models.BigIntegerField(default=None, blank=True, null=True,help_text="User ID who creates")
    updatedBy = models.BigIntegerField(default=None, blank=True, null=True,help_text="UserID who updates")