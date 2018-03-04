# Django imports
from django.http import HttpResponse, HttpRequest, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from . import models


@csrf_exempt
def fill_database(**inputDict):
    b = models.Message(**inputDict)
    b.save()
    all_messages = list(models.Message.objects.all())
    for msg in all_messages:
        print(msg)

    return HttpResponse("Working")


def main_handle(request):
    return JsonResponse({'data': list(models.Message.objects.values()),})