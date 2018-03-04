from django.db import models

# Create your models here.

class Message(models.Model):
    text = models.CharField(max_length=500)
    pub_date = models.DateTimeField('date published')

class PhoneNumber(models.Model):
    text = models.CharField(max_length=30)

class Location(models.Model):
    Latitude = models.CharField(max_length=30)
    Longitude = models.CharField(max_length=30)
