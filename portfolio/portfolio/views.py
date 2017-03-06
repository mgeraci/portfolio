# -*- coding: utf-8 -*-

import json
import re
from django.shortcuts import render, get_object_or_404
from michael_dot_com.localsettings import STATIC_URL
from django.contrib.auth.models import User
from resume import Resume
from portfolio.models import (
    HomeProject,
    HomeProjectMedia,
    Composition,
    Web,
    WebImage,
    RecordingPage,
    Recording,
    Graphic,
    GraphicImage,
    PhotoblogImage,
)


# main pages
def index(request):
    home_projects = HomeProject.objects.all()
    michael = get_object_or_404(User, username='mgeraci')

    context = {
        'home_projects': home_projects,
        'headline': michael.userprofile.headline,
        'blurb': michael.userprofile.blurb,
        'show_project_nav': True,
    }

    return render(request, 'pages/index.html', context)


def project(request, slug):
    home_projects = HomeProject.objects.all()
    project = get_object_or_404(HomeProject, slug=slug)
    project_media = HomeProjectMedia.objects.filter(project=project)
    project_media_map = {}

    for media in project_media:
        media.is_media = True
        project_media_map[media.position] = media

    # split the long description into a list of paragraphs. strip whitespace,
    # and only append the paragraph if it isn't blank
    project.long_description = [
        p.strip() for p in project.long_description.split('\n') if p.strip()
    ]

    content = []

    # mix the media into the paragraphs
    for i, p in enumerate(project.long_description):
        res = {
            'text': p,
        }

        if re.search('##', p, re.UNICODE):
            res['is_title'] = True
            res['text'] = p.replace("## ", "")
        else:
            res['is_title'] = False

        content.append(res)

        try:
            content.append(project_media_map[i])

        except:
            pass

    project.content = content

    context = {
        'project': project,
        'show_project_nav': True,
    }

    return render(request, 'pages/project.html', context)


def resume(request):
    return render(request, 'pages/resume.html', Resume)


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


def graphic_item(request, slug):
    graphics = Graphic.objects.all()

    if slug:
        graphic = get_object_or_404(Graphic, slug=slug)
        graphic_landing_page = False
    else:
        graphic = graphics[0]
        graphic_landing_page = graphic.slug

    graphic_images = GraphicImage.objects.filter(graphic=graphic)

    context = {
        'graphics': graphics,
        'graphic': graphic,
        'graphic_landing_page': graphic_landing_page,
        'images': graphic_images,
        'title_bundle': graphic_title(graphic),
    }

    return render(request, 'pages/graphic.html', context)


def graphic(request):
    return graphic_item(request, False)


def composition_item(request, slug):
    compositions = Composition.objects.all()

    if slug:
        piece = get_object_or_404(Composition, slug=slug)
        composition_landing_page = False
    else:
        piece = compositions[0]
        composition_landing_page = piece.slug

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
        'composition_landing_page': composition_landing_page,
        'piece': piece,
        'title_bundle': title_bundle,
    }

    return render(request, 'pages/composition.html', context)


def composition(request):
    return composition_item(request, False)


def recordings_item(request, slug):
    pages = RecordingPage.objects.all()

    if slug:
        page = get_object_or_404(RecordingPage, slug=slug)
        recording_landing_page = False
    else:
        page = pages[0]
        recording_landing_page = page.slug

    recordings = Recording.objects.filter(recording_page=page)
    title_bundle = {
        'title': u'{}, {}'.format(page.title, page.year)
    }

    context = {
        'pages': pages,
        'page': page,
        'title_bundle': title_bundle,
        'recordings': recordings,
        'recording_landing_page': recording_landing_page,
    }

    return render(request, 'pages/recordings.html', context)


def recordings(request):
    return recordings_item(request, False);


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
