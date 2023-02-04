from .models import Companies, OperatingLocation, APIKey,AzureADCredentials
from oauth2_provider.models import Application
from django.db.models import F,Count
from rest_framework import serializers
import secrets
from cryptography.fernet import Fernet
import base64
from Crypto.Cipher import AES
from rest_framework.reverse import reverse
from rest_framework.response import Response
from django.contrib.auth import get_user_model
User = get_user_model()

from django.contrib.auth.models import Group
from applications.models import Applications, UserAppAccess, AppHostings
from .models import Department,DepartmentUser,Projects,Structures,ProjectStructures,ProjectACL,Subscriptions
from applications.serializers import ApplicationsSerializer, AppHostingsSerializer,CompanySubscriptionsSerializer
from user.models import DeviceInfo

def keygenerator():
    return secrets.token_urlsafe(64)

class CompaniesSerializer(serializers.ModelSerializer):

    subscriptions = serializers.SerializerMethodField()
    projects=serializers.SerializerMethodField()
    departments=serializers.SerializerMethodField()
    def get_projects(self,obj):
        projects=Projects.objects.filter(fkCompanyId=obj.companyId)
        projectstructure=Projects.objects.filter(id__in=projects)
        serializer=ProjectsListSerializer(projectstructure,many=True)
        return serializer.data

    def get_departments(self, obj):
        if('user_id' in self.context):
            fkUserId=self.context['user_id']
            deartments = DepartmentUser.objects.filter(fkUserId=fkUserId, fkCompanyId=obj.companyId)
            
            serializer = DepartmentUserSerializer(deartments, many=True)
            return serializer.data
        return []

    def get_subscriptions(self,obj):
        
        if('user_id' in self.context):
            print("user id")
            fkUserId=self.context['user_id']
            appId=UserAppAccess.objects.filter(fkUserId=fkUserId,fkCompanyId=obj.companyId).values_list('fkAppId_id',flat=True).filter(active=True)
            roleId=UserAppAccess.objects.filter(fkUserId=fkUserId,fkCompanyId=obj.companyId,fkAppId__in=appId).values_list('fkGroupId_id',flat=True)
            subscriptionId=UserAppAccess.objects.filter(fkUserId=fkUserId,fkCompanyId=obj.companyId,fkAppId__in=appId,fkGroupId__in=roleId).values_list('id',flat=True)
        else:

            appId=UserAppAccess.objects.filter(fkCompanyId=obj.companyId).values_list('fkAppId_id',flat=True)
            roleId=UserAppAccess.objects.filter(fkCompanyId=obj.companyId,fkAppId__in=appId).values_list('fkGroupId_id',flat=True)
            subscriptionId=UserAppAccess.objects.filter(fkCompanyId=obj.companyId,fkAppId__in=appId,fkGroupId__in=roleId).values_list('id',flat=True)

        applications = Applications.objects.filter(appId__in=appId)
        serializer = ApplicationsSerializer(applications, many=True,context={'subscription_id':subscriptionId,'appId':appId,'role_id':roleId,'company_id':obj.companyId})
        return serializer.data

    class Meta:
        model = Companies
        fields = '__all__'

class CompanyUserDetailsSerializer(serializers.ModelSerializer):
    subscriptions = serializers.SerializerMethodField()
    departments=serializers.SerializerMethodField()
    def get_departments(self, obj):
        if('user_id' in self.context):
            fkUserId=self.context['user_id']
            deartments = DepartmentUser.objects.filter(fkUserId=fkUserId, fkCompanyId=obj.companyId)
            serializer = DepartmentUserSerializer(deartments, many=True)
            return serializer.data
        return []

    def get_subscriptions(self,obj):

        if('user_id' in self.context):
            fkUserId=self.context['user_id']
            appId=UserAppAccess.objects.filter(fkUserId=fkUserId,fkCompanyId=obj.companyId).values_list('fkAppId_id',flat=True).filter(active=True)
            roleId=UserAppAccess.objects.filter(fkUserId=fkUserId,fkCompanyId=obj.companyId,fkAppId__in=appId).values_list('fkGroupId_id',flat=True)
            subscriptionId=UserAppAccess.objects.filter(fkUserId=fkUserId,fkCompanyId=obj.companyId,fkAppId__in=appId,fkGroupId__in=roleId).values_list('id',flat=True)
        else:

            appId=UserAppAccess.objects.filter(fkCompanyId=obj.companyId).values_list('fkAppId_id',flat=True)
            roleId=UserAppAccess.objects.filter(fkCompanyId=obj.companyId,fkAppId__in=appId).values_list('fkGroupId_id',flat=True)
            subscriptionId=UserAppAccess.objects.filter(fkCompanyId=obj.companyId,fkAppId__in=appId,fkGroupId__in=roleId).values_list('id',flat=True)

        applications = Applications.objects.filter(appId__in=appId)
        serializer = CompanySubscriptionsSerializer(applications, many=True,context={'subscription_id':subscriptionId,'appId':appId,'role_id':roleId,'company_id':obj.companyId})
        return serializer.data

    class Meta:
        model = Companies
        fields = '__all__'

class CompanyDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Companies
        fields = '__all__'


class CompaniesUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Companies
        fields = '__all__'
        read_only_fields = ['companyCode', 'createdAt', 'createdBy', ]
        ref_name = "Company Serializer"


class OperatingLocationSerializer(serializers.ModelSerializer):

    company_name=serializers.CharField(source="companyId", read_only=True)

    class Meta:
        model = OperatingLocation
        fields = ('locationId','locationName','addressLineOne','addressLineTwo','landmark','city','state','postalCode','country','latitude','longitude','panOrTaxid','gstNo','createdaAt','updatedAt','company_name')


class APIKeySerializer(serializers.ModelSerializer):

    oauthclient=serializers.CharField(source="OauthClientId", read_only=True)
    company_name=serializers.CharField(source="companyId", read_only=True)
    app_name=serializers.CharField(source="applicationId", read_only=True)

    class Meta:
        model = APIKey
        fields = ('keyId','apiKey','OauthClientId','applicationId','clientType','clientAppVersions','revoked','createdAt','updatedAt','expiredAt','oauthclient','company_name','app_name')


class APIKeyResetSerializer(serializers.ModelSerializer):
    class Meta:
        model = APIKey
        fields = '__all__'
        read_only_fields = ['clientType', 'clientAppVersions', 'revoked',
                            'expiredAt', 'OauthClientId', 'companyId', 'applicationId', ]

    def update(self, instance, validated_data):

        if validated_data.get('reset') == True:
            APIKey.objects.filter(keyId=instance.keyId, companyId=instance.companyId,
                                  apiKey=instance.apiKey).update(reset=True, revoked=1)
            new_apiKey = keygenerator()
            if APIKey.objects.filter(apiKey=new_apiKey).exists():
                return self.update(instance, validated_data)
            else:
                instance.pk = None
                instance.apiKey = new_apiKey
                instance.revoked = 0
                instance.save()
            return instance
        else:
            return instance

class Oauth2ApplicationListSerializer(serializers.ModelSerializer):
    class Meta:
        model=Application
        fields='__all__'

class DepartmentsListSerializer(serializers.ModelSerializer):
    company_name=serializers.CharField(source="fkCompanyId", read_only=True)
    
    class Meta:
        model=Department
        fields=('company_name','departmentName','departmentDescription','id')

class DepartmentUserSerializer(serializers.ModelSerializer):
    userName=serializers.CharField(source="fkUserId", read_only=True)
    companyName=serializers.CharField(source="fkCompanyId", read_only=True)
    departmentName=serializers.CharField(source="fkDepartmentId", read_only=True)
    departmentId=serializers.CharField(source="fkDepartmentId.id", read_only=True)
    class Meta:
        model = DepartmentUser
        fields = ('userName','companyName','departmentName','id','fkUserId', 'departmentId')

class ProjectsListSerializer(serializers.ModelSerializer):    
    breakdown=serializers.SerializerMethodField()
    projectId = serializers.IntegerField(source='id',read_only=True)

    def get_breakdown(self,obj):
        depth=Structures.objects.filter(fkProjectId=obj.id).values_list('depth',flat=True)
        name=Structures.objects.filter(fkProjectId=obj.id).values_list('name',flat=True)
        structure= Structures.objects.filter(fkProjectId=obj.id,depth__in=depth).order_by('depth')
        serializer=StructuresDepthSerializer(structure, many=True,context={'projectId':obj.id,'companyId':obj.fkCompanyId.companyId,'name':name})
        return serializer.data

    class Meta:
        model=Projects
        fields=('projectId','breakdown','projectName','projectCode','projectImage','projectDescription','publish','projectPhase','projectNature','primaryNumber','secondaryNumber','vendorContext','vendorReferenceId','createdAt')

