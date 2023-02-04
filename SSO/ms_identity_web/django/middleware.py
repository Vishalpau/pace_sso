try:    
    from ms_identity_web.errors import NotAuthenticatedError
    from django.conf import settings
    from django.shortcuts import render
except:
    pass

from .adapter import DjangoContextAdapter

ms_identity_web=settings.MS_IDENTITY_WEB

class MsalMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        # One-time configuration and initialization.
        self.ms_identity_web = None
    
    def process_exception(self, request, exception):
        if isinstance(exception, NotAuthenticatedError):
            if hasattr(settings, 'ERROR_TEMPLATE'):
                return render(request, settings.ERROR_TEMPLATE.format(exception.code))                
        return None

    def __call__(self, request):

        if 'adCompanyId' in request.session:
            companyId=request.session['adCompanyId']

            if('ms_identity_web'+str(companyId) in settings.MS_IDENTITY_WEB):
                self.ms_identity_web=settings.MS_IDENTITY_WEB['ms_identity_web'+str(companyId)]
            else:
                self.ms_identity_web=settings.MS_IDENTITY_WEB['ms_identity_web']
        else:
            self.ms_identity_web=settings.MS_IDENTITY_WEB['ms_identity_web']

        # self.ms_identity_web = settings.MS_IDENTITY_WEB['ms_identity_web']

        django_context_adapter = DjangoContextAdapter(request)
        self.ms_identity_web.set_adapter(django_context_adapter)
        django_context_adapter._on_request_init()
        
        response = self.get_response(request)
        # Code to be executed for each request/response after
        # the view is called.

        django_context_adapter._on_request_end()

        return response