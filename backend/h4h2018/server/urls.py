from django.conf.urls import include, url
from django.contrib import admin

from . import sms, database

urlpatterns = [
    url(r'^sms/', sms.sms_response, name='sms'),
   # url(r'^sms_init/', sms.sms_init, name='sms_init'),
    url(r'^admin/', admin.site.urls),
    url(r'^database/', database.database, name='database')
]
