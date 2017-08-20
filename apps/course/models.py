from django.db import models

# Create your models here.
class Course(models.Model):
    id_char = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=50)
    code = models.CharField(max_length=20)
    semester = models.CharField(max_length=10)
    year = models.CharField(max_length=4)
    description = models.CharField(max_length=200, blank=True)
    creation_date = models.DateTimeField()
    teacher = models.ForeignKey('teacher.Teacher', models.DO_NOTHING)
    student = models.ManyToManyField('student.Student', through='CourseHasStudent')

    class Meta:
        managed = False
        db_table = 'course'
        ordering = ('-creation_date',)


class CourseHasStudent(models.Model):
    course = models.ForeignKey('Course', models.DO_NOTHING)
    student = models.ForeignKey('student.Student', models.DO_NOTHING)
#    student_rut = models.ForeignKey('Student', models.DO_NOTHING, related_name="course_has_student_rut")

    class Meta:
        managed = False
        db_table = 'course_has_student'
        unique_together = (('id', 'course', 'student'),)