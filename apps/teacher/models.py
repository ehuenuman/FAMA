from django.db import models
#from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import User


# Create your models here.
class Teacher(models.Model):
    user = models.OneToOneField(User, primary_key=True, on_delete=models.CASCADE)
    email = models.CharField(max_length=100, blank=True)
    password = models.CharField(max_length=100, blank=True)
    name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    creation_date = models.DateTimeField(blank=True)
    last_login = models.DateTimeField(blank=True)
    question = models.ManyToManyField('Question', through='TeacherHasQuestion')

    class Meta:
        managed = False
        db_table = 'teacher'


class Question(models.Model):
    #idpregunta = models.AutoField(db_column='idPregunta', primary_key=True)  # Field name made lowercase.
    title = models.CharField(max_length=30, blank=True, null=True)
    type = models.CharField(max_length=40, blank=True, null=True)
    creation_date = models.DateTimeField(blank=True, null=True)  # Field name made lowercase.
    share = models.IntegerField(blank=True, null=True)
    code = models.CharField(max_length=9, blank=True, null=True)
    url = models.CharField(max_length=40, blank=True, null=True)
    extension = models.CharField(max_length=10, blank=True, null=True)

    #def __str__(self):
     #   return '{}'.format(self.title)

    class Meta:
        managed = False
        db_table = 'question'
        ordering = ('-creation_date',)



class TeacherHasQuestion(models.Model):
    teacher = models.ForeignKey('Teacher', models.DO_NOTHING)  # Field name made lowercase.
    question = models.ForeignKey('Question', models.DO_NOTHING)  # Field name made lowercase.
    incorporation_date = models.DateTimeField(blank=True, null=True)
    deleted = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'teacher_has_question'
        unique_together = (('teacher', 'question'),)