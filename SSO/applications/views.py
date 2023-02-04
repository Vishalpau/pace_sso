from django.shortcuts import render,get_object_or_404

from user.serializers import UserAppAccessSerializer

from .models import Applications , AppHostings, Modules,UserAppAccess
from .serializers import ApplicationsSerializer,GroupSerializer, AppHostingsSerializer, ModuleSerializer, ApplicationDetailsSerializer,GroupwithPermissionsSeraializer,GroupSeraializer
from django.contrib.auth.models import Group
from rest_framework import generics
from rest_framework import mixins
from rest_framework.response import Response
from project.permissions import IsSuperUser, HasAPIKey, IsSubscribed #,CustomTokenMatchesOASRequirements
from rest_framework.permissions import IsAuthenticated,AllowAny
from django.contrib.auth import get_user_model
from project.renderers import UserRenderer
from rest_framework.parsers import MultiPartParser, FormParser
import boto3
from rest_framework import status, mixins
from io import BytesIO
User = get_user_model()
from rest_framework.decorators import api_view, permission_classes, renderer_classes
from django.middleware.csrf import get_token

from oauth2_provider.contrib.rest_framework.authentication import OAuth2Authentication
from oauth2_provider.contrib.rest_framework.permissions import TokenHasReadWriteScope,TokenHasScope,TokenHasResourceScope,TokenMatchesOASRequirements
from django.contrib.auth.decorators import user_passes_test

from .permissions import CustomApplicationPermissions

# Create your views here.

def is_defaultUser(user):
    return user.groups.filter(name='DefaultUser').exists()

# @user_passes_test(is_defaultUser)
class ApplicationsAPIView(generics.ListCreateAPIView):

    serializer_class=ApplicationDetailsSerializer
    queryset=Applications.objects.all().order_by('appName')
    # parser_classes = (MultiPartParser, FormParser)
    permission_classes=(IsAuthenticated,)
    
    
    def get(self, request):
        """
        List all the applications registered,List the data as JSON object,
        """
        # csrf_token = get_token(request)
        # print(csrf_token)
        return self.list(request)

    def post(self, request):

        """
        Create the applications,by passing the data in the form of JSON object,
        Application Name, Application Code are the required fileds
        
        """
        if 'appLogo' in request.FILES:
            s3 = boto3.client('s3', aws_access_key_id='AKIASR66WPSCQIZB5SGU', aws_secret_access_key='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', region_name='ap-south-1')
            upload = request.FILES['appLogo']
            
            key = 'applogos/'+request.data['appCode']+'.png'

            s3.put_object(
                ACL='public-read',
                Bucket='single-sign-on',
                Key=key,
                Body=upload,
                ContentType='image/*',
            )
        return self.create(request)

class ApplicationDetailAPIView(ApplicationsAPIView,generics.RetrieveUpdateDestroyAPIView):

    serializer_class=ApplicationDetailsSerializer
    queryset=Applications.objects.all().order_by('appName')
    # parser_classes = (MultiPartParser, FormParser)
    lookup_field='pk'
    allowed_methods=['GET','PUT',]
    permission_classes=(IsAuthenticated,)

    def get(self, request,pk):
        """
        List out details of a application
        """
        return self.retrieve(request)


class AppModules(ApplicationsAPIView,generics.RetrieveUpdateDestroyAPIView):

    serializer_class=ApplicationsSerializer
    queryset=Applications.objects.all().order_by('appName')
    parser_classes = (MultiPartParser, FormParser)
    lookup_field='pk'
    allowed_methods=['GET','PUT',]
    permission_classes=(IsAuthenticated,)
    

    def get(self, request,pk):
        """
        List out details of a application
        """
        return self.retrieve(request)

    def put(self, request, pk):
        """
        update the application details,by passing the data in the form of JSON object,
        Application Code is non editable field.
        
        """
        return self.update(request, pk)

    # def delete(self, request, pk):
    #     """
    #     update the application details,by passing the data in the form of JSON object,
    #     Application Code is non editable field.
        
    #     """
    #     return self.destroy(request, pk)

