# Django imports
from django.http import HttpResponse, HttpRequest, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from . import models


@csrf_exempt
def database(phone_number, text, location, food, water, medicine):
    b = models.Message(phone_number=phone_number, text=text, location=location, food=food, water=water, medicine=medicine)
    b.save()

    all_messages = list(models.Message.objects.all())
    for msg in all_messages:
        print(msg)

    return HttpResponse("Working")


def main_handle(request):
    return JsonResponse({'data': list(models.Message.objects.values()),})
