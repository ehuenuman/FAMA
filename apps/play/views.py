from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required, user_passes_test
from django.http import JsonResponse
from django.utils import timezone
from django.core import serializers
from django.db.models import Sum
from datetime import timedelta
import xml.etree.ElementTree as ET

from django.contrib.auth.models import User
from apps.login.views import teacher_check
from apps.question.views import question_data
from .models import Play
from .task import stop_reply
from apps.formative.models import Formative, FormativeHasQuestion
from apps.course.models import Course
from apps.teacher.models import Question
from apps.student.models import Student, Answer, Reply

# Create your views here.
@login_required
def stop_play(request):
    if request.method == "POST":
        play = Play.objects.get(id=request.POST["playId"])
        play.is_active = 0
        play.close_play = timezone.now()
        play.save()

        return JsonResponse({"data": "OK"})


@login_required
def show_play(request, play_id_char):
    if request.method == "GET":
        play = Play.objects.get(id_char=play_id_char)

        formative = Formative.objects.get(id=play.formative.id)
        questions = Question.objects.filter(formative=play.formative).order_by("formativehasquestion__order")
        first_question = questions[0]

        try:
            reply = Reply.objects.get(student=request.user.student, play=play)
            status = reply.is_active
            close_reply = reply.close_reply
        except Exception as e:
            status = 1
            close_reply = ""

        return render(request, "play/show.html", {
            "play": play,            
            "formative": formative,
            "questions": questions,
            "first_q": first_question,
            "status": status,
            "close_reply": close_reply
            })


@login_required
def reply_play(request, play_id_char, question_id):    
    play = Play.objects.get(id_char=play_id_char)
    if request.method == "GET":
        formative = Formative.objects.get(id=play.formative.id)            
        try:
            reply = Reply.objects.get(student=request.user.student, play=play)
            close_reply = reply.close_reply        
        except Exception as e:
            try:
                reply = Reply.objects.create(
                    student=request.user.student,
                    play=play,
                    start_reply=timezone.now(),
                    close_reply=timezone.now() + play.duration,
                    is_active=1)
                close_reply = reply.close_reply
                print(reply.student.user.first_name)
                print(reply.play.formative.name)
                stop_reply.apply_async([reply.id], countdown=play.duration.seconds)
            except Exception as e:
                print("Error: No se pudo crear reply. ", e)
        if formative.has(question_id) and reply.is_active == 1:
            namespace = {"ns1": "http://www.imsglobal.org/xsd/imsqti_v2p1",
                "ns2": "http://www.w3.org/2001/XMLSchema-instance",
                "ns3": "http://www.imsglobal.org/xsd/imsqti_v2p1  http://www.imsglobal.org/xsd/qti/qtiv2p1/imsqti_v2p1.xsd"}
            question = Question.objects.get(id=question_id)
            data_of_question = question_data(question)
            data = {}
            try:
                answer = Answer.objects.filter(
                    student=request.user.student,
                    play=play,
                    question=question)[:1]
                data["answer"] = answer[0].answer
            except Exception as e:
                print("No existe respuesta: " ,e)
            if question.type == "choice":
                #print(data["archivo"])
                root = ET.fromstring(data_of_question["archivo"])
                #print(root)
                alternatives = []
                data["id"] = question.id
                data["code"] = question.code
                data["title"] = root.get("title")
                data["question"] = root.find("*//ns1:prompt", namespace).text
                
                if question.extension == "zip":
                    data["alternative_text"] = root.findall("*//ns1:p", namespace)[0].text
                    data["image"] = root.find("*//ns1:img", namespace).get("src")

                for elem in root.iterfind("*//ns1:simpleChoice", namespace):
                    alternatives.append({"text": elem.text, "id": elem.get("identifier")})
                    #print(elem.get("identifier"), elem.text)

                data["alternatives"] = alternatives

                order_question = FormativeHasQuestion.objects.get(formative=formative, question=question)
                total_questions = Question.objects.filter(formative=play.formative).order_by("formativehasquestion__order")
                #print(order_question.order, total_questions.count());
                if order_question.order == 0:
                    data["next"] = total_questions[1].id
                elif order_question.order == (total_questions.count() - 1):
                    data["prev"] = total_questions[order_question.order-1].id
                else:
                    data["next"] = total_questions[order_question.order+1].id
                    data["prev"] = total_questions[order_question.order-1].id                

                return render(
                    request, 
                    "question/reply_choice.html", 
                    {
                        "question": data,
                        "alternatives": alternatives,
                        "play": play,
                        "close_reply": close_reply
                    })
        else:
            return redirect("play:show", play_id_char=play_id_char)
    else:
        data = {}
        question = Question.objects.get(id=question_id)
        student = request.user.student
        student_answer = request.POST["answer"]
        if student_answer == question.correct:
            correct = 1
        else:
            correct = 0
        try:
            answer = Answer.objects.get(student=student, play=play, question=question)
        except:
            answer = None
        if answer is None:
            try:
                Answer.objects.create(answer=student_answer, correct=correct, date=timezone.now(), student=student, play=play, question=question)
                data["data"] = "OK"
            except Exception as e:
                print("Error al guardar la respuesta: ", e)
                data["data"]= "Error al guardar la respuesta"
        else:
            try:
                answer.answer = student_answer
                answer.correct = correct
                answer.date = timezone.now()
                answer.save()
                data["data"] = "OK"
            except Exception as e:
                print("Error al guardar la respuesta: ", e)
                data["data"]= "Error al guardar la respuesta"

        return JsonResponse(data)


@login_required
@user_passes_test(teacher_check)
def play_result(request, play_id_char):
    play = Play.objects.get(id_char=play_id_char)
    formative = Formative.objects.get(id=play.formative.id)
    questions = Question.objects.filter(formative=play.formative).order_by("formativehasquestion__order")  
    course = Course.objects.get(id=play.course.id)
    students = User.objects.filter(student__course=course.id).only("first_name").values("id", "first_name", "last_name").order_by("last_name")
    temp = []
    for student in students:
        answer = Answer.objects.filter(student=student["id"], play=play.id).values("question", "correct")
        student["answers"] = answer
        temp.append(student)

    #print(students)
    #print(answer)
    #print(student)
    #print(temp)
    #answers = Answer.objects.filter(play=play.id)
    #print(answers)

    return render(
        request,
        "play/result.html", 
        {
            "play": play,
            "formative": formative,
            "questions": questions,
            "course": course,
            "students": temp,
            
        })