from __future__ import unicode_literals
from django.shortcuts import render
from django.shortcuts import redirect
# Create your views here.
from django.http import HttpRequest
from django.http import HttpResponse
from .models import Post,table_peo
import time
import json
from django.template.loader import get_template
from .models import camera


def systemSetting(request):
    template = get_template('systemSetting.html')
    cameras = camera.objects.all()
    html = template.render(locals())
    
    return HttpResponse(html)

def index(request):    
    table_peos = table_peo.objects.all()
    List=[]
    for table in table_peos:
        List+=[table.num_p1,table.num_p2,table.num_p3]
    
    return render(request, 'index.html', {'List': json.dumps(List)})
   
def notfound(request):
        template = get_template('404.html')
        html = template.render(locals())
        return HttpResponse(html)

def bar_y_category_stack(request):
        template = get_template('bar-y-category-stack.html')
        html = template.render(locals())
        return HttpResponse(html)

def basic_table(request):
        template = get_template('basic_table.html')
        html = template.render(locals())
        return HttpResponse(html)

def blank(request):
        template = get_template('blank.html')
        html = template.render(locals())
        return HttpResponse(html)

def chart_chartjs(request):
        template = get_template('chart-chartjs.html')
        html = template.render(locals())
        return HttpResponse(html)

def GaodeHeatMap(request):
        template = get_template('GaodeHeatMap.html')
        html = template.render(locals())
        return HttpResponse(html)

def login(request):
        template = get_template('login.html')
        html = template.render(locals())
        return HttpResponse(html)

def logManagement(request):
        template = get_template('logManagement.html')
        html = template.render(locals())
        return HttpResponse(html)

def swicthOn(request):
        template = get_template('swicthOn.html')
        html = template.render(locals())
        return HttpResponse(html)

def userManagement(request):
        template = get_template('userManagement.html')
        html = template.render(locals())
        return HttpResponse(html)

def videoDB(request):
        template = get_template('videoDB.html')
        html = template.render(locals())
        return HttpResponse(html)

def videoView(request):
        template = get_template('videoView.html')
        html = template.render(locals())
        return HttpResponse(html)

def warningVideoDB(request):
        template = get_template('warningVideoDB.html')
        html = template.render(locals())
        return HttpResponse(html)

def workCalendar(request):
        template = get_template('workCalendar.html')
        html = template.render(locals())
        return HttpResponse(html)

