from django.shortcuts import render
from rest_framework.views import APIView

from .models import VersionType,MobileApplication
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import generics
from .serializers import VersionTypeSerializer,MobileApplicationSerializer
# from rest_framework.permissions import AllowAny
from rest_framework import status
from django.http import Http404
from rest_framework import serializers
from rest_framework.permissions import AllowAny,IsAuthenticated


# Create your views here.
class MobileApplicationsView(generics.ListAPIView):

    serializer_class=MobileApplicationSerializer
    queryset=MobileApplication.objects.all()
    permission_classes=((IsAuthenticated,))


    def perform_create(self, serializer):
        # print(self.request.user)
        serializer.save(createdBy=self.request.user.id,updatedBy=self.request.user.id)

    def get(self, request):

        """
        List all the applications registered,List the data as JSON object,
        """
        return self.list(request)



class VersionTypesView(generics.ListAPIView):

    serializer_class=VersionTypeSerializer
    queryset=VersionType.objects.all()
    permission_classes=((AllowAny,))

    def get_queryset(self):
        osType = self.kwargs['osType'].lower()
        keys_data = VersionType.objects.filter(osType=osType)
        return keys_data
    
    def get(self, request,osType):

        """
        List all the applications registered,List the data as JSON object,
        """
        return self.list(request,osType)


