from django.contrib import admin
from .models import Post
from .models import camera
#引入Post数据库
#通过admin.site.register进行注册

#自定义一个类，继承自admin.ModelAdmin用于展示 在models.py中定义的列
class PostAdmin(admin.ModelAdmin):
    list_display = ('title','slug','pub_data')

class Postadmin_2(admin.ModelAdmin):
    list_display = ('id','x','y','area')
# Register your models here.
admin.site.register(Post,PostAdmin)
admin.site.register(camera,Postadmin_2)
