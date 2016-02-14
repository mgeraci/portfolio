from django.conf import settings
from django.core.urlresolvers import reverse
from datetime import date

def menu(request):
    return {
        'menu': [
            {
                'name': 'Bio/Resume',
                'href': reverse('index_url'),
            },
            {
                'name': 'Web Design',
                'href': reverse('web_url'),
            },
            {
                'name': 'Photography',
                'href': reverse('photography_url'),
            },
            {
                'name': 'Graphic Design',
                'href': reverse('graphic_url'),
            },
            {
                'name': 'Composition',
                'href': reverse('composition_url'),
            },
            {
                'name': 'Recordings',
                'href': reverse('recordings_url'),
            },
            {
                'name': 'Links/Misc',
                'href': reverse('links_url'),
            },
        ]
    }

def year(request):
    return {
        'year': date.today().year
    }
