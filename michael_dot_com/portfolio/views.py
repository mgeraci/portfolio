from django.shortcuts import render

def index(request):
    return render(request, 'index.html')

def web(request):
    return render(request, 'web.html')
