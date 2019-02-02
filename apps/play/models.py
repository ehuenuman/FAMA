from django.db import connection, models

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

    class Meta:
        managed = False
        db_table = 'play'
        ordering = ('-creation_play', '-start_play')

    def duration_to_time(self):
        """Use in template for render duration time"""
        return "{0} min.".format(int(self.duration.seconds/60))

    @staticmethod  
    def total_for_question(play_id, formative_id):
        """Search for any question on play the total of corrects and incorrect"""        
        cur = connection.cursor()
        cur.callproc("total_for_question", [play_id, formative_id])
        results = cur.fetchall()        
        cur.close()
        
        total_for_question = []
        for total in results:
            total_for_question.append({"question": total[0], "replys": int(total[1]), "corrects": int(total[2]), "incorrects": int(total[3])})
        
        #print(total_for_question)
        return total_for_question
        #[Play(*row) for row in results]
