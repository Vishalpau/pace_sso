import secrets
from django.shortcuts import render
from .models import Companies, OperatingLocation, APIKey, Department,DepartmentUser,Projects,Structures,ProjectStructures,ProjectACL,Subscriptions
from oauth2_provider.models import Application
from .serializers import (CompaniesSerializer, CompanyDetailsSerializer,CompaniesUpdateSerializer, OperatingLocationSerializer, APIKeySerializer, APIKeyResetSerializer,Oauth2ApplicationListSerializer,Oauth2ApplicationListSerializer,DepartmentsListSerializer,DepartmentUserSerializer,
                            ProjectsListSerializer,StructureListSerializer,ProjectStructuresListSerializer,GetCompanyUserListSerializer,GetCompanyUserListPerRoleSerializer,CompanyADSerializer,ProjectACLSerializer,SubscriptionsSerializer)
from user.serializers import UserAppAccessSerializer
from rest_framework import generics
from rest_framework import mixins
from rest_framework.response import Response
from project.permissions import HasAPIKey, IsSuperUser,IsSubscribed
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.conf import settings
from django.contrib.auth import get_user_model
from project.renderers import UserRenderer,UserRendererV2
from rest_framework.decorators import api_view, permission_classes, renderer_classes
from drf_yasg import openapi
# from .permissions import CustomCompanyPermissions,CustomOperatingLocPermissions,CustomApiKeyPermissions
from drf_yasg.utils import swagger_auto_schema
from applications.models import Applications,Group,UserAppAccess
from applications.serializers import ApplicationsSerializer
from django.db.models import Q
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import status
from django.http import Http404
# from dry_rest_permissions.generics import DRYPermissions

User = get_user_model()

#import statements
import geopy
from geopy.geocoders import Nominatim

def keygenerator():
    return secrets.token_urlsafe(64)

# Create your views here.


"""
Comapnies API to create companies
"""

class CompaniesAPIView(generics.ListCreateAPIView):
    serializer_class = CompanyDetailsSerializer
    queryset = Companies.objects.all().order_by('companyName')
    permission_classes=(IsAuthenticated,)

    def get(self, request):
        """
        List all the companies registered,List the data as JSON object,
        """
        return self.list(request)

    def get_serializer_class(self):
        serializer_class = self.serializer_class
        if self.request.method == 'PUT':
            serializer_class = CompaniesUpdateSerializer
        return serializer_class

    def perform_create(self, serializer):
        # geopy.geocoders.options.default_user_agent="viraj123"
        # geolocator=Nominatim()
        # city=self.request.data['city']
        # country=self.request.data['country']
        # loc=geolocator.geocode(city+','+country)
        serializer.save(createdBy=self.request.user.id,
                        updatedBy=self.request.user.id)
                        # latitude=loc.latitude,
                        # longitude=loc.longitude)
        
    def post(self, request):
        """
        Create new Company,Stores data as JSON object,
        Company name,company Code, city, state,country, business vertical are the required fileds
        latitude and longitude are autodetected fields if not passed

        """
        return self.create(request)

