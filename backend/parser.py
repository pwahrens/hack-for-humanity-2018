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
    out = set()
    request = request.translate((None, string.punctuation))
    request = request.translate((None, ' '))
    request = request.lower()
    for r in requests:
        for term in requests[r]:
            if term in request:
                out.add(r)
    return out
