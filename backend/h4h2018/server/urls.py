from django.conf.urls import include, url
from django.contrib import admin

from . import views

urlpatterns = [
    url(r'^sms/', views.sms_response, name='sms'),
    url(r'^admin/', admin.site.urls)
]
