from django.shortcuts import render, get_object_or_404
from michael_dot_com.localsettings import STATIC_URL
from portfolio.models import Composition

# main pages
def index(request):
    recent_image_root = '{}images/recent_thumbs/'.format(STATIC_URL)

    recent_items = [
        {
            'text': ['My favorite albums of 2015'],
            'image': '{}albums-2015.jpg'.format(recent_image_root),
            'href': 'http://albums.michaelgeraci.com/list/2015',
        },
        {
            'text': ['New project:', 'Smart mirror display'],
            'image': '{}auto-hud.jpg'.format(recent_image_root),
            'href': 'https://github.com/mgeraci/auto-hud',
        },
        {
            'text': ['New steel drum performance:', 'CASYM - Big People Party'],
            'image': '{}casym-2014.jpg'.format(recent_image_root),
            'href': 'https://www.youtube.com/watch?v=UaLBILfJ5ag',
        },
        {
            'text': ['New Photos:', 'Summer trip to Duluth'],
            'image': '{}7352.jpg'.format(recent_image_root),
            'href': 'http://michaelgeraci.com/photography/blog/427',
        },
    ]

    context = {
        'recent_items': recent_items,
        'recent_date': '2.19.16',
    }

    return render(request, 'pages/index.html', context)

def web(request):
    return render(request, 'pages/web.html')

def photography(request):
    return render(request, 'pages/photography.html')

def graphic(request):
    return render(request, 'pages/graphic.html')

def composition(request):
    compositions = Composition.objects.all()
    context = {
        'compositions': compositions
    }

    return render(request, 'pages/composition.html', context)

def composition_item(request, slug):
    compositions = Composition.objects.all()
    piece = get_object_or_404(Composition, slug=slug)

    context = {
        'compositions': compositions,
        'piece': piece,
    }

    return render(request, 'pages/composition_item.html', context)

def recordings(request):
    return render(request, 'pages/recordings.html')

def links(request):
    return render(request, 'pages/links.html')


# verification pages
def keybase(request):
    return render(request, 'verification_pages/keybase.html', content_type='text/plain')

def google(request):
    return render(request, 'verification_pages/google.html', content_type='text/plain')
