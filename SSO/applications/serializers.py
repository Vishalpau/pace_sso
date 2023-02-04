from .models import Applications , Group, AppHostings,UserAppAccess, Modules
from rest_framework import serializers
from django.contrib.auth.models import Permission
from companies.models import Subscriptions
import datetime

class ApplicationsSerializer(serializers.ModelSerializer):

    roles=serializers.SerializerMethodField()
    modules=serializers.SerializerMethodField()
    # total_subscriptions=serializers.SerializerMethodField()
    hostings=serializers.SerializerMethodField()

    def get_modules(self,obj):
        modules=Modules.objects.filter(fkAppId=obj.appId).order_by('moduleWebName')

        if 'company_id' in self.context:
            companyId=self.context['company_id']
        else:
            companyId=None

        serializer=ModuleSerializer(modules,many=True,context={'company_id':companyId})
        return serializer.data

    def get_roles(self,obj):
        if 'role_id' in self.context:
            roleId=Group.objects.filter(fkAppId=obj.appId,id__in=self.context['role_id']).values_list('id',flat=True)
        else:
            roleId=Group.objects.filter(fkAppId=obj.appId).values_list('id',flat=True)
        roles=Group.objects.filter(id__in=roleId).order_by('name')
        serializer=GroupSerializer(roles,many=True)
        return serializer.data

    def get_hostings(self,obj):
        if 'company_id' in self.context:
            hostings=AppHostings.objects.filter(fkCompanyId=self.context['company_id'], fkAppId=obj.appId)
        else:
            hostings=AppHostings.objects.filter(fkAppId=obj.appId)
        

        serializer=AppHostingsSerializer(hostings,many=True)

        return serializer.data

    class Meta:
        model = Applications
        fields = ('appId','appCode','appName','appURL','appDesc','appLogo','modules', 'hostings', 'active','created_at','updated_at','roles')


class CompanySubscriptionsSerializer(ApplicationsSerializer,serializers.ModelSerializer):
    subscription_details=serializers.SerializerMethodField()
    total_subscriptions=serializers.SerializerMethodField()
    modules=serializers.SerializerMethodField()
    roles=serializers.SerializerMethodField()
    hostings=serializers.SerializerMethodField()
    
    def get_total_subscriptions(self,obj):
        subscription_count=UserAppAccess.objects.filter(fkCompanyId=self.context['company_id'],fkAppId=obj.appId).filter(active=True).count()
        return subscription_count
        
    def get_subscription_details(self,obj):
 
        subscriptions=UserAppAccess.objects.filter(id__in=self.context['subscription_id'],fkAppId=obj.appId).filter(active=True).values_list('id',flat=True)
        subscriptions= UserAppAccess.objects.filter(id__in=subscriptions)
        # print("sub:{}".format(subscriptions))
 
        serializer=SubscriptionSerailizer(subscriptions,many=True)
 
        return serializer.data
    class Meta:
        model = Applications
        fields = ('appId','appCode','appName','appURL','appDesc','appLogo','modules', 'hostings', 'active','created_at','updated_at','total_subscriptions','subscription_details','roles')

class SubscriptionSerailizer(serializers.ModelSerializer):

    class Meta:
        model = UserAppAccess
        fields = '__all__'

class ApplicationDetailsSerializer(serializers.ModelSerializer):
    modules=serializers.SerializerMethodField()
    hostings=serializers.SerializerMethodField()
    def get_modules(self,obj):
        modules=Modules.objects.filter(fkAppId=obj.appId).order_by('moduleWebName')
        serializer=ModuleSerializer(modules,many=True)
        return serializer.data
    def get_hostings(self,obj):
        if 'company_id' in self.context:
            hostings=AppHostings.objects.filter(fkCompanyId=self.context['company_id'], fkAppId=obj.appId)
        else:
            hostings=AppHostings.objects.filter(fkAppId=obj.appId)
        serializer=AppHostingsSerializer(hostings,many=True)

        return serializer.data
    class Meta:
        model = Applications
        fields = '__all__'


class ApplicationsUpdateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Applications
        fields = '__all__'
        read_only_fields = ['appCode', 'createdAt', 'createdBy', ]

class GroupSerializer(serializers.ModelSerializer):
    
    app_name=serializers.CharField(source="fkAppId", read_only=True)
    aclUrl=serializers.SerializerMethodField()
    aclUpdateDate=serializers.CharField(source="fkAppId.updated_at", read_only=True)

    def get_aclUrl(self,obj):
        return "/api/v1/applications/"+str(obj.fkAppId.appId)+"/roles/"+str(obj.id)+"/"

    class Meta:
        model = Group
        fields = ('id','app_name','fkAppId','name','aclUrl','aclUpdateDate')

class GroupwithPermissionsSeraializer(serializers.ModelSerializer):
    app_name=serializers.CharField(source="fkAppId", read_only=True)
    permissions=serializers.SerializerMethodField()

    def get_permissions(self,obj):
        allPermissions = Permission.objects.all()
        
        group=Group.objects.get(id=obj.id,fkAppId_id=obj.fkAppId.appId)
        permissions = group.permissions.all()
        # print({'permissions': (permissions)})
        finalData = []
        # i = 0
        data = {}
        for singlePermission in list(allPermissions):
            
            print(singlePermission.content_type.app_label)
            if singlePermission.content_type.app_label not in data:
                 data[singlePermission.content_type.app_label] = {}
            
            if singlePermission in list(permissions):
                data[singlePermission.content_type.app_label][singlePermission.codename] = True
            else:
                data[singlePermission.content_type.app_label][singlePermission.codename] = False

        finalData.append(data)

        # grpPermissions = [perm.content_type.app_label+'.'+perm.codename for perm in list(permissions)]
        return finalData
    class Meta:
        model = Group
        fields = ('id','app_name','fkAppId','name','permissions')



class AppHostingsSerializer(serializers.ModelSerializer):
    
    # application = serializers.CharField(source="fkAppId", read_only=True)
    # company = serializers.CharField(source="fkCompanyId", read_only=True)
    # applicayion_name=serializers.CharField(source="fkAppId", read_only=True)

    # applicationCode = serializers.CharField(source="fkAppId.appCode", read_only=True)
    # applicationName = serializers.CharField(source="fkAppId.appName", read_only=True)
    clientId = serializers.CharField(source="fkOauthClientId.client_id", read_only=True)

    class Meta:
        model = AppHostings
        # extra_kwargs = {
        #     'fkCompanyId': {'write_only': True},
        #     'appDomain': {'write_only': True}
        # }
        fields = ['id','fkCompanyId','fkOauthClientId','active', 'apiDomain','appDomain','clientId']
        # fields = ['id','fkCompanyId','','appDomain', , 'applicationCode', 'applicationName','clientId']

class ModuleSerializer(serializers.ModelSerializer):
    subscriptionStatus = serializers.SerializerMethodField()

    def get_subscriptionStatus(self,obj):

        if 'company_id' in self.context:
            companyId=self.context['company_id']
            subscription=Subscriptions.objects.filter(fkCompanyId=companyId,fkAppId=obj.fkAppId).values_list('fkModuleId',flat=True)
            if (subscription):
                module_id=[]
                for moduleId in subscription:
                    module_id.append(moduleId)
                if(obj.id in module_id):
                    return 'active'
                else:
                    return 'inactive'
            else:
                return 'inactive'

    class Meta:
        model = Modules
        fields = ['id','moduleWebName','moduleMobileName','moduleCode','moduleIcon','fkAppId', 'targetPage','subscriptionStatus']


class GroupSeraializer(serializers.ModelSerializer):
    app_name=serializers.CharField(source="fkAppId", read_only=True)
    class Meta:
        model = Group
        fields = ('id','app_name','fkAppId','name')
