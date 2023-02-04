from django.contrib import admin
from django.db import models
from applications.models import *
from django.contrib.auth.models import Group
from import_export.admin import ImportExportModelAdmin

admin.site.register(Users)  

# admin.site.register(Invites)
class AppHostingsAdmin(ImportExportModelAdmin,admin.ModelAdmin):
    list_display = ('fkCompanyId','fkAppId','fkOauthClientId','apiDomain','appDomain')
admin.site.register(AppHostings,AppHostingsAdmin)

class ModulesAdmin(ImportExportModelAdmin,admin.ModelAdmin):
    list_display = ('fkAppId','moduleWebName','moduleMobileName','moduleCode','active','targetPage')

admin.site.register(Modules,ModulesAdmin)


class GroupsAdmin(admin.ModelAdmin):
    fields=('fkAppId','name','permissions')
    list_display = ('name','fkAppId')

admin.site.unregister(Group)
admin.site.register(Group,GroupsAdmin)

class UserAppAccessAdmin(ImportExportModelAdmin,admin.ModelAdmin):
    fields=('fkCompanyId','fkUserId','fkAppId','fkGroupId','active')
    list_display = ('fkUserId', 'fkCompanyId','fkAppId','fkGroupId','active')
    # def render_change_form(self, request, context, *args, **kwargs):
    #     print(context['adminform'].form)
    #     context['adminform'].form.fields['fkGroupId'].queryset = Group.objects.all()
    #     return super(UserAppAccessAdmin, self).render_change_form(request, context, *args, **kwargs)
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        print(request)
        print(db_field.name)
        if db_field.name == "fkGroupId":
            fkAppId=None
            kwargs["queryset"] = Group.objects.all()
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

admin.site.register(UserAppAccess,UserAppAccessAdmin)