class GroupAPIView(generics.ListCreateAPIView):
    serializer_class = GroupSeraializer
    queryset = Group.objects.all().order_by('name')
    lookup_field = 'pk'
    # permission_classes=(CustomApplicationPermissions,)
    permission_classes=(IsAuthenticated,)
    
    def get_queryset(self):
        fkAppId = self.kwargs['fkAppId']
        ##added
        application = Applications.objects.get(appCode = 'accounts')
        if not application:
            return False
        else:
            appId = application.appId

        fkCompanyId=None
        subscriptions = None
        if 'companyId' in self.request.session:
            print({'session':self.request.session['companyId']})
            fkCompanyId=self.request.session['companyId']
            self.request.session['companyId'] = fkCompanyId

        if fkCompanyId is not None:
            subscriptions = UserAppAccess.objects.filter(fkUserId = self.request.user.id, fkAppId = appId, fkCompanyId=fkCompanyId).first()
            print("::subscriptions::",subscriptions,"==",self.request.session.items(),"==",appId)

        group = None        
        if subscriptions is not None:
            group = Group.objects.filter(id = subscriptions.fkGroupId.id).values_list('name',flat=True).first()
            if group is not None and group == "System Admin" and not self.request.user.is_superuser:
                locations = Group.objects.filter(fkAppId=fkAppId).exclude(name__contains='Admin').order_by('name')
            else:
                locations = Group.objects.filter(fkAppId=fkAppId).order_by('name')
        elif 'pk' in self.kwargs and self.kwargs['pk'] is not None:
            locations = Group.objects.filter(fkAppId=fkAppId).order_by('name')
        else:
            locations = []
        return locations

    def get(self, request,fkAppId):
        object_list = self.get_queryset()
        if not object_list:
            return Response({"detail": "You do not have permission to perform this action."},status=status.HTTP_403_FORBIDDEN)            
        else:
            """
                List the roles of applications,Get the data as JSON object        
            """
            return self.list(request,fkAppId)
            

    def post(self, request,fkAppId, pk=None):
        """
        Create the roles for an application,by passing the data in the form of JSON object,
        Mention Application Name by passing application ID.
        AppId and Role Name are the required fileds
        
        """
        return self.create(request,fkAppId)

class GroupDetailAPIView(GroupAPIView,generics.RetrieveUpdateAPIView):

    serializer_class = GroupwithPermissionsSeraializer
    queryset = Group.objects.all().order_by('name')
    lookup_field = 'pk'
    allowed_methods=['GET','PUT']
    permission_classes=(IsAuthenticated,)

    def get(self, request,fkAppId,pk):
        """
        Get the role details of an Application
        """
        return self.retrieve(request)

    def put(self, request, fkAppId,pk):
        """
        update the role details of an application,by passing the data in the form of JSON object        
        """
        return self.update(request,fkAppId, pk)

class AppHostingAPIView(generics.ListCreateAPIView):
    
    serializer_class = AppHostingsSerializer
    queryset = AppHostings.objects.all()
    # lookup_field = 'pk'
    allowed_methods=['GET','POST']
    permission_classes=((IsAuthenticated,))

    def get_queryset(self):
        fkAppId = self.kwargs['fkAppId']
        # hostings=get_object_or_404(AppHostings, fkAppId=fkAppId)
        hostings = AppHostings.objects.filter(fkAppId=fkAppId)
        return hostings

    def get(self, request, fkAppId):
        """
        List all the Subscribed applications of a User and its details
        """
        return self.list(request)
    
    def perform_create(self, serializer):
        appId = self.kwargs['fkAppId']
        applications=get_object_or_404(Applications, appId=appId)
        serializer.save(fkAppId=applications)


    def post(self, request, fkAppId):
        """
        End point to Subscribe the application by an User
        """
        return self.create(request, fkAppId)

