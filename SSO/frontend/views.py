from django.http import HttpResponse
from django.shortcuts import (render, redirect)
from django.contrib.auth.decorators import login_required
from django.conf import settings


def home_view(request):
    context = {'title': 'PACE Accounts: Home'}
    return render(request, 'base.html', context)
