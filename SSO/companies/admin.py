from django.contrib import admin
 
from oauth2_provider.admin import AccessTokenAdmin
from oauth2_provider.models import AccessToken,RefreshToken
from companies.models import *
from import_export.admin import ImportExportModelAdmin

class ProjectsAdmin(ImportExportModelAdmin,admin.ModelAdmin):
    list_display=('fkCompanyId','projectName','projectCode')
admin.site.register(Projects,ProjectsAdmin)


class StructureAdmin(ImportExportModelAdmin,admin.ModelAdmin):
    list_display=('id','fkProjectId','name','parentId','depth')
admin.site.register(Structures,StructureAdmin)

class ProjectStructureAdmin(ImportExportModelAdmin,admin.ModelAdmin):
    list_display=('id','fkProjectId','fkStructureId','structureName','parentId','depth','vendorReferenceId')
admin.site.register(ProjectStructures,ProjectStructureAdmin)

class SubscriptionAdmin(ImportExportModelAdmin,admin.ModelAdmin):
    list_display=('id','fkCompanyId','fkAppId','fkModuleId','status')
admin.site.register(Subscriptions,SubscriptionAdmin)

class ProjectACLAdmin(ImportExportModelAdmin,admin.ModelAdmin):
    list_display=('fkCompanyId','fkProjectId','fkUserId','projectStructureIds','status')
admin.site.register(ProjectACL,ProjectACLAdmin)




admin.site.unregister(AccessToken)
admin.site.unregister(RefreshToken)

admin.site.register(Companies)
admin.site.register(OperatingLocation)
admin.site.register(APIKey)
admin.site.register(AzureADCredentials)
admin.site.register(Department)


