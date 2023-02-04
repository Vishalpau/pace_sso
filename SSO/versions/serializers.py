
from rest_framework import serializers
from .models import VersionType,MobileApplication


    
class MobileApplicationSerializer(serializers.ModelSerializer):
    versions=serializers.SerializerMethodField()
    # appId = serializers.CharField(source="fkMobileApp.id", read_only=True)
    # appName = serializers.CharField(source="fkMobileApp.appName", read_only=True)

    def get_versions(self,obj):

        fkMobileApp=VersionType.objects.filter(fkMobileApp=obj.id)

        serializer=VersionTypeSerializer(fkMobileApp,many=True)

        return serializer.data

    class Meta:
        model = MobileApplication
        fields =('appName','status','createdAt','updatedAt','versions')




class VersionTypeSerializer(serializers.ModelSerializer):
    appId = serializers.CharField(source="fkMobileApp.id", read_only=True)
    # appName = serializers.CharField(source="fkMobileApp.appName", read_only=True)

    class Meta:
        model = VersionType
        fields =('appId',  'osType','versionInfo','status','createdAt','updatedAt')




