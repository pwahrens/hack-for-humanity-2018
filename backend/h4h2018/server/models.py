from django.db import models


class Message(models.Model):
    phone_number = models.CharField(max_length=15)
    text = models.CharField(max_length=500)
    location = models.CharField(max_length=100)

    def __str__(self):
        return "(" + self.phone_number + ", " + self.text + ", " + self.location + ")\n"



#class PhoneNumber(models.Model):
#    text = models.CharField(max_length=30)


#class Location(models.Model):
#    location = models.CharField(max_length=100)
