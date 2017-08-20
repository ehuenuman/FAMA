from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Teacher(models.Model):
    user = models.OneToOneField(User, primary_key=True)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    creation_date = models.DateTimeField()
    last_login = models.DateTimeField(blank=True)
    question = models.ManyToManyField('Question', through='TeacherHasQuestion')

    class Meta:
        managed = False
        db_table = 'teacher'


class Question(models.Model):    
    title = models.CharField(max_length=30)
    type = models.CharField(max_length=40)
    spanish_type = models.CharField(max_length=50)
    creation_date = models.DateTimeField() 
    share = models.IntegerField()
    code = models.CharField(max_length=9, blank=True)
    url = models.CharField(max_length=40)
    extension = models.CharField(max_length=10)

    #def __str__(self):
     #   return '{}'.format(self.title)

    class Meta:
        managed = False
        db_table = 'question'
        ordering = ('-creation_date',)


class TeacherHasQuestion(models.Model):
    teacher = models.ForeignKey('Teacher', models.DO_NOTHING)  # Field name made lowercase.
    question = models.ForeignKey('Question', models.DO_NOTHING)  # Field name made lowercase.
    incorporation_date = models.DateTimeField()
    deleted = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'teacher_has_question'
        unique_together = (('teacher', 'question'),)
        ordering = ('-incorporation_date',)