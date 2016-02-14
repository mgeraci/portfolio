from django.conf import settings
from django.core.urlresolvers import reverse
from datetime import date

def menu(request):
    return {
        'menu': [
            {
                'name': 'Bio/Resume',
                'split_name': 'Bio/<br />Resume',
                'href': reverse('index_url'),
            },
            {
                'name': 'Web Design',
                'split_name': 'Web<br />Design',
                'href': reverse('web_url'),
            },
            {
                'name': 'Photography',
                'split_name': 'Photo-<br />graphy',
                'href': reverse('photography_url'),
            },
            {
                'name': 'Graphic Design',
                'split_name': 'Graphic<br />Design',
                'href': reverse('graphic_url'),
            },
            {
                'name': 'Composition',
                'split_name': 'Compo-<br />sition',
                'href': reverse('composition_url'),
            },
            {
                'name': 'Recordings',
                'split_name': 'Record-ings',
                'href': reverse('recordings_url'),
            },
            {
                'name': 'Links/Misc.',
                'split_name': 'Links/<br />Misc.',
                'href': reverse('links_url'),
            },
        ]
    }

def year(request):
    return {
        'year': date.today().year
    }
