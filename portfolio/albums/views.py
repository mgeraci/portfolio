from django.db.models import Prefetch
from django.shortcuts import render, get_object_or_404
from albums.models import Album, AlbumList, AlbumSelection, AlbumLink

def album_lists(request):
    lists = AlbumList.objects.all().prefetch_related(
        Prefetch(
            'albums',
            queryset=Album.objects.all().order_by('albumselection__position')
        )
    )

    context = {
        'lists': lists,
        'show_project_nav': True,
    }

    return render(request, 'album_lists.html', context)


def album_list(request, slug):
    lists = AlbumList.objects.all().order_by('slug')
    this_list = get_object_or_404(AlbumList, slug=slug)
    selections = AlbumSelection.objects.filter(album_list=this_list)

    # in context of my descriptions, we can assume that any single quote should
    # be a smart right quote
    for selection in selections:
        selection.description = selection.description.replace("'", "&rsquo;")

    context = {
        'lists': lists,
        'list': this_list,
        'selections': selections,
        'show_project_nav': True,
    }

    return render(request, 'album_list.html', context)
