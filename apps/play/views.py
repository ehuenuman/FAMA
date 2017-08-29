from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.utils import timezone
from django.core import serializers
from datetime import timedelta
import xml.etree.ElementTree as ET

from apps.question.views import question_data
from .models import Play
from apps.formative.models import Formative
from apps.teacher.models import Question

# Create your views here.
@login_required
def stop_play(request):
    if request.method == "POST":
        play = Play.objects.get(id=request.POST["playId"])
        play.is_active = 0
        play.save()

        return JsonResponse({"data": "OK"})


@login_required
def show_play(request, play_id_char):
    if request.method == "GET":
        play = Play.objects.get(id_char=play_id_char)
        formative = Formative.objects.get(id=play.formative.id)
        questions = Question.objects.filter(formative=play.formative).order_by("formativehasquestion__order")
        print(questions)

        return render(request, "play/show.html", {
            "play": play,
            "formative": formative,
            "questions": questions
            })



@login_required
def reply_play(request, play_id_char, question_id):
    #print(play_id_char, question_id)
    play = Play.objects.get(id_char=play_id_char)
    formative = Formative.objects.get(id=play.formative.id)
    if validate_question(formative, question_id):
        namespace = {"ns1": "http://www.imsglobal.org/xsd/imsqti_v2p1",
            "ns2": "http://www.w3.org/2001/XMLSchema-instance",
            "ns3": "http://www.imsglobal.org/xsd/imsqti_v2p1  http://www.imsglobal.org/xsd/qti/qtiv2p1/imsqti_v2p1.xsd"}
        question = Question.objects.get(id=question_id)
        data = question_data(question)
        if question.type == "choice":
            print(data["archivo"])
            root = ET.fromstring(data["archivo"])
            print(root)
            data = {}
            alternatives = []
            data["title"] = root.get("title")
            data["question"] = root.find("*//ns1:prompt", namespace).text
            for elem in root.iterfind("*//ns1:simpleChoice", namespace):
                alternatives.append({"text": elem.text, "id": elem.get("identifier")})
                print(elem.get("identifier"), elem.text)

            data["alternatives"] = alternatives

            print(data)            

            return render(request, 
                "question/reply_choice.html", 
                {
                    "question": data,
                    "alternatives": alternatives
                })
    else:
        return redirect('play:show', play_id_char=play_id_char)


def validate_question(formative, question_id):
    """Verifica la formativa posee la pregunta entregada"""
    return formative.question.filter(id=question_id).exists()