class StructuresDepthSerializer(serializers.ModelSerializer):
    structure=serializers.SerializerMethodField()
    def get_structure(self,obj):
        structure=Structures.objects.filter(fkProjectId=self.context['projectId'],depth=obj.depth).order_by('depth')
        structure_id=Structures.objects.filter(fkProjectId=self.context['projectId'],depth=obj.depth).values_list('id',flat=True).first()
        serializer=StructuresNameSerializer(structure,many=True,context={'projectId':self.context['projectId'],'companyId':self.context['companyId'],'structureId':structure_id})
        return serializer.data

    class Meta:
        model=Structures
        fields=('depth','structure')


class StructuresNameSerializer(serializers.ModelSerializer):
    url=serializers.SerializerMethodField()

    def get_url(self,obj):
        data={}
        data['fkProjectId']=self.context['projectId']
        data['fkStructureId']=self.context['structureId']
        data['depth']=obj.depth
        qs=ProjectStructures.objects.filter(fkProjectId=self.context['projectId'],fkStructureId=self.context['structureId'],depth=obj.depth).values_list('parentId',flat=True).distinct()
        
        if(qs):
            for parentId in qs:
                url='api/v1/companies/'+str(self.context['companyId'])+'/projects/'+str(self.context['projectId'])+'/projectstructure/'+str(self.context['structureId'])+'/'+str(obj.depth)+'/'
            return url
        else:
            return None

    class Meta:
        model=Structures
        fields=('name','url',)

class StructureListSerializer(serializers.ModelSerializer):
    
    class Meta:
        model=Structures
        fields='__all__'

ids=[]
def getsublevels(parentId):
    sublevelIds=ProjectStructures.objects.filter(parentId=parentId).values_list('id',flat=True)
    if sublevelIds:
        for id in sublevelIds:
            ids.append(int(id))
            getsublevels(id)
    return ids

def checkSublevel(projectStructure,fkCompanyId,fkProjectId):
    structure_list=projectStructure.split(':')
    ids=[]
    for structure in structure_list:
        print(structure)
        if structure !='*':
            ids.append(int(structure.split('L')[-1]))  
        else:
            parentId=ids[-1]
            sublevelIds=getsublevels(parentId)
            # print(list(dict.fromkeys(ids+sublevelIds)))
            ids=list(dict.fromkeys(ids+sublevelIds))            
    return ids

class ProjectStructuresListSerializer(serializers.ModelSerializer):
    structure_name=serializers.CharField(source="fkStructureId", read_only=True)
    aclStatus=serializers.SerializerMethodField()

    def get_aclStatus(self,obj):
        #get ACL for project structure
        fkUserId=self.context['request'].user.id
        projectStructureIds=ProjectACL.objects.filter(fkUserId=fkUserId,fkCompanyId=obj.fkCompanyId,fkProjectId=obj.fkProjectId,status=True).values_list('projectStructureIds',flat=True)
        if (projectStructureIds):
            for projectStructure in projectStructureIds:
                
                #added to give all WBS enabled - need to remove if proper requirements will come
                if(projectStructure!='*'):
                    projectStructure = '*'
                #end

                if(projectStructure=='*'):
                    return True
                else:
                    ids=checkSublevel(str(projectStructure),obj.fkCompanyId,obj.fkProjectId)
                    print(ids)
                    if obj.id in ids:
                        return True
                    else:
                        return False
        else:
            return True            

    class Meta:
        model=ProjectStructures
        fields='__all__'


class UserDetailSerializer(serializers.ModelSerializer):
    department=serializers.SerializerMethodField()

    def get_department(self,obj):
        if('companyId' in self.context):
            departmentUsers = DepartmentUser.objects.filter(fkUserId=obj.id,fkCompanyId=self.context['companyId'])
        else:
            departmentUsers = DepartmentUser.objects.filter(fkUserId=obj.id)
        serializer = DepartmentUserSerializer(departmentUsers, many=True)
        return serializer.data
        
    class Meta:
        model=User
        fields=('id', 'name','email','mobile','state','badgeNo','department', 'country', 'city','timeZone','lattitude','longitude','ipAddressIPV4','ipAddressIPV6','dateOfBirth','gender','bloodGroup','donateBlood','alternateEmail','alternateMobile','panOrTaxid', 'promotionalNotification',
        'activityNotification', 'reasonDeactivate', 'avatar', 'status','last_login')

