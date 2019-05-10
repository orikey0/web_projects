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

class camera(models.Model):
    id = models.IntegerField
    area = models.TextField()
    x = models.FloatField()
    y = models.FloatField()
    model = models.TextField(default= "please input model about camera")
    status = models.TextField(default= "please input model about status about camera")
    pub_data = models.DateTimeField(default = timezone.now)
    
    
    def __unicode__(self):
        return self.id


