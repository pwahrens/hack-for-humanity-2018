from django.db import models


class Message(models.Model):
    text = models.CharField(max_length=500)
    pub_date = models.DateTimeField('date published')


class PhoneNumber(models.Model):
    text = models.CharField(max_length=30)


class Location(models.Model):
    location = models.CharField(max_length=100)
