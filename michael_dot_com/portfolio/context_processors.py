from django.conf import settings
from django.core.urlresolvers import reverse

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
        ]
    }
