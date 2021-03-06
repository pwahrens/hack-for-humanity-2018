# Django imports
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from twilio.rest import Client

# Twilio imports
from twilio.twiml.messaging_response import MessagingResponse

# Local imports
from . import database, parser

# Set up client authentication
auth_token = "017f997a8d275e1f81512d505651b5ea"
account_sid = "ACcf932ad8df8fdbd9e55f78891ca78000"
client = Client(account_sid, auth_token)

# Initialize response
response = {}


@csrf_exempt
def sms_init(request):
    test_numbers = ["+16507663993", "+14259414701", "+13602414028"]

    # Send initialization message to each number in array.
    for number in test_numbers:
        client.api.account.messages.create(
            to=number,
            from_="14157924825",
            body="We are collecting information. Please send what you need."
        )

    # Return the message to Twilio.
    return HttpResponse("Working.")


@csrf_exempt
def sms_response(request):
    # Receive most recent message information
    received_message = client.messages.list()[0].body
    received_sender = client.messages.list()[0].from_

    # Begin Response
    resp = MessagingResponse()

    msg = ""
    if response.get(received_sender) is None:
        # If not in dictionary, send first response and update dictionary with number and message.
        msg = resp.message("Received. Please send your location (City, State/Province, Country).")
        response[received_sender] = [received_sender, received_message, ""]
    elif response.get(received_sender)[2] is "":
        # If in response, send second message and update dictionary with location.
        msg = resp.message("Received. We have processed your request")
        response[received_sender][2] = received_message
        needs_bool = parser.parse_request(response[received_sender][1])

        # Fill database with information.
        database.fill_database(
            phone_number =response[received_sender][0],
            text =response[received_sender][1],
            location =response[received_sender][2],
            **needs_bool
        )

    # Return the message to Twilio.
    return HttpResponse(str(msg))
