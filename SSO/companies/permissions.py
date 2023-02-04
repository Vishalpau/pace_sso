# from rest_framework.permissions import  BasePermission,SAFE_METHODS
# from rest_framework.exceptions import APIException,PermissionDenied
# from applications.models import *
# from project import status


# class CustomCompanyPermissions(BasePermission):
        
#     def has_permission(self,request,view):
#         if bool(request.user.is_superuser):
#             return True  
#         else:
#             try:
#                 role=UserAppAccess.objects.get(fkUserId=request.user.id)
#             except UserAppAccess.DoesNotExist:
#                 role=False
#             if (role):
#                 role_name=ApplicationRoles.objects.filter(roleId=role.fkRoleId_id).values_list('roleName').first()[0]
#                 print(role_name)
#             else:
#                 role_name="defaultUser"
#             if request.method=='GET':
#                 return True
#             elif role_name=='defaultUser' and request.method=='POST':
#                 return True
#             elif role_name in('defaultUser','userAdmin') and request.method in('PUT'):
#                 return True
#             else:
#                 raise PermissionDenied

# class CustomOperatingLocPermissions(BasePermission):
        
#     def has_permission(self,request,view):
#         if bool(request.user.is_superuser):
#             return True
#         else:
#             try:
#                 role=UserAppAccess.objects.get(fkUserId=request.user.id)
#             except UserAppAccess.DoesNotExist:
#                 role=False
#             if (role):
#                 role_name=ApplicationRoles.objects.filter(roleId=role.fkRoleId_id).values_list('roleName').first()[0]
#             else:
#                 role_name="defaultUser"
#             if request.method=='GET':
#                 return True
#             elif role_name in('userAdmin') and request.method in('POST','PUT'):
#                 return True
#             else:
#                 raise PermissionDenied

# class CustomApiKeyPermissions(BasePermission):
        
#     def has_permission(self,request,view):
#         if bool(request.user.is_superuser):
#             return True
#         else:
#             try:
#                 role=UserAppAccess.objects.get(fkUserId=request.user.id)
#             except UserAppAccess.DoesNotExist:
#                 role=False
#             if (role):
#                 role_name=ApplicationRoles.objects.filter(roleId=role.fkRoleId_id).values_list('roleName').first()[0]
#                 print(role_name)
#             else:
#                 role_name="defaultUser"
#             if role_name in('userAdmin') and request.method in('GET','POST','PUT'):
#                 return True
#             else:
#                 raise PermissionDenied