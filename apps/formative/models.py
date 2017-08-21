from django.db import models

# Create your models here.
class Formative(models.Model):
    #id = models.AutoField()
    name = models.CharField(max_length=50, blank=False, null=False)
    description = models.CharField(max_length=200, blank=False, null=False)
    creation_date = models.DateTimeField(blank=False)
    teacher = models.ForeignKey('teacher.Teacher', models.DO_NOTHING)
    course = models.ManyToManyField('course.Course', through='Play')
    question = models.ManyToManyField('teacher.Question', through='FormativeHasQuestion')

    class Meta:
        managed = False
        db_table = 'formative'
        unique_together = (('id', 'teacher'),)
        ordering = ('-creation_date',)


class FormativeHasQuestion(models.Model):
    order = models.IntegerField()
    formative = models.ForeignKey('Formative', models.DO_NOTHING)
    question = models.ForeignKey('teacher.Question', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'formative_has_question'
        unique_together = (('formative', 'question'),)


class Play(models.Model):
    date_play = models.DateTimeField()
    start_time = models.DateTimeField()
    duration = models.TimeField()
    active = models.IntegerField()
    formative = models.ForeignKey('Formative', models.DO_NOTHING)
    course = models.ForeignKey('course.Course', models.DO_NOTHING)
    #student = models.ManyToManyField('student.Student', through='student.Answer')
    #question = models.ManyToManyField('teacher.Question', through='student.Answer')

    class Meta:
        managed = False
        db_table = 'play'
        ordering = ('date_play',)