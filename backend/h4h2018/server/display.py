from django.http import HttpResponse

def index(request):
    filename = "server\\map.html"
    file = open(filename, "r")

    return HttpResponse(file.read())