class CompaniesDetailAPIView(CompaniesAPIView,generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CompanyDetailsSerializer
    queryset = Companies.objects.all().order_by('companyName')
    lookup_field = 'pk'
    allowed_methods=['GET','PUT']
    permission_classes=(IsAuthenticated,)

    def get(self, request,pk):
        if not 'companyId' in request.session:
            request.session['companyId']=pk
        """
        List out details of a company
        """
        return self.retrieve(request)

    def perform_update(self, serializer):
        serializer.save(updatedBy=self.request.user.id)

    def put(self, request, pk):
        """
        update the company details,by passing the data in the form of JSON object,
        Company Code is non editable field.
        
        """
        return self.update(request, pk)

    def delete(self, request, pk):
        """
        update the application details,by passing the data in the form of JSON object,
        Application Code is non editable field.
        
        """
        try:
            self.destroy(request, pk)
            return Response({request.data})
        except Exception as e:
            return Response({'error':str(e)})
        


class OperatingLocationAPIView(generics.ListCreateAPIView):
    """
    Locations API to create companies Operating locations
    """
    serializer_class = OperatingLocationSerializer
    queryset = OperatingLocation.objects.all().order_by('LocationName')
    # permission_classes=(CustomOperatingLocPermissions,)
    permission_classes=(IsAuthenticated,)

    def get_queryset(self):
        companyId = self.kwargs['companyId']
        locations = OperatingLocation.objects.filter(companyId=companyId).order_by('LocationName')
        return locations

    def get(self, request, companyId):
        """
        List the details of operating locations of a registered company ,List the data as JSON object,
        """
        return self.list(request, companyId)

    def perform_create(self, serializer):
        companyId = self.kwargs['companyId']
        companies=Companies.objects.get(companyId=companyId)
        serializer.save(companyId=companies)

    def post(self, request, companyId):
        """
        Create new operating location of a registered company,Stores data as JSON object,
        CompanyId,Location Name,city, state,country,postalcode are the required fileds
        latitude and longitude are autodetected fields if not passed

        """
        return self.create(request, companyId)

class OperatingLocationDetailAPIView(OperatingLocationAPIView,generics.RetrieveUpdateDestroyAPIView):
    serializer_class = OperatingLocationSerializer
    queryset = OperatingLocation.objects.all().order_by('LocationName')
    lookup_field = 'pk'
    allowed_methods=['GET','PUT']
    permission_classes=(IsAuthenticated,)

    def get(self, request, companyId, pk):
        """
        List the details of operating locations of a registered company ,data as JSON object,
        """
        return self.retrieve(request)

    def put(self, request, companyId, pk):
        """
        update the company operating locations details,by passing the data in the form of JSON object.

        """
        return self.update(request, companyId, pk)

    def delete(self, request, companyId, pk):
        try:
            self.destroy(request,companyId, pk)
            return Response({'message':'Location deleted successfully'})
        except Exception as e:
            return Response({'error':str(e)})

class APIKeyAPIView(generics.ListCreateAPIView):

    serializer_class = APIKeySerializer
    queryset = APIKey.objects.all()
    # permission_classes=(CustomApiKeyPermissions,)

    def get_queryset(self):
        companyId = self.kwargs['companyId']
        keys_data = APIKey.objects.filter(companyId=companyId)
        return keys_data

    def get(self, request, companyId):
        """
        List out the apikey details w.r.t selected company,application and Oauth client application as JSON object
        """
        return self.list(request, companyId)

    def perform_create(self, serializer):
        apiKey = keygenerator()
        apiKey_count = APIKey.objects.filter(apiKey=apiKey).count()
        companyId = self.kwargs['companyId']
        companies=Companies.objects.get(companyId=companyId)
        if apiKey_count > 0:
            return self.perform_create(serializer)
        else:
            return serializer.save(apiKey=apiKey,companyId=companies)

    def post(self, request, companyId):
        """
        Generates API Keys for each company w.r.t each application and OAuth client application and Stores data as JSON object,
        CompanyId,application Id,OAuthclient ID,clientType,clientAppVersions are the required fileds.
        """
        return self.create(request, companyId)

class APIKeyDetailAPIView(APIKeyAPIView,generics.RetrieveUpdateAPIView):

    serializer_class = APIKeyResetSerializer
    queryset = APIKey.objects.all()
    lookup_field = 'keyId'
    allowed_methods=['GET','PUT']

    def get(self, request, companyId, keyId):
        """
        List out the apikey details w.r.t selected company,application and Oauth client application as JSON object
        """
        return self.retrieve(request)

    def put(self, request, companyId, keyId):
        """
        Regenerate the APIKey by deactivate the old API Key by making reset to True. Keep request body as {reset:true}

        """
        return self.update(request, companyId, keyId)

class Oauth2ApplicationListView(generics.ListAPIView):
    """
    List of OAuthClient applications
    """
    serializer_class = Oauth2ApplicationListSerializer
    queryset = Application.objects.all()
    swagger_schema = None



class DepartmentsListView(generics.ListCreateAPIView):

    serializer_class=DepartmentsListSerializer
    queryset=Department.objects.all().order_by('departmentName')
    allowed_methods=['GET','POST']
    permission_classes=((IsAuthenticated,))

    def get_queryset(self):
        fkCompanyId = self.kwargs['fkCompanyId']
        keys_data = Department.objects.filter(fkCompanyId_id=fkCompanyId).order_by('departmentName')
        return keys_data

    def get(self, request,fkCompanyId):
        """
        List all the applications registered,List the data as JSON object,
        """
        try:
            return self.list(request,fkCompanyId)
        except Exception as e:
            return Response({"error": str(e)})

    def perform_create(self, serializer):
        fkCompanyId = self.kwargs['fkCompanyId']
        
        companies = Companies.objects.get(companyId=fkCompanyId)
        serializer.save(fkCompanyId=companies)

    def post(self, request,fkCompanyId):

        """
        Create the applications,by passing the data in the form of JSON object,
        Application Name, Application Code are the required fileds
        
        """
        try:
            return self.create(request,fkCompanyId)
        except Exception as e:
            return Response(str(e),status=status.HTTP_400_BAD_REQUEST)

class DepartmentDetailView(DepartmentsListView,generics.RetrieveUpdateAPIView):

    serializer_class = DepartmentsListSerializer
    queryset = Department.objects.all().order_by('departmentName')
    lookup_field = 'id'
    allowed_methods=['GET','PUT']
    permission_classes=((IsAuthenticated,))

    def get_queryset(self):
        fkCompanyId = self.kwargs['fkCompanyId']
        keys_data = Department.objects.filter(fkCompanyId_id=fkCompanyId).order_by('departmentName')
        return keys_data

    def get(self, request, fkCompanyId, id):
        """
        List out the apikey details w.r.t selected company,application and Oauth client application as JSON object
        """
        try:
            return self.retrieve(request,id)
        except Exception as e:
            return Response({"error": str(e)})

    def put(self, request, fkCompanyId, id):
        """
        Regenerate the APIKey by deactivate the old API Key by making reset to True.

        """
        try:
            return self.update(request, id)
        except Exception as e:
            return Response({"error": str(e)})
        
class DepartmentsUsersView(generics.ListCreateAPIView):

    serializer_class=DepartmentUserSerializer
    queryset=DepartmentUser.objects.all()
    permission_classes=((IsAuthenticated,))

    def get_queryset(self):
        fkCompanyId = self.kwargs['fkCompanyId']
        fkDepartmentId = self.kwargs['fkDepartmentId']
        keys_data = DepartmentUser.objects.filter(fkCompanyId_id=fkCompanyId,fkDepartmentId=fkDepartmentId)
        return keys_data

    def get(self, request,fkCompanyId,fkDepartmentId):
        """
        List all the applications registered,List the data as JSON object,
        """
        try:
            # return Response({"fkCompanyId":fkCompanyId,"fkDepartmentId":fkDepartmentId})
            return self.list(request)
        except Exception as e:
            return Response({"error": str(e)})
    
    def perform_create(self, serializer):
        fkCompanyId = self.kwargs['fkCompanyId']
        fkDepartmentId = self.kwargs['fkDepartmentId']
        
        companies = Companies.objects.get(companyId=fkCompanyId)
        departments = Department.objects.get(id=fkDepartmentId)
        serializer.save(fkCompanyId=companies,fkDepartmentId=departments)

    def post(self, request,fkCompanyId,fkDepartmentId):

        """
        Create the applications,by passing the data in the form of JSON object,
        Application Name, Application Code are the required fileds
        
        """
        try:
            # return Response(request.data)
            return self.create(request,fkCompanyId,fkDepartmentId)
        except Exception as e:
            return Response({"error": str(e)})

class DepartmentUserDetailView(DepartmentsUsersView,generics.RetrieveUpdateAPIView):

    serializer_class = DepartmentUserSerializer
    queryset = DepartmentUser.objects.all()
    lookup_field = 'pk'
    allowed_methods=['GET','PUT']
    permission_classes=((IsAuthenticated,))

    def get(self, request,fkCompanyId,fkDepartmentId,pk):
        """
        List out the apikey details w.r.t selected company,application and Oauth client application as JSON object
        """
        try:
            return self.retrieve(request,pk)
        except Exception as e:
            return Response({"error": str(e)})

    def put(self, request, fkCompanyId,fkDepartmentId,pk):
        """
        Regenerate the APIKey by deactivate the old API Key by making reset to True.

        """
        try:
            return self.update(request,fkCompanyId, fkDepartmentId,pk)
        except Exception as e:
            return Response({"error": str(e)})

class ProjectsListView(generics.ListCreateAPIView):
    serializer_class=ProjectsListSerializer
    queryset=Projects.objects.all().order_by('projectName')
    permission_classes=((IsAuthenticated,))

    def perform_create(self, serializer):
        companyId = self.kwargs['fkCompanyId']
        companies=Companies.objects.get(companyId=companyId)
        serializer.save(fkCompanyId=companies)


    def get_queryset(self):
        fkCompanyId = self.kwargs['fkCompanyId']
        projects = Projects.objects.filter(fkCompanyId_id=fkCompanyId).order_by('projectName')
        return projects

    def get(self, request, fkCompanyId):
        """
        List the details of operating locations of a registered company ,List the data as JSON object,
        """
        return self.list(request)
    
    
    def perform_create(self, serializer):
        companyId = self.kwargs['fkCompanyId']
        companies=Companies.objects.get(companyId=companyId)
        serializer.save(fkCompanyId=companies)

    def post(self, request,fkCompanyId):

        """
        Create the applications,by passing the data in the form of JSON object,
        Application Name, Application Code are the required fileds
        
        """
        # if 'projectImage' in request.FILES:
        #     s3 = boto3.client('s3', aws_access_key_id='AKIASR66WPSCQIZB5SGU', aws_secret_access_key='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', region_name='ap-south-1')
        #     upload = request.FILES['projectImage']
            
        #     key = 'projects/'+request.data['appCode']+'.png'

        #     s3.put_object(
        #         ACL='public-read',
        #         Bucket='single-sign-on',
        #         Key=key,
        #         Body=upload,
        #         ContentType='image/*',
        #     )
        return self.create(request,fkCompanyId)


class ProjectsDetailView(ProjectsListView,generics.RetrieveUpdateAPIView):

    serializer_class = ProjectsListSerializer
    queryset = Projects.objects.all().order_by('projectName')
    lookup_field = 'pk'
    allowed_methods=['GET','PUT']
    permission_classes=((IsAuthenticated,))

    def get(self, request,fkCompanyId,pk):
        """
        List out the apikey details w.r.t selected company,application and Oauth client application as JSON object
        """
        try:
            return self.retrieve(request,pk)
        except Exception as e:
            return Response({"error": str(e)})

    def put(self, request, fkCompanyId,pk):
        """
        Regenerate the APIKey by deactivate the old API Key by making reset to True.

        """
        try:
            return self.update(request,fkCompanyId,pk)
        except Exception as e:
            return Response({"error": str(e)})


class StructuresListView(generics.ListCreateAPIView):
    serializer_class=StructureListSerializer
    queryset=Structures.objects.all().order_by('depth')
    permission_classes=((IsAuthenticated,))

    def get_queryset(self):
        # fkCompanyId = self.kwargs['fkCompanyId']
        fkProjectId = self.kwargs['fkProjectId']
        project = Structures.objects.filter(fkProjectId=fkProjectId).order_by('depth')
        return project

    def get(self, request,fkProjectId):
        """
        List the details of operating locations of a registered company ,List the data as JSON object,
        """
        return self.list(request)

    def post(self, request,fkProjectId):

        """
        Create the applications,by passing the data in the form of JSON object,
        Application Name, Application Code are the required fileds
        
        """
            # return Response(request.data)
        return self.create(request,fkProjectId)

class StructureDetailView(StructuresListView,generics.RetrieveUpdateAPIView):

    serializer_class = StructureListSerializer
    queryset = Structures.objects.all().order_by('depth')
    lookup_field = 'pk'
    allowed_methods=['GET','PUT']
    permission_classes=((IsAuthenticated,))

    def get(self, request,fkProjectId,pk):
        """
        List out the apikey details w.r.t selected company,application and Oauth client application as JSON object
        """
        try:
            return self.retrieve(request,pk)
        except Exception as e:
            return Response({"error": str(e)})

    def put(self, request,fkProjectId,pk):
        """
        Regenerate the APIKey by deactivate the old API Key by making reset to True.

        """
        try:
            return self.update(request,pk)
        except Exception as e:
            return Response({"error": str(e)})


class ProjectStructuresListView(generics.ListCreateAPIView):
    serializer_class=ProjectStructuresListSerializer
    queryset=ProjectStructures.objects.all().order_by('structureName')
    permission_classes=((IsAuthenticated,))

    def get_queryset(self):
        fkProjectId = self.kwargs['fkProjectId']
        fkStructureId = self.kwargs['fkStructureId']
        project = ProjectStructures.objects.filter(fkProjectId=fkProjectId,fkStructureId=fkStructureId).order_by('structureName')
        return project

    # def get_serializer_context(self):
    #     context = super(ProjectStructuresListView, self).get_serializer_context()
    #     context.update({"request": self.request})
    #     return context

    def get(self, request,fkProjectId,fkStructureId):
        """
        List the details of operating locations of a registered company ,List the data as JSON object,
        """
        return self.list(request)

    def post(self, request,fkProjectId,fkStructureId):

        """
        Create the applications,by passing the data in the form of JSON object,
        Application Name, Application Code are the required fileds
        
        """
            # return Response(request.data)
        return self.create(request)

class ProjectStructuresDetailView(ProjectStructuresListView,generics.RetrieveUpdateAPIView):

    serializer_class = ProjectStructuresListSerializer
    queryset = ProjectStructures.objects.all().order_by('structureName')
    lookup_field = 'pk'
    allowed_methods=['GET','PUT']
    permission_classes=((IsAuthenticated,))

    # def get_serializer_context(self):
    #     context = super(ProjectStructuresDetailView, self).get_serializer_context()
    #     context.update({"request": self.request})
    #     return context

    def get(self, request,fkProjectId,fkStructureId,pk):
        """
        List out the apikey details w.r.t selected company,application and Oauth client application as JSON object
        """
        try:
            return self.retrieve(request,pk)
        except Exception as e:
            return Response({"error": str(e)})

    def put(self, request,fkProjectId,fkStructureId,pk):
        """
        Regenerate the APIKey by deactivate the old API Key by making reset to True.

        """
        try:
            return self.update(request,pk)
        except Exception as e:
            return Response({"error": str(e)})


class CompaniesUserDetailAPIView(generics.ListAPIView,generics.RetrieveAPIView):
    serializer_class = GetCompanyUserListSerializer
    queryset = Companies.objects.all().order_by('companyName')
    allowed_methods=['GET']
    # permission_classes=((AllowAny,))
    permission_classes=(IsAuthenticated,)

    # def get_queryset(self):
    #     fkCompanyId = self.kwargs['fkCompanyId']
    #     companies=Companies.objects.filter(companyId=fkCompanyId)
    #     return companies
        
    def get(self, request,fkCompanyId,fkAppId=None,fkUserId=None):
        """
        List out details of a company
        """
        
        companies=Companies.objects.get(companyId=fkCompanyId)
        # print(userinstance)
        serializer = self.serializer_class(companies)
            
        if ('fkUserId' in self.kwargs):
            fkUserId=self.kwargs['fkUserId']
            companies=Companies.objects.filter(companyId=fkCompanyId)
            
            serializer = self.serializer_class(companies,context={
                                "userId": fkUserId},many=True)
            return Response(serializer.data)
        elif ('fkAppId' in self.kwargs):
            fkAppId=self.kwargs['fkAppId']
            companies=Companies.objects.filter(companyId=fkCompanyId)

            if ('fkUserId' in self.kwargs):

                serializer = self.serializer_class(companies,context={
                                "userId": fkUserId,"appId":fkAppId},many=True)
            else:
                serializer = self.serializer_class(companies,context={
                                "appId":fkAppId},many=True)
            return Response(serializer.data)


        else:
            return Response(serializer.data)


class CompaniesUserAPIView(generics.ListAPIView,generics.RetrieveAPIView):
    serializer_class = GetCompanyUserListSerializer
    queryset = Companies.objects.all().order_by('companyName')
    allowed_methods=['GET']
    permission_classes=((IsAuthenticated,))

    def get_queryset(self):
        fkCompanyId = self.kwargs['fkCompanyId']
        companies=Companies.objects.filter(companyId=fkCompanyId)
        return companies
        
    def get(self, request,fkCompanyId,fkUserId=None):
        """
        List out details of a company
        """
        companies=Companies.objects.get(companyId=fkCompanyId)
        # print(userinstance)
        serializer = self.serializer_class(companies)
        return Response(serializer.data)

class CompaniesRolewiseUserAPIView(generics.ListAPIView,generics.RetrieveAPIView):
    serializer_class = GetCompanyUserListPerRoleSerializer
    queryset = Companies.objects.all().order_by('companyName')
    allowed_methods=['GET']
    permission_classes=((IsAuthenticated,))

    def get(self, request,fkCompanyId,fkGroupId,fkUserId=None):
        """
        List out details of a company
        """

        if ('fkGroupId' in self.kwargs):
            fkUserId=self.kwargs['fkGroupId']
            companies=Companies.objects.filter(companyId=fkCompanyId).order_by('companyName')
            # print(userinstance)
            serializer = self.serializer_class(companies,context={
                                "roleId": fkGroupId},many=True)
            return Response(serializer.data)


class GetProjectStructureDetails(generics.ListAPIView):
    serializer_class = ProjectStructuresListSerializer
    queryset = ProjectStructures.objects.all().order_by('structureName')
    allowed_methods=['GET']
    permission_classes=((IsAuthenticated,))

    def get(self, request,fkCompanyId,fkProjectId,fkStructureId,depth,parentId=None):

        if (parentId is None):
            parentId=0
        projectstructure=ProjectStructures.objects.filter(fkProjectId=fkProjectId,fkStructureId=fkStructureId,depth=depth,parentId=parentId).order_by('structureName')


        serializer=self.serializer_class(projectstructure,context={'request':request},many=True)
        return Response(serializer.data)


class GetADCompanies(generics.ListAPIView):
    serializer_class = CompanyADSerializer
    queryset = Companies.objects.filter(IsADConfigured=True).order_by('companyName')
    allowed_methods=['GET']
    permission_classes=((AllowAny,))
    swagger_schema = None


    def get(self,request):
        return self.list(request)


class GetProjectStructureDetailswrtid(generics.ListAPIView):
    serializer_class = ProjectStructuresListSerializer
    queryset = ProjectStructures.objects.all().order_by('structureName')
    allowed_methods=['GET']
    permission_classes=((IsAuthenticated,))

    def get(self, request,fkCompanyId,fkProjectId,depth,projectStructureId):
        projectstructure=ProjectStructures.objects.filter(fkProjectId=fkProjectId,id=projectStructureId,depth=depth).order_by('structureName')

        serializer=self.serializer_class(projectstructure,context={'request':request},many=True)
        return Response(serializer.data)


class UpdateCompanyLogo(generics.UpdateAPIView):
    """
    API to upload user avtar
    """
    queryset = Companies.objects.all()
    serializer_class = CompaniesSerializer
    allowed_methods=['PATCH',]
    # permission_classes=((AllowAny,))
    permission_classes=(IsAuthenticated,)
    parser_classes = (MultiPartParser, FormParser)

    def get_object(self, companyId):
        return Companies.objects.filter(companyId=companyId).first()

    def update(self, request,companyId,*args, **kwargs):

        partial = kwargs.pop('partial', False)
        instance = self.get_object(companyId)

        # return Response(data)
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            instance = self.get_object(companyId)
            serializer = self.get_serializer(instance)

        return Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save()

    def partial_update(self, request,companyId,*args, **kwargs):
        kwargs['partial'] = True
        return self.update(request,companyId, *args, **kwargs)


class ProjectACLAPIView(generics.ListCreateAPIView):
    serializer_class = ProjectACLSerializer
    queryset = ProjectACL.objects.all()
    # permission_classes = ((AllowAny),)
    permission_classes=(IsAuthenticated,)

    def get(self, request,fkCompanyId,fkProjectId,fkUserId):
        return self.list(request,fkCompanyId,fkProjectId,fkUserId)

    def perform_create(self, serializer):
        print(' im in')
        fkCompanyId = self.kwargs['fkCompanyId']
        fkProjectId = self.kwargs['fkProjectId']
        fkUserId = self.kwargs['fkUserId']
        print(fkCompanyId)
        companies=Companies.objects.get(companyId=fkCompanyId)
        print(companies)
        projects=Projects.objects.get(id=fkProjectId)
        users=User.objects.get(id=fkUserId)
        serializer.save(fkCompanyId=companies,fkProjectId=projects,fkUserId=users)
    
    def post(self, request,fkCompanyId,fkProjectId,fkUserId):
        
        return self.create(request,fkCompanyId,fkProjectId,fkUserId)


class CompanySubscriptions(generics.ListCreateAPIView):
    serializer_class = ApplicationsSerializer
    queryset = Subscriptions.objects.all()
    # permission_classes=(IsAuthenticated,)
    permission_classes=(AllowAny,)

    def get(self, request,fkCompanyId):
        subscriptions=Subscriptions.objects.filter(fkCompanyId=fkCompanyId).values_list('fkAppId',flat=True).distinct()

        applications=Applications.objects.filter(appId__in=subscriptions)
        print(applications)

        serializer=self.serializer_class(applications,many=True)
        return Response(serializer.data)

class GetADCompanies_V2(generics.ListAPIView):
    renderer_classes = ((UserRendererV2,))
    serializer_class = CompanyADSerializer
    queryset = Companies.objects.all().order_by('companyName')
    allowed_methods=['GET']
    permission_classes=((AllowAny,))
    swagger_schema = None

    def get(self, request):
        searchquery = request.GET.get('companyName','')
        if searchquery:
            # query example
            results = Companies.objects.filter(companyName__icontains=searchquery).distinct()
            for result in results:
                print("::IsADConfigured::",result.IsADConfigured)
                if result.IsADConfigured == False:
                    return Response({'error':"AD Login is not enabled"}, status=status.HTTP_400_BAD_REQUEST)

        # else:
        #     results = []
        serializer = CompanyADSerializer(results, many=True)
        return Response(serializer.data)

