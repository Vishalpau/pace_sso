from django.contrib import admin
from django.urls import path, include
# from users import views as user_view

from django.conf.urls import url

from . import views


urlpatterns = [

    path('', views.MobileApplicationsView.as_view(), name='mobile apps'),

    path('versions/ostype/<slug:osType>/', views.VersionTypesView.as_view(), name='Version Types'),



]