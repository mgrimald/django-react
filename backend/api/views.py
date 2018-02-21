
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404
from .models import Category, Article
import json
import datetime

def myconverter(o):
    if isinstance(o, datetime.datetime):
        return o.__str__()


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

def category(request, id):
    obj = get_object_or_404(Category, pk=id)
    return JsonResponse(obj.jsonifiable())

def article(request, id):
    obj = get_object_or_404(Article, pk=id)
    return JsonResponse(obj.jsonifiable())

def categories(request):
    listObj = Category.objects.all()
    listResult = []
    for obj in listObj:
        listResult.append(obj.jsonifiable())
    return JsonResponse({'categories': listResult})


def articleAll(request):
    listObj = Article.objects.all()
    listResult = []
    for obj in listObj:
        listResult.append(obj.jsonifiable())
    return JsonResponse({'articles': listResult})


def articlesFromCategory(request, id):
    listObj = Article.objects.all().filter(category__pk=id)
    listResult = []
    for obj in listObj:
        listResult.append(obj.jsonifiable())
    return JsonResponse({'category': id, 'articles': listResult})

