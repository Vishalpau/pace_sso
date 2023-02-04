from django.db import models
from django.conf import settings

# Create your models here.

class MobileApplication(models.Model):
    id = models.AutoField(primary_key=True)
    choice=(('active','active'),('inactive','inactive'))
    appName = models.CharField(max_length=75, null=True,help_text = "Please enter OS type",verbose_name='Application Names')
    status = models.CharField(max_length=11,choices=choice,default='active',help_text="Status of mobile apps")
    createdAt = models.DateTimeField(auto_now_add=True,help_text="created date")
    createdBy = models.IntegerField(default=None, blank=True, null=True,help_text="User ID who creates")
    updatedAt = models.DateTimeField(auto_now=True,help_text="updated date")
    updatedBy = models.IntegerField(default=None, blank=True, null=True,help_text="UserID who updates")

    def __str__(self):
        return self.appName
    class Meta:
        db_table = "mobile_application"
        verbose_name_plural = "Mobile Applications"

class VersionType(models.Model):
    id = models.AutoField(primary_key=True)
    fkMobileApp=models.ForeignKey(MobileApplication, default=None,null=True,on_delete=models.CASCADE,help_text="App details",verbose_name='Mobile Application')
    choice=(('active','active'),('inactive','inactive'))
    osType = models.CharField(max_length=75, null=True,help_text = "Please enter OS type",verbose_name='OS Type')
    versionCode = models.IntegerField(default=None, blank=True, null=True,help_text="Version Code")
    versionInfo= models.CharField(max_length=75, null=True,help_text = "Please enter OS type",verbose_name='Versions Type')
    status = models.CharField(max_length=11,choices=choice,default='active',help_text="Status of device")
    createdAt = models.DateTimeField(auto_now_add=True,help_text="created date")
    createdBy = models.IntegerField(default=None, blank=True, null=True,help_text="User ID who creates")
    updatedAt = models.DateTimeField(auto_now=True,help_text="updated date")
    updatedBy = models.IntegerField(default=None, blank=True, null=True,help_text="UserID who updates")

    def __str__(self):
        return self.osType
    class Meta:
        db_table = "version_type"
        verbose_name_plural = "Version Types"



