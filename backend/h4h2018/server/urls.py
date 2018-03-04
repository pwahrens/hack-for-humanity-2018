from django.conf.urls import include, url
from django.contrib import admin

from . import sms, database, fake_database

urlpatterns = [
    url(r'^sms/', sms.sms_response, name='sms'),
    url(r'^sms_init/', sms.sms_init, name='sms_init'),
    url(r'^admin/', admin.site.urls),
    url(r'^database/', database.fill_database, name='database'),
    url(r'^main/', database.main_handle, name='main page'),
    url(r'^fill/', fake_database.generate_entries, name='fill')
]
