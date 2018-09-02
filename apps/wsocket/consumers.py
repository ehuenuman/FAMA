from django.db.models.signals import post_save
from apps.login.views import teacher_check
from apps.student.models import Reply, Answer
from apps.play.models import Play

from channels import Group
from channels.sessions import channel_session
from channels.auth import channel_session_user, channel_session_user_from_http
from urllib.parse import parse_qs

import json


# Connected to websocket.connect
@channel_session_user_from_http
def ws_connect(message, room_name):
    print("Conectando a ", room_name)
    # Accept connection
    message.reply_channel.send({"accept": True})
    # Parse the query string 
    #params = parse_qs(message.content["query_string"])    
    if teacher_check(message.user):
        # Set is_teacher and name user
        message.channel_session["is_teacher"] = True
        message.channel_session["name"] = message.user.first_name + message.user.last_name
    else:
        message.channel_session["is_teacher"] = False
        message.channel_session["name"] = message.user.first_name + message.user.last_name
        message.reply_channel.send({"accept": False})
    # Add the user to the room_name group
    Group("chat-%s" % room_name).add(message.reply_channel)

def send_answer(sender, instance, **kwargs):
    room_name = instance.play.id_char 
    
    total_for_question = Play.total_for_question(instance.play.id, instance.play.formative.id)    
    
    total_question = len(total_for_question)
    total_answers = len(Answer.objects.filter(student=instance.student, play=instance.play.id))    
    if total_question == total_answers:
        add_finish = True
    else:
        add_finish = False

    for index in range(0, len(total_for_question)):
        total_for_question[index]["question"] = "P{0}".format(index+1)

    Group("chat-%s" % room_name).send({
        "text": json.dumps({ 
            "action": "answer",
            "correct": instance.correct,
            "student": instance.student.user_id,
            "question": instance.question.id,
            "total_for_question": total_for_question,
            "add_finish": add_finish
        }),
    })

def send_reply(sender, instance, **kwargs):
    room_name = instance.play.id_char
    Group("chat-%s" % room_name).send({
        "text": json.dumps({
            "action": "reply",
            "played_students": Reply.objects.filter(play=instance.play.id).count()
        }),
    })


# Connected to websocket.disconnect
@channel_session_user
def ws_disconnect(message, room_name):
    Group("chat-%s" % room_name).discard(message.reply_channel)