# Generated by Django 2.1.7 on 2019-05-10 12:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('my_web', '0006_medicine'),
    ]

    operations = [
        migrations.CreateModel(
            name='table_people',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.DeleteModel(
            name='Medicine',
        ),
        migrations.RemoveField(
            model_name='studentunion',
            name='unionRoot',
        ),
        migrations.DeleteModel(
            name='Student',
        ),
        migrations.DeleteModel(
            name='studentUnion',
        ),
    ]
