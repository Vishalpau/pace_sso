from django.contrib import admin
from django.db import models
from django.db.models.fields import Field
from django.db.models.fields.files import ImageField,FileDescriptor
from django.core.files.storage import FileSystemStorage
from django.contrib.auth import get_user_model
Users = get_user_model()
# from django.contrib.auth.models import PermissionMixin
from companies.models import *
from django.contrib.auth.models import Group, Permission, ContentType
from django.contrib import admin
from oauth2_provider.models import Application

import os
# from user.models import Invites
# from user import models

# Create your models here.

def update_filename(instance, filename):
        path = "applogos/"
        prefix, extension = os.path.splitext(filename)
        format = instance.appCode + extension
        return os.path.join(path, format)

def uploadModuleIcon(instance, filename):
        path = "moduleIcons/"
        prefix, extension = os.path.splitext(filename)
        format = instance.moduleCode+extension
        return os.path.join(path, format)


class Applications(models.Model):
    appId = models.AutoField(primary_key=True)
    appCode = models.CharField(max_length=10, blank=False,unique=True,null=False,help_text="Application Code must be unique and max length of 10 characters")
    appName = models.CharField(max_length=100, blank=False, null=False,help_text="Name for application")
    appDesc = models.TextField(blank=True, null=True,help_text="application description")
    appURL = models.CharField(max_length=500, blank=True, null=True,help_text="URL of application")
    appLogo = models.ImageField(upload_to=update_filename, blank=True, null=True,help_text="Logo file for Application")
    active = models.BooleanField(blank=True, default=True,help_text="Flag to set Status of Application")
    created_at = models.DateTimeField(auto_now_add=True,help_text="Application created time")
    updated_at = models.DateTimeField(auto_now=True,help_text="application last updated time")

    def __str__(self):
        return self.appName

    class Meta:
        verbose_name_plural = "Applications"

    # def save(self,*args,**kwargs):
    #     if self.appId is None:
    #         app_logo=self.appLogo
    #         self.appLogo = None
    #         super(Applications,self).save(*args,**kwargs) 
    #         self.appLogo=app_logo
    #         self.appLogoName=str(self.appLogo)
    #         if 'force_insert' in kwargs:
    #             kwargs.pop('force_insert')
    #     super(Applications,self).save(*args,**kwargs) 

admin.site.register(Applications)

# class ApplicationRoles(models.Model):
#     roleId = models.AutoField(primary_key=True)
#     fkAppId = models.ForeignKey(Applications, on_delete=models.CASCADE,default=None,help_text="Application to be selected",verbose_name='App Id')
#     roleName = models.CharField(max_length=100,help_text="Name for Application Role")
#     roleDesc = models.TextField(blank=True, null=True,help_text="Role Description")
#     scope=models.CharField(max_length=200,default=None,blank=True,null=True,help_text="Scope of Role Eg: Create/read/update/delete")
#     isaDefault = models.BooleanField(blank=True, default=True,help_text="Flag for Default role")
#     createdAt = models.DateTimeField(auto_now_add=True,help_text="Application role created time")
#     updatedAt = models.DateTimeField(auto_now=True,help_text="Role last updated time")

#     def __str__(self):
#         return self.roleName

# admin.site.register(ApplicationRoles)

class UserAppAccess(models.Model):
    fkUserId = models.ForeignKey(Users,default=None, on_delete=models.CASCADE,help_text="UserID for Subscription")
    # fkRoleId = models.ForeignKey(ApplicationRoles, on_delete=models.CASCADE,help_text="Application Role to be specified", null=True, blank=True)
    fkGroupId = models.ForeignKey(Group,default=None, on_delete=models.CASCADE,help_text="Application group to be specified")
    fkAppId = models.ForeignKey(Applications,default=None, on_delete=models.CASCADE,related_name='fkApplicationId',help_text="Application to which user wants to subscribe")
    fkCompanyId = models.ForeignKey('companies.Companies',related_name="fkCompanyId", on_delete=models.CASCADE,help_text="Company associated with user",null=True,blank=True)
    active = models.BooleanField(default=True,help_text="Flag for status of subscription")
    createdAt = models.DateTimeField(auto_now_add=True,help_text="Subscription created time")
    updatedAt = models.DateTimeField(auto_now=True,help_text="subscription last updated time")

    def __str__(self):
        return "{}".format(self.fkCompanyId)


    class Meta:
        verbose_name_plural = "User App Access"
        unique_together = ('fkUserId','fkAppId','fkCompanyId')

            

