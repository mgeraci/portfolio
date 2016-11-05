# -*- coding: utf-8 -*-

import json
from django.shortcuts import render, get_object_or_404
from michael_dot_com.localsettings import STATIC_URL
from portfolio.models import Composition
from portfolio.models import Web
from portfolio.models import WebImage
from portfolio.models import RecordingPage
from portfolio.models import Recording
from portfolio.models import Graphic
from portfolio.models import GraphicImage
from portfolio.models import PhotoblogImage


# main pages
def index(request):
    recent_image_root = '{}images/recent_thumbs/'.format(STATIC_URL)

    recent_items = [
        {
            'text': ['New steel drum performance:', 'Despers - Different Me'],
            'image': '{}despers-2016.jpg'.format(recent_image_root),
            'href': 'https://www.youtube.com/watch?v=kxqzHEAiwHY',
        },
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
            'text': ['New Photos:', 'Summer trip to Duluth'],
            'image': '{}7352.jpg'.format(recent_image_root),
            'href': 'http://michaelgeraci.com/photography/blog/427',
        },
    ]

    """
    {
        'text': ['New steel drum performance:', 'CASYM - Big People Party'],
        'image': '{}casym-2014.jpg'.format(recent_image_root),
        'href': 'https://www.youtube.com/watch?v=UaLBILfJ5ag',
    },
    """

    context = {
        'recent_items': recent_items,
        'recent_date': '9.10.16',
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
    images = PhotoblogImage.objects.all()
    imageOrder = []
    imageMap = {}
    years = []
    i = 0

    for image in images:
        if i == 0:
            latest_year = image.year

        imageOrder.append(image.id)
        imageMap[image.id] = image.to_json()
        i += 1

    i = 2007

    while i <= latest_year:
        years.append(i)
        i += 1

    context = {
        'images_json': json.dumps({
            'order': imageOrder,
            'images': imageMap,
            'years': years[::-1],
        }),
    }

    return render(request, 'pages/photography.html', context)


# helper for generating the text for a graphic design
def graphic_title(graphic):
    return {
        'title': u'{}, {}'.format(graphic.title, graphic.year),
        'subtitles': [
            graphic.materials,
            graphic.description,
        ],
    }


def graphic(request):
    graphics = Graphic.objects.all()
    context = {
        'graphics': graphics
    }

    return render(request, 'pages/graphic.html', context)


def graphic_item(request, slug):
    graphics = Graphic.objects.all()
    graphic = get_object_or_404(Graphic, slug=slug)
    graphic_images = GraphicImage.objects.filter(graphic=graphic)

    context = {
        'graphics': graphics,
        'graphic': graphic,
        'images': graphic_images,
        'title_bundle': graphic_title(graphic),
    }

    return render(request, 'pages/graphic.html', context)


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

    return render(request, 'pages/composition.html', context)


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

    return render(request, 'pages/recordings.html', context)


def links(request):
    schools = [
        {
            'name': 'Oberlin Conservatory: TIMARA',
            'href': 'http://timara.con.oberlin.edu/',
        },
        {
            'name': 'Oberlin College/Conservatory',
            'href': 'http://www.oberlin.edu/',
        },
        {
            'name': 'Horace Mann',
            'href': 'http://www.horacemann.org/',
        },
    ]

    steels = [
        {
            'href': 'https://www.youtube.com/watch?v=kxqzHEAiwHY',
            'name': 'Despers USA, New York - Different Me (2016)',
        },
        {
            'href': 'https://www.youtube.com/watch?v=x691_sB19Ww',
            'name': 'CASYM, New York - Like Ah Boss (2015)',
        },
        {
            'href': 'https://www.youtube.com/watch?v=UaLBILfJ5ag',
            'name': 'CASYM, New York - Big People Party (2014)',
        },
        {
            'href': 'http://www.youtube.com/watch?v=cTOi7ON1kpU',
            'name': 'CASYM, New York - Fantastic Friday (2013)',
        },
        {
            'href': 'https://www.youtube.com/watch?v=Jjym9fKzE5U',
            'name': 'Pan Sonatas, New York - Gie Dem Tempo (2012)',
        },
        {
            'href': 'http://vimeo.com/28989090',
            'name': u'Pan Sonatas, New York - It’s Showtime (2011)',
        },
        {
            'href': 'http://vimeo.com/16149060',
            'name': 'Pan Sonatas, New York - Battle Zone (2010)',
        },
        {
            'href': 'http://vimeo.com/6826668',
            'name': 'Pan Sonatas, New York - Bandoleros (2009)',
        },
        {
            'href': 'http://www.youtube.com/watch?v=CsayTC-V8VU',
            'name': 'Pan Sonatas, New York - The Ten Commandments of Pan (2008)',
        },
        {
            'href': 'http://www.youtube.com/watch?v=qWFmbXErjpA',
            'name': 'Pan Sonatas, New York - Pan Lamentation (2007)',
        },
        {
            'href': 'http://vimeo.com/23268333',
            'name': u'Pan Sonatas, New York - This One’s for You, Bradley (2006)',
        },
        {
            'name': 'Pan Sonatas, New York - From Beyond (2005)',
        },
        {
            'href': 'http://vimeo.com/7625432',
            'name': 'Trinidad All-Stars, Trinidad & Tobago - Free Up (2005)',
        },
        {
            'href': 'http://www.youtube.com/watch?v=aTUMlF9Zt3E',
            'name': 'Sforzata Steel Orchestra, Trinidad & Tobago - Dingolay (2005)',
        },
        {
            'href': 'http://vimeo.com/28470859',
            'name': 'Pan Sonatas, New York - War 2004 (2004)',
        },
    ]

    context = {
        'schools': schools,
        'steels': steels,
    }

    return render(request, 'pages/links.html', context)


# verification pages
# -----------------------------------------------------------------------------

def keybase(request):
    return render(request, 'verification_pages/keybase.html', content_type='text/plain')


def google(request):
    return render(request, 'verification_pages/google.html', content_type='text/plain')
