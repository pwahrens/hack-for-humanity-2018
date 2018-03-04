# Python imports
import string
# All possible requests.
requests = {
    'food': ('food', 'calorie', 'hungry', 'meal','snack'),
    'water': ('water', 'hydration', 'hydrate', 'thirst'),
    'medicine': ('meds', 'medicine', 'drugs', 'insulin', 'disease', 'pain', 'sick'),
    'blankets': ('warm', 'blanket', 'cold'),
    'toiletries': ('toilet', 'sanitation', 'sanitary', 'clean', 'dirty'),
    'power': ('power', 'electricity', 'battery', 'batteries', 'energy', 'solar', 'generator', 'gas'),
    }

def parse_request(request):
    global requests
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