class AppHostingDetailAPIView(AppHostingAPIView,generics.RetrieveUpdateAPIView):

    serializer_class = AppHostingsSerializer
    queryset = AppHostings.objects.all()
    lookup_field = 'pk'
    allowed_methods=['GET','PUT']
    permission_classes=((IsAuthenticated,))

    def get(self, request, fkAppId, pk):
        """
        List details the Subscribed applications of a User and its details
        """
        return self.retrieve(request)

    def put(self, request, fkAppId, pk):
        """
        Update the subscription details of an User
        """
        return self.update(request, fkAppId, pk)

class AppModules(generics.ListCreateAPIView):
    
    serializer_class = ModuleSerializer
    queryset = Modules.objects.all().order_by('moduleWebName')
    # lookup_field = 'pk'
    permission_classes=((IsAuthenticated,))
    allowed_methods=['POST']

   
    def post(self, request):
        """
        List all the Subscribed applications of a User and its details
        """
        print(type((request.data['fkAppId'])))


        if 'moduleIcon' in request.FILES:
            s3 = boto3.client('s3', aws_access_key_id='AKIASR66WPSCQIZB5SGU', aws_secret_access_key='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', region_name='ap-south-1')
            upload = request.FILES['moduleIcon']
            
            key = 'moduleIcons/'+request.data['moduleCode']+'.png'

            s3.put_object(
                ACL='public-read',
                Bucket='single-sign-on',
                Key=key,
                Body=upload,
                ContentType='image/*',
            )

        application = request.data['fkAppId']
        # return Response(application)
        if not application:
            modules = Modules.objects.all().order_by('moduleWebName')
        else:
            modules = Modules.objects.filter(fkAppId_id__in=application).order_by('moduleWebName')
        serializer = ModuleSerializer(modules, many=True)
        return Response(serializer.data)
        return modules



# @swagger_auto_schema(methods=['post'],request_body=UserSerializer)
@api_view(['GET', ])
@permission_classes((IsAuthenticated,))
def AppCompanyModule(request, moduleCode, companyId):
    """
    API to register/Signup User account
    """
    if request.method == 'GET':
        modules = Modules.objects.get(moduleCode = moduleCode)
        serializer = ModuleSerializer(modules)
        fkAppId = serializer.data['fkAppId']
        hostings = AppHostings.objects.get(fkAppId=fkAppId, fkCompanyId=companyId)
        hostingsSerializer = AppHostingsSerializer(hostings)
        return Response({'hostings': hostingsSerializer.data, 'modules':serializer.data}, status=status.HTTP_200_OK)

class SubscribeAccount(generics.ListCreateAPIView):
    serializer_class = UserAppAccessSerializer
    permission_classes=((IsAuthenticated,))
    allowed_methods=['GET']

    def get(self, request,uuid,companyId):
        pass
        # if not User.objects.filter(id=uuid).exists():
        #     return Response({"error":"User not found"},status=status.HTTP_404_NOT_FOUND)

        # #check is user belong to company
        # ##added
        # application = Applications.objects.get(appCode = 'accounts')
        # if not application:
        #     return False
        # else:
        #     appId = application.appId

        # is_company_user = UserAppAccess.objects.filter(fkUserId=uuid,fkCompanyId=companyId,fkAppId=appId).filter(active=True).exists()
        # print("::is_company_user::",is_company_user)

        # if not is_company_user:
        #     return Response({"error":"Cannot update profile of unsubscribed user"},status=status.HTTP_400_BAD_REQUEST)
        # #end        
        # userinstance=User.objects.filter(id=uuid)
        # # print(userinstance)
        # departmentUser = self.get_departmentUser(uuid)
        # departments = []
        # if departmentUser is not None:
        #     for departmentId in departmentUser: 
        #         department = Department.objects.get(id=departmentId.fkDepartmentId.id)
        #         print("::department::",department.departmentName)
        #         departments.append(department.departmentName)

        # serializer = CompanyUsersSerializer(userinstance,context={"company": companyId ,"department":departments},many=True)
        # # print(serializer.data)
        # return Response(serializer.data)



