from django.conf import settings
from django.core.urlresolvers import reverse
from datetime import date
from michael_dot_com.localsettings import STATIC_VERSIONS
from michael_dot_com.localsettings import DEBUG


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
                'split_name': 'Record-<br />ings',
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
        'year': date.today().year,
    }


def active_page_name(request):
    name = False

    menu_items = menu(request)['menu']
    for menu_item in menu_items:
        if request.path == menu_item['href']:
            name = menu_item['name']

    if not name:
        name = 'Select a page'

    return {
        'active_page_name': name,
    }


def static_versions(request):
    return {
        'static_versions': STATIC_VERSIONS,
    }


def is_local(request):
    return {
        'is_local': DEBUG,
    }
