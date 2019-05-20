"""myweb URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('^/', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('^/', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import include ,url
from django.conf import settings
from django.conf.urls.static import static

from my_web.views import index

from my_web.views import notfound,bar_y_category_stack,basic_table,blank
from my_web.views import chart_chartjs,GaodeHeatMap,logManagement,login
from my_web.views import swicthOn,userManagement,videoDB,videoView,warningVideoDB,workCalendar
from my_web.views import camera_management,work_management,run_management,security_management
from my_web.views import ready_management,standby_management

urlpatterns = [
    url(r'^admin/',admin.site.urls),
   
    url(r'camera_management/',camera_management),
    url(r'work_management/',work_management),
    url(r'run_management/',run_management),
    url(r'security_management/',security_management),
    url(r'standby_management/',standby_management),
    url(r'ready_management/',ready_management),
    
    url(r'index/',index),
   
    url(r'^basic_table/',basic_table),

    url(r'^blank/',blank),

    url(r'^chart_chartjs/',chart_chartjs),

    url(r'^GaodeHeatMap/',GaodeHeatMap),

    url(r'^logManagement/',logManagement),

    url(r'^login/',login),

    url(r'^swicthOn/',swicthOn),
    
    url(r'^videoDB/',videoDB),

    url(r'^userManagement/',userManagement),

    url(r'^videoView/',videoView),

    url(r'^warningVideoDB/',warningVideoDB),

    url(r'^workCalendar/',workCalendar),
        
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) 

