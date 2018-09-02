from django.db import models

# Create your models here.

class Question(models.Model):    
    title = models.CharField(max_length=30, blank=True)
    type = models.CharField(max_length=40)
    spanish_type = models.CharField(max_length=50)
    correct = models.CharField(max_length=100)
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