class GetCompanyUserListSerializer(serializers.ModelSerializer):
    users = serializers.SerializerMethodField()

    def get_users(self,obj):
        if ('userId' in self.context):
            if('appId' in self.context):
                subscribers=UserAppAccess.objects.filter(fkCompanyId=obj.companyId,fkUserId=self.context['userId'],fkAppId=self.context['appId']).values_list('fkUserId', flat=True)
            else:
                subscribers=UserAppAccess.objects.filter(fkCompanyId=obj.companyId,fkUserId=self.context['userId']).values_list('fkUserId', flat=True)
            users=User.objects.filter(id__in=subscribers).order_by('name')
        else:
            if('appId' in self.context):
                subscribers=UserAppAccess.objects.filter(fkCompanyId=obj.companyId,fkAppId=self.context['appId']).values_list('fkUserId', flat=True)
            else:
                subscribers=UserAppAccess.objects.filter(fkCompanyId=obj.companyId).values_list('fkUserId', flat=True)
            users=User.objects.filter(id__in=subscribers,status=True).order_by('name')
        serializer=UserDetailSerializer(users,many=True,context={'companyId':obj.companyId})
        return serializer.data
    
    class Meta:
        model=Companies
        fields='__all__'

class GetCompanyUserListPerRoleSerializer(serializers.ModelSerializer):
    roles = serializers.SerializerMethodField()

    def get_roles(self,obj):
        subscriber_roles=UserAppAccess.objects.filter(fkCompanyId=obj.companyId,fkGroupId=self.context['roleId']).values_list('fkGroupId', flat=True)
        roles=Group.objects.filter(id__in=subscriber_roles).order_by('name')
        serializer=CompanyGroupSerializer(roles,many=True,context={'companyId':obj.companyId})
        return serializer.data
    
    class Meta:
        model=Companies
        fields='__all__'

class CompanyGroupSerializer(serializers.ModelSerializer):
    users = serializers.SerializerMethodField()
    def get_users(self,obj):
        subscribers=UserAppAccess.objects.filter(fkCompanyId=self.context['companyId'],fkGroupId=obj.id).values_list('fkUserId', flat=True)
        users=User.objects.filter(id__in=subscribers).order_by('name')
        serializer=UserDetailSerializer(users,many=True)
        return serializer.data
    class Meta:
        model=Group
        fields=('id','name','fkAppId','users')

def encrypt_text(key,plain_text):
    f = Fernet(key)
    encrypted_text = f.encrypt(bytes(plain_text, "UTF-8"))
    return encrypted_text.decode()


def decrypt_text(key,encrypted_text):
    f = Fernet(key)
    return f.decrypt(bytes(encrypted_text,"UTF-8")).decode()

class CompanyADSerializer(serializers.ModelSerializer):
    adConfiguration = serializers.SerializerMethodField()

    def get_adConfiguration(self,obj):
        instance=AzureADCredentials.objects.filter(fkCompanyId=obj.companyId).values_list('adTenantId','adClientId','adClientSecret')
        if (instance):
            for config in instance:

                key= base64.urlsafe_b64encode(b'paceazuread#2021paceazuread#2021')
                tenantId = encrypt_text(key,config[0])
                clientId =  encrypt_text(key,config[1])
                clientSecret =  encrypt_text(key,config[2])
                
                return {'tenantId':tenantId,'clientId':clientId,'clientSecret':clientSecret}
        else:
            return None

    class Meta:
        model=Companies
        fields='__all__'


class ProjectACLSerializer(serializers.ModelSerializer):
    fkUserId=serializers.CharField(source="fkUserId.id", read_only=True)
    fkCompanyId=serializers.CharField(source="fkCompanyId.companyId", read_only=True)
    fkProjectId=serializers.CharField(source="fkProjectId.id", read_only=True)
    class Meta:
        model=ProjectACL
        fields=('fkUserId','fkCompanyId','fkProjectId','projectStructureIds','disciplineId','status','createdAt','updatedAt','createdBy','updatedBy')

class SubscriptionsSerializer(serializers.ModelSerializer):
    applications = serializers.SerializerMethodField()
    def get_applications(self,obj):
        print(self.context['fkCompanyId'])
        applications = Applications.objects.filter(appId=obj.fkAppId.appId)
        serializer = ApplicationsSerializer(applications, many=True,context={'company_id':self.context['fkCompanyId']})
        return serializer.data
    class Meta:
        model=Subscriptions
        fields='__all__'

class DeviceInfoSerializer(serializers.ModelSerializer):
    fkUserId=serializers.CharField(source="fkuserId.id", read_only=True)
    class Meta:
        model=DeviceInfo
        fields=('id','fkUserId','deviceBrand','deviceModel','platform','osVersion','last_login','appInstalledDate','status','appVersion')