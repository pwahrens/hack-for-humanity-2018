import string

def parserequest(request):
    requests= {
        'food':('food','calories','hungry','meal',),
        'water':('water','hydration','hydrate','thirst'),
        'medicine':('meds','medicine','drugs','insulin','disease','pain'),
        'blanket':('warm','blanket','cold'),
        'toiletries': ('toilet','sanitation','sanitary','clean','dirty'),
        'power':('power','electricity','battery','batteries','energy','solar','generator','gas'),
        }
    out = {}
    request = request.translate((None, string.punctuation))
    request = request.translate((None, ' '))
    request = request.lower()
    for r in requests:
        out[r] = False
        for term in requests[r]:
            if term in request:
                out[r] = True
                break
    return out
