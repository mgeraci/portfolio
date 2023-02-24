# -*- coding: utf-8 -*-

import json
import re
from django.shortcuts import render, get_object_or_404
from michael_dot_com.localsettings import STATIC_URL
from django.contrib.auth.models import User
from .resume import Resume
from portfolio.models import (
    HomeProject,
    HomeProjectMedia,
    HomeProjectLink,
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
    home_projects = HomeProject.objects.all().filter(is_hidden=False)
    michael = get_object_or_404(User, username='mgeraci')

    context = {
        'home_projects': home_projects,
        'headline': michael.userprofile.headline,
        'blurb': michael.userprofile.blurb,
    }

    return render(request, 'pages/index.html', context)


def project(request, slug):
    project = get_object_or_404(HomeProject, slug=slug)
    project_media = HomeProjectMedia.objects.filter(project=project)
    project.links = HomeProjectLink.objects.filter(project=project).order_by('order')
    project_media_map = {}


    # prep project description and media
    # -------------------------------------------------------------------------

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


    # get previous and next project for navigation
    # -------------------------------------------------------------------------

    prev_project = False
    next_project = False

    def get_next_visible_project(current_index, direction):
        order = current_index + 1 if direction == 'next' else current_index - 1
        print(order)

        try:
            res = HomeProject.objects.get(order=order)

            if res.is_hidden:
                return get_next_visible_project(order, direction)
            else:
                return res
        except:
            return None

    try:
        prev_project = get_next_visible_project(project.order, 'prev')
    except:
        pass

    try:
        next_project = get_next_visible_project(project.order, 'next')
    except:
        pass

    context = {
        'project': project,
        'navigation': {
            'prev_project': prev_project,
            'next_project': next_project,
        },
    }

    return render(request, 'pages/project.html', context)


def resume(request):
    Resume['show_phone'] = request.GET.get('show-phone') == '1'

    return render(request, 'pages/resume.html', Resume)


def web(request):
    webs = Web.objects.all()
    context = {
        'webs': webs,
        'use_old_nav': True,
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
        'title_bundle': title_bundle,
        'use_old_nav': True,
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

        imageOrder.append(image.lightroom_id)
        imageMap[image.lightroom_id] = image.to_json()
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
        'use_old_nav': True,
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
        'use_old_nav': True,
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
        'use_old_nav': True,
    }

    return render(request, 'pages/recordings.html', context)


def recordings(request):
    return recordings_item(request, False);


def links(request):
    schools = [
        {
            'name': 'Oberlin Conservatory: TIMARA',
            'href': 'https://timara.con.oberlin.edu/',
        },
        {
            'name': 'Oberlin College/Conservatory',
            'href': 'https://www.oberlin.edu/',
        },
        {
            'name': 'Horace Mann',
            'href': 'https://www.horacemann.org/',
        },
    ]

    context = {
        'schools': schools,
        'use_old_nav': True,
    }

    return render(request, 'pages/links.html', context)

def steel(request):
    steels = [
        {
            'youtube': 'VrAUdLb7jLA',
            'name': 'Despers USA - Iron Love',
            'year': 2019,
            'location': 'New York',
            'rank': '4th place',
        },
        {
            'youtube': 'EMJgfaK0KBU',
            'name': 'Despers USA - Year for Love',
            'year': 2018,
            'location': 'New York',
            'rank': '1st place',
        },
        {
            'youtube': 'ZrlvAjUCP8U',
            'name': 'Despers USA - Buss Head',
            'year': 2017,
            'location': 'New York',
            'rank': 'rained out; no judging',
        },
        {
            'youtube': 'kxqzHEAiwHY',
            'name': 'Despers USA - Different Me',
            'year': 2016,
            'location': 'New York',
            'rank': '5th place',
        },
        {
            'youtube': 'x691_sB19Ww',
            'name': 'CASYM - Like Ah Boss',
            'year': 2015,
            'location': 'New York',
            'rank': '2nd place',
        },
        {
            'youtube': 'UaLBILfJ5ag',
            'name': 'CASYM - Big People Party',
            'year': 2014,
            'location': 'New York',
            'rank': '2nd place',
        },
        {
            'youtube': 'cTOi7ON1kpU',
            'name': 'CASYM - Fantastic Friday',
            'year': 2013,
            'location': 'New York',
            'rank': '1st place',
        },
        {
            'youtube': 'Jjym9fKzE5U',
            'name': 'Pan Sonatas - Gie Dem Tempo',
            'year': 2012,
            'location': 'New York',
            'rank': '4th place',
        },
        {
            'vimeo': '28989090',
            'name': u'Pan Sonatas - It’s Showtime',
            'year': 2011,
            'location': 'New York',
            'rank': '4th place',
        },
        {
            'vimeo': '16149060',
            'name': 'Pan Sonatas, New York - Battle Zone',
            'year': 2010,
            'location': 'New York',
            'rank': '1st place',
        },
        {
            'vimeo': '6826668',
            'name': 'Pan Sonatas - Bandoleros',
            'year': 2009,
            'location': 'New York',
            'rank': '1st place',
        },
        {
            'youtube': 'CsayTC-V8VU',
            'name': 'Pan Sonatas - The Ten Commandments of Pan',
            'year': 2008,
            'location': 'New York',
            'rank': '3rd place',
        },
        {
            'youtube': 'qWFmbXErjpA',
            'name': 'Pan Sonatas - Pan Lamentation',
            'year': 2007,
            'location': 'New York',
            'rank': '1st place',
        },
        {
            'vimeo': '23268333',
            'name': u'Pan Sonatas - This One’s for You, Bradley',
            'year': 2006,
            'location': 'New York',
            'rank': '2nd place',
        },
        {
            'soundcloud': '1105092640',
            'name': 'Pan Sonatas - From Beyond',
            'year': 2005,
            'location': 'New York',
            'rank': '3rd place',
        },
        {
            'vimeo': '7625432',
            'name': 'Trinidad All-Stars - Free Up',
            'year': 2005,
            'location': 'Trinidad & Tobago',
            'rank': '7th place; large bands',
        },
        {
            'youtube': 'aTUMlF9Zt3E',
            'name': 'Sforzata Steel Orchestra - Dingolay',
            'year': 2005,
            'location': 'Trinidad & Tobago',
            'rank': '1st place; medium bands',
        },
        {
            'vimeo': '28470859',
            'name': 'Pan Sonatas, New York - War 2004',
            'year': 2004,
            'location': 'New York',
            'rank': '1st place',
        },
    ]

    context = {
        'steels': steels,
    }

    return render(request, 'pages/steel.html', context)


# verification pages
# -----------------------------------------------------------------------------

def keybase(request):
    return render(request, 'verification_pages/keybase.html', content_type='text/plain')


def google(request):
    return render(request, 'verification_pages/google.html', content_type='text/plain')
