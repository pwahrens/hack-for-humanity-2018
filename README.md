# Insight

## About

Insight was a project completed during [Hack for Humanity 2018](http://hackforhumanity.io/) to address the issue of resource allocation after a natural disaster. It is composed of a Django backend running a SQLite database and the Twilio API to handle SMS messaging. Meanwhile, our frontend utilized Google Maps API and Bootstrap to create a dashboard for responders of natural disasters to see where certain resources are needed. The procedure is the following:

1) Twilio API will send SMS messages out to mobile users within a certain area that has just suffered a natural disaster asking for the following:
	- Location (Anything that Google Maps API can handle)
	- Supplies they need (Food, Water, Medicine, Toiletries, Blankets, Power)
	
2) The responses from users are handled by Twilio and parsed in the backend. The parsed results are sent to a SQLite database.
3) After refreshing, the frontend application will query the database for entries and plot them onto a map using Google Maps API. At this time, data for the Resource Graph is also updated.

The result is a map filled with markers that help responders identify what resources are needed in certain locations.
