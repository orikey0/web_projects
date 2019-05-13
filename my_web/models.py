from django.db import models

# Create your models here.
from django.utils import timezone
#这个地方的作用是创建一个类，这个类最终会对应一个数据表
class Post(models.Model):
    title = models.CharField(max_length = 200)
    slug = models.CharField(max_length = 200)
    body = models.TextField()
    pub_data = models.DateTimeField(default = timezone.now)
    
    class Meta:
        ordering = ('-pub_data',)
    
    def __unicode__(self):
        return self.title

#建立一个用于人数变化的表
class table_peo(models.Model):
    id = models.AutoField(primary_key=True)

    num_p1 = models.IntegerField()

    num_p2 = models.IntegerField()

    num_p3 = models.IntegerField()
#建立一个保安位置的数据库
class table_sec(models.Model):
    x = models.FloatField()
    y = models.FloatField()

#建立一个摄像头信息位置的数据库
class table_cam(models.Model):
    #坐标
    x = models.FloatField()
    y = models.FloatField()
# 超阈值点
    warn_num = models.IntegerField()
    #id = models.AutoField(primary_key=True)
#设备型号
    type_cam = models.TextField()
#启用时间
    time_cam = models.DateField(auto_now_add=True)
#所在区域
    area = models.TextField(default="输入所在位置")

#值班人员的信息库
class table_duty_peo(models.Model):
#值班人员的id,姓名，性别，职位，电话
    area = models.TextField(default = "请输入所在位置")
    name = models.CharField(max_length=20)
    sex = models.CharField(max_length = 8)
    postion = models.CharField(max_length = 20)
    tel = models.TextField(default = "请输入电话号码")

#登录日志
class log_web(models.Model):
#登录人员的id ，username，操作的摄像头的名字，备忘录信息，日期
    id = models.AutoField(primary_key = True)
    opr = models.TextField(max_length = 30)
    data = models.DateField(auto_now_add=True)
    name_opr = models.CharField(max_length = 20)
    name_be_opr = models.CharField(max_length = 20)
    memorandum = models.TextField()

#已经注册人员的信息
class table_user(models.Model):
#姓名，密码，权限信息
    username = models.CharField(max_length = 20)
    user_pass = models.CharField(max_length = 20)
    user_grade = models.CharField(max_length = 20)
    


