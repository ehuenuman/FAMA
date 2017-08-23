from django.db import models

#from teacher.models import Formative

# Create your models here.
class Student(models.Model):    
    rut = models.CharField(max_length=15)
    name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, blank=True)

    class Meta:
        managed = False
        db_table = 'student'
        unique_together = (('id', 'rut'),)


class Answer(models.Model):    
    answer = models.CharField(max_length=50)
    correct = models.IntegerField()
    date = models.DateTimeField(blank=True, null=True)
    student = models.ForeignKey('Student', models.DO_NOTHING)
    play = models.ForeignKey('play.Play', models.DO_NOTHING)
    question = models.ForeignKey('teacher.Question', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'answer'
        unique_together = (('id',),)
