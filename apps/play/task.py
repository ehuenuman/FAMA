from celery import shared_task

from apps.student.models import Reply

@shared_task
def stop_reply(reply_id):
    """Stop reply of a student when end the time to respond the formative"""
    reply = Reply.objects.get(id=reply_id)
    reply.is_active = 0
    reply.save()    