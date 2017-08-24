from django.db import models
from django.contrib.auth.models import User

#from teacher.models import Formative

# Create your models here.
class Student(models.Model):
    user = models.OneToOneField(User, primary_key=True)
    rut = models.CharField(unique=True, max_length=15)

    class Meta:
        managed = False
        db_table = 'student'        


class Answer(models.Model):    
    answer = models.CharField(max_length=50)
    correct = models.IntegerField()
    date = models.DateTimeField()
    student = models.ForeignKey('Student', models.DO_NOTHING)
    play = models.ForeignKey('play.Play', models.DO_NOTHING)
    question = models.ForeignKey('teacher.Question', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'answer'
        unique_together = (('id',),)
