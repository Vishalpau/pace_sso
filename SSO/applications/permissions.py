from rest_framework.permissions import  BasePermission,SAFE_METHODS
from rest_framework.exceptions import APIException,PermissionDenied
from applications.models import *
from project import status


class CustomApplicationPermissions(BasePermission):
        
    def has_permission(self,request,view):
        if bool(request.user.is_superuser):
            return True
        else:
            raise PermissionDenied

