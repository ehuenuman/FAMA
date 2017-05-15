from django.db import models

#from teacher.models import Formative

# Create your models here.
class Student(models.Model):
    #id = models.AutoField()
    rut = models.CharField(max_length=15)
    name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'student'
        unique_together = (('id', 'rut'),)


class Play(models.Model):
    date = models.DateTimeField(blank=True, null=True)
    formative_has_course = models.ForeignKey('formative.FormativeHasCourse', models.DO_NOTHING)
    student = models.ManyToManyField('Student', through='Answer')
    question = models.ManyToManyField('teacher.Question', through='Answer')

    class Meta:
        managed = False
        db_table = 'play'


class Answer(models.Model):
    #id = models.AutoField()
    answer = models.CharField(max_length=50, blank=True, null=True)
    correct = models.IntegerField(blank=True, null=True)
    date = models.DateTimeField(blank=True, null=True)
    student = models.ForeignKey('Student', models.DO_NOTHING)
    play = models.ForeignKey('Play', models.DO_NOTHING)
    question = models.ForeignKey('teacher.Question', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'answer'
        unique_together = (('id', 'question'),)
