from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from twilio.twiml.messaging_response import MessagingResponse

@csrf_exempt
def database(request):
    return HttpResponse("Paul")
