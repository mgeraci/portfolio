from django.shortcuts import render, get_object_or_404
from michael_dot_com.localsettings import STATIC_URL
from portfolio.models import Composition
from portfolio.models import Web
from portfolio.models import WebImage
from portfolio.models import RecordingPage
from portfolio.models import Recording

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
    webs = Web.objects.all()
    context = {
        'webs': webs,
    }

    return render(request, 'pages/web.html', context)

def web_item(request, slug):
    webs = Web.objects.all()
    web = get_object_or_404(Web, slug=slug)
    web_items = WebImage.objects.filter(web=web)
    title_bundle = {
        'title': u'{}, {}'.format(web.title, web.year),
        'subtitles': [],
    }

    if web.tech:
        title_bundle['subtitles'].append(web.tech)

    if web.subtitle:
        title_bundle['subtitles'].append(web.subtitle)

    context = {
        'webs': webs,
        'web': web,
        'web_items': web_items,
        'title_bundle': title_bundle
    }

    return render(request, 'pages/web_item.html', context)

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
    title_bundle = {
        'title': u'{}, {}'.format(piece.title, piece.year),
        'subtitles': [],
    }

    subtitle1 = piece.materials

    if piece.duration:
        subtitle1 = u'{}, {}'.format(subtitle1, piece.duration)

    title_bundle['subtitles'].append(subtitle1)

    if piece.performers:
        title_bundle['subtitles'].append(
            u'With {}'.format(piece.performers)
        )

    context = {
        'compositions': compositions,
        'piece': piece,
        'title_bundle': title_bundle,
    }

    return render(request, 'pages/composition_item.html', context)

def recordings(request):
    pages = RecordingPage.objects.all()
    context = {
        'pages': pages,
    }

    return render(request, 'pages/recordings.html', context)

def recordings_item(request, slug):
    pages = RecordingPage.objects.all()
    page = get_object_or_404(RecordingPage, slug=slug)
    recordings = Recording.objects.filter(recording_page=page)
    title_bundle = {
        'title': u'{}, {}'.format(page.title, page.year)
    }

    context = {
        'pages': pages,
        'page': page,
        'title_bundle': title_bundle,
        'recordings': recordings,
    }

    return render(request, 'pages/recordings_item.html', context)

def links(request):
    return render(request, 'pages/links.html')


# verification pages
def keybase(request):
    return render(request, 'verification_pages/keybase.html', content_type='text/plain')

def google(request):
    return render(request, 'verification_pages/google.html', content_type='text/plain')
