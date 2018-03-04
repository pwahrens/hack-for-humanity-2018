import random
from . import parser,database
def random_phone_number():
    n = '0000000000'
    while '9' in n[3:6] or n[3:6]=='000' or n[6]==n[7]==n[8]==n[9]:
        n = str(random.randint(10**9, 10**10-1))
    return '+' + n

cities= ['Santa Clara', 'San Jose', 'Mountain View', "San Mateo", "Los Altos", "Foster City", "Palo Alto", "Freemont", "Roseville"]
locations = [x + ', California, US' for  x in cities]
nums = list(range(1,7))
requests = {'food': False, 'water': False, 'medicine': False, 'blankets': False, 'toiletries': False,'power':False}

def random_location():
    return random.choice(locations)

def random_needs():
    out = "I need"
    for i in range(random.choice(nums)):
        out +=  " " + random.choice(parser.requests[random.choice(parser.requests.keys())])
    return out

def generate_entries(count):
    for i in range(count):
        num = random_phone_number()
        loc = random_location()
        text = random_needs()
        needs = parser.parse_request(text)
        database.fill_database(
            phone_number =num,
            text =text,
            location =loc,
            **needs
        )
