from django.urls import path, include, re_path
from django.conf.urls import url
from .views import (CompaniesAPIView,CompaniesDetailAPIView, OperatingLocationAPIView,OperatingLocationDetailAPIView, APIKeyAPIView,APIKeyDetailAPIView,Oauth2ApplicationListView,DepartmentsListView,DepartmentDetailView,DepartmentsUsersView,
                    DepartmentUserDetailView,ProjectsListView,ProjectsDetailView,StructuresListView,CompaniesUserAPIView,
                    StructureDetailView,ProjectStructuresListView,ProjectStructuresDetailView,CompaniesUserDetailAPIView,CompaniesRolewiseUserAPIView,GetProjectStructureDetails,GetADCompanies,GetProjectStructureDetailswrtid,UpdateCompanyLogo,ProjectACLAPIView,CompanySubscriptions,GetADCompanies_V2)

from notifications.views import FunctionalRolesByEntityView,FunctionalUsersByRolesView

app_name = "companies"

urlpatterns = [
    path('', CompaniesAPIView.as_view(), name='listallorcreatecompanies'),
    path('<int:pk>/', CompaniesDetailAPIView.as_view(),name='listorupdaterelatedcompanies'),
    path('<int:companyId>/locations/', OperatingLocationAPIView.as_view(),name='listallorcreatelocations'),
    path('<int:companyId>/locations/<int:pk>/',OperatingLocationDetailAPIView.as_view(), name='listorupdaterelatedlocations'),

    path('<int:companyId>/xkeys/', APIKeyAPIView.as_view(), name='createAPIkeys'),
    path('<int:companyId>/xkeys/<int:keyId>/',APIKeyDetailAPIView.as_view(), name='listorrevokeAPIkeys'),

    path('oauth2applications/',Oauth2ApplicationListView.as_view(), name='oauthapplicationslist'),
    

    path('<int:fkCompanyId>/departments/', DepartmentsListView.as_view(), name='createDepartments'),
    path('<int:fkCompanyId>/departments/<int:id>/', DepartmentDetailView.as_view(), name='Departments Details view'),
    path('<int:fkCompanyId>/departments/<int:fkDepartmentId>/users/', DepartmentsUsersView.as_view(),name='create_departmentsusers'),
    path('<int:fkCompanyId>/departments/<int:fkDepartmentId>/users/<int:pk>/', DepartmentUserDetailView.as_view(),name=''),

    path('<int:fkCompanyId>/projects/', ProjectsListView.as_view(), name='create Projects'),
    path('<int:fkCompanyId>/projects/<int:pk>/', ProjectsDetailView.as_view(), name='Projects_details'),
    path('projects/<int:fkProjectId>/structure/', StructuresListView.as_view(), name='Structures'),
    path('projects/<int:fkProjectId>/structure/<int:pk>/', StructureDetailView.as_view(), name=' Projects'),
    path('project/<int:fkProjectId>/structures/<int:fkStructureId>/projectstructure/', ProjectStructuresListView.as_view(), name='Projects_Structures'),
    path('project/<int:fkProjectId>/structures/<int:fkStructureId>/projectstructure/<int:pk>/', ProjectStructuresDetailView.as_view(), name='Projects_Structures'),
    path('<int:fkCompanyId>/users/',CompaniesUserDetailAPIView.as_view(),name='list company users'),
    path('<int:fkCompanyId>/company-users/',CompaniesUserAPIView.as_view(),name='list company users'),
    path('<int:fkCompanyId>/application/<int:fkAppId>/users/',CompaniesUserDetailAPIView.as_view(),name='list company users'),
    path('<int:fkCompanyId>/users/<int:fkUserId>/',CompaniesUserDetailAPIView.as_view(),name='company user details'),
    path('<int:fkCompanyId>/application/<int:fkAppId>/users/<int:fkUserId>/',CompaniesUserDetailAPIView.as_view(),name='list company users'),
    path('<int:fkCompanyId>/roles/<int:fkGroupId>/users/',CompaniesRolewiseUserAPIView.as_view(),name='company users list per role'),
    path('<int:fkCompanyId>/projects/<int:fkProjectId>/projectstructure/<int:fkStructureId>/<slug:depth>/',GetProjectStructureDetails.as_view(),name='get project structure details for 1st Level'),
    path('<int:fkCompanyId>/projects/<int:fkProjectId>/projectstructure/<int:fkStructureId>/<slug:depth>/<int:parentId>',GetProjectStructureDetails.as_view(),name='get project structure details'),
    path('<int:fkCompanyId>/projects/<int:fkProjectId>/projectstructure/<slug:depth>/<int:projectStructureId>/',GetProjectStructureDetailswrtid.as_view(),name='get project structure details'),
    
    path('getadcompanies/',GetADCompanies.as_view(),name='get active directory companies'),


    path('<int:fkCompanyId>/projects/<int:fkProjectId>/notificationroles/<slug:entity>/', FunctionalRolesByEntityView.as_view(), name='Functional Roles By Entity'),
    path('<int:fkCompanyId>/projects/<int:fkProjectId>/functionalroles/users/', FunctionalUsersByRolesView.as_view(), name='Functional Roles By Entity'),

    path('<int:companyId>/uploadcompanylogo/', UpdateCompanyLogo.as_view(), name="update company logo"),

    path('<int:fkCompanyId>/projects/<int:fkProjectId>/users/<int:fkUserId>/projectacl/', ProjectACLAPIView.as_view(), name="define project ACL"),
    
    path('<int:fkCompanyId>/subscriptions/', CompanySubscriptions.as_view(), name="define project ACL"),

    path('getadcompanies-v2/',GetADCompanies_V2.as_view(),name='get active directory companies'),
]