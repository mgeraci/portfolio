from django.shortcuts import render

def index(request):
    return render(request, 'pages/index.html')

def web(request):
    return render(request, 'pages/web.html')

def photography(request):
    return render(request, 'pages/photography.html')

def graphic(request):
    return render(request, 'pages/graphic.html')

def composition(request):
    return render(request, 'pages/composition.html')

def recordings(request):
    return render(request, 'pages/recordings.html')

def links(request):
    return render(request, 'pages/links.html')
