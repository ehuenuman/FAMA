from django.db import models

# Create your models here.
class Play(models.Model):
    id_char = models.CharField(max_length=100, unique=True)
    creation_play = models.DateTimeField()
    duration = models.DurationField()
    start_play = models.DateTimeField()
    limit_time = models.DurationField()
    close_play = models.DateTimeField()
    is_active = models.IntegerField()
    formative = models.ForeignKey('formative.Formative', models.DO_NOTHING)
    course = models.ForeignKey('course.Course', models.DO_NOTHING)
    #student = models.ManyToManyField('student.Student', through='student.Answer')
    #question = models.ManyToManyField('teacher.Question', through='student.Answer')

    class Meta:
        managed = False
        db_table = 'play'
        ordering = ('creation_play', 'start_play')

    def duration_to_time(self):
        return "{0} min.".format(int(self.duration.seconds/60))
