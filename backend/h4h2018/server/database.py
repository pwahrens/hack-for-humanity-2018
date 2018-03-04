# Django imports
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from . import models


@csrf_exempt
def database(phone_number, text, location):
    b = models.Message(phone_number=phone_number, text=text, location=location)
    b.save()


    for msg in list(models.Message.objects.all()):
        print(msg)

    return HttpResponse("Working")


def main_handle(request):
    return HttpResponse(models.Message.objects.all())

