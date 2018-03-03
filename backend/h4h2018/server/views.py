from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

from twilio.twiml.messaging_response import MessagingResponse

def index(request):
    return HttpResponse("Hello, world; Fuck Paul.")

@csrf_exempt
def sms_response(request):
    # Start our TwiML response
    resp = MessagingResponse()

    # Add a test message
    msg = resp.message("This is a response message")

    return HttpResponse(str(resp))
