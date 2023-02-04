from django.urls import path, include
from .views import ApplicationsAPIView ,ApplicationDetailAPIView,GroupAPIView,GroupDetailAPIView,AppHostingDetailAPIView, AppHostingAPIView, AppModules, AppCompanyModule,SubscribeAccount

app_name = "applications"

urlpatterns = [
     path('', ApplicationsAPIView.as_view(),
         name='listallorcreateapplications'),
     path('<int:pk>/', ApplicationDetailAPIView.as_view(),
         name='listorupdaterelatedapplications'),
     path('<int:fkAppId>/roles/', GroupAPIView.as_view(),
         name='listallorcreateroles'),
     path('<int:fkAppId>/roles/<int:pk>/', GroupDetailAPIView.as_view(),
         name='listorupdaterelatedroles'),
     path('<int:fkAppId>/hostings/', AppHostingAPIView.as_view(),
         name='listallorcreatehosting'),
     path('<int:fkAppId>/hostings/<int:pk>/', AppHostingDetailAPIView.as_view(),
         name='listorupdaterelatedhosting'),
     path('modules/', AppModules.as_view(),
         name='listmodules'),
     path('modules/<str:moduleCode>/<int:companyId>/', AppCompanyModule,
         name='listmodules'),
     path('<int:uuid>/<int:companyId>/subscription/', SubscribeAccount.as_view()),
]