class Invites(models.Model):
    fkUserId = models.ForeignKey(
        Users,
        on_delete=models.CASCADE,
        null=False,default=None,help_text="User Id of user who invites", verbose_name='User Id'
    )

    fkAppId = models.ForeignKey('applications.Applications',on_delete=models.CASCADE,blank=True,null=True,related_name='applications',help_text="Application to which user wants to subscribe",verbose_name='App Id')
    fkGroupId = models.ForeignKey(Group, on_delete=models.CASCADE,blank=True,null=True,help_text="ApplicationRoles Role to be specified",verbose_name='Role Id')
    fkCompanyId = models.ForeignKey('companies.Companies',blank=True,null=True,related_name="companies", on_delete=models.CASCADE,help_text="Company associated with user",verbose_name='Company Id')
    
    referralEmail = models.EmailField(max_length=75,blank=True,null=True,help_text="Email of user to be invited")
    referralPhone = models.BigIntegerField(blank=True,null=True,help_text="mobile number of user to be invited")
    # referredUserId = models.IntegerField(blank=True,null=True,help_text="User Id of Inviter")
    
    referralCode = models.CharField(max_length=45, null=True, blank=True,help_text="auto generated referral code to be sent with invitaion link")
    action=models.CharField(max_length=10, null=True, blank=True,help_text="Action to be performed after clicking on referral link")
    isInviteSent = models.BooleanField(default=True,help_text="Flag for invitaion sent")
    reminderCount = models.IntegerField(default=0, null=True, blank=True,help_text="count of reminders sent")
    stopReminder = models.BooleanField(default=False,help_text="Flag to stop the reminders")
    inviteeStatus=models.CharField(default='pending',max_length=10, null=True, blank=True,help_text="Action to be performed after clicking on referral link")
    created = models.DateTimeField(auto_now_add=True,help_text="Created date of User invitation")
    updated = models.DateTimeField(auto_now=True,help_text="last updated date of invitaion")

    def __str__(self):
        return self.referralEmail

    class Meta:
        verbose_name_plural = "Invites"

class AppHostings(models.Model):
    fkAppId = models.ForeignKey('applications.Applications',default=None,on_delete=models.CASCADE,help_text="Application to which user wants to subscribe",verbose_name='App Id')
    fkCompanyId = models.ForeignKey('companies.Companies', default=None,on_delete=models.CASCADE,help_text="Company associated with user",verbose_name='Company Id')
    fkOauthClientId = models.ForeignKey(Application,default=None,blank=True,null=True,on_delete=models.CASCADE,help_text="OAuth ClientID to be selected/mentioned")
    apiDomain = models.CharField(max_length=256,blank=True,null=True,default='',help_text="API domain URL")
    appDomain = models.CharField(max_length=256,blank=True,null=True,default=None,help_text="App domain URL")
    active = models.BooleanField(default=True,help_text="Flag for status of hosting")
    created = models.DateTimeField(auto_now_add=True,help_text="Created date of User invitation")
    updated = models.DateTimeField(auto_now=True,help_text="last updated date of invitaion")

    def __str__(self):
        return self.appDomain

    class Meta:
        verbose_name_plural = "App Hostings"
        unique_together = ('fkAppId', 'fkCompanyId','appDomain')

# class Group(Group):
#     fkAppId=models.ForeignKey(Applications, on_delete=models.CASCADE,default=None,help_text="Application to be selected")
#     class Meta:
#         pass

Group.add_to_class('fkAppId', models.ForeignKey(Applications, on_delete=models.CASCADE,default=None,help_text="Application to be selected"))

ContentType.add_to_class('application', models.CharField(null=True,blank=True,max_length=25, default='sso',help_text="Application to be selected"))


class Modules(models.Model):
    fkAppId = models.ForeignKey('applications.Applications',default=None,on_delete=models.CASCADE,help_text="Application to which user wants to subscribe",verbose_name='App Id')
    moduleWebName = models.CharField(max_length=50, null=True, blank=True)
    moduleMobileName = models.CharField(max_length=50, null=True, blank=True)
    moduleCode = models.CharField(max_length=30, null=True, blank=True)
    moduleIcon = models.ImageField(upload_to=uploadModuleIcon, blank=True, null=True,help_text="icon of an application module")
    active = models.BooleanField(default=True,help_text="Flag for status of hosting")
    targetPage = models.CharField(max_length=100, null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True,help_text="Created date of User invitation")
    updated = models.DateTimeField(auto_now=True,help_text="last updated date of invitaion")

    def __str__(self):
        return self.moduleWebName

    class Meta:
        verbose_name_plural = "Application Modules"
        
class HostingsMaster(models.Model):
    hostId = models.AutoField(primary_key=True)
    fkAppId = models.ForeignKey('applications.Applications',default=None,on_delete=models.CASCADE,help_text="Application to which user wants to subscribe",verbose_name='App Id')
    awsRegion=models.CharField(max_length=45,default=None,help_text="AWS Region")
    apiDomain = models.CharField(max_length=256,default=None,help_text="API domain URL")
    appDomain = models.CharField(max_length=256,default=None,help_text="App domain URL")
    status = models.BooleanField(default=True,help_text="Flag for status of hosting")
    created = models.DateTimeField(auto_now_add=True,help_text="Created date of User invitation")
    updated = models.DateTimeField(auto_now=True,help_text="last updated date of invitaion")

    def __str__(self):
        return self.apiDomain

    class Meta:
        verbose_name_plural = "Hostings Master"
        unique_together = ('fkAppId', 'awsRegion')