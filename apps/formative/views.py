from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.utils import timezone
from django.core import serializers
from datetime import timedelta

from .forms import FormativeForm
from .models import Formative, FormativeHasQuestion
from apps.play.models import Play
from apps.student.models import Student
from apps.teacher.models import Question
from apps.course.models import Course
import apps.question.manageXML as manageXML

@login_required
def view_formatives(request):
    formatives = Formative.objects.filter(teacher=request.user.teacher)
    return render(request, 'formative/index.html', {'formatives': formatives})


@login_required
def show_formative(request, formative_id):
    formative = Formative.objects.get(id=formative_id)
    return render(request, 'formative/show.html', {'formative': formative})


@login_required
def create_formative(request):
    if request.method == "POST":
        formative = Formative.objects.create(
            name=request.POST.getlist('name')[0],
            description=request.POST.getlist('description')[0],
            creation_date=timezone.now(),
            teacher=request.user.teacher)
        position = 0
        for question_id in request.POST.getlist('questions[]'):
            question = Question.objects.get(id=question_id)
            fhasq = FormativeHasQuestion.objects.create(
                order=position,
                formative=formative, 
                question=question)
            fhasq = None
            question = None
            position = position + 1
        data = {}
        data['redirect'] = '/formativa/'
        return JsonResponse(data)
    else:
        data = request.user.teacher.question.all().order_by('teacherhasquestion__incorporation_date').reverse()
        questions = []
        for question in data:
            #print(question)
            q_question = manageXML.data_choice(question.code, question.extension)["itemBody"]["choiceInteraction"]["question"]
            questions.append({"question": q_question, "data": question})
        form = FormativeForm()
    return render(request, 'formative/create.html', {'form': form, 'questions': questions, 'title': 'Crear Formativa'})


@login_required
def edit_formative(request, formative_id):
    formative = Formative.objects.get(id=formative_id)
    if request.method == 'GET':
        data_selected = formative.question.all().order_by('formativehasquestion__order')
        data = request.user.teacher.question.exclude(id__in=data_selected).order_by('teacherhasquestion__incorporation_date').reverse()
        questions = []
        for question in data:
            #print(question)
            q_question = manageXML.data_choice(question.code, question.extension)["itemBody"]["choiceInteraction"]["question"]
            questions.append({"question": q_question, "data": question})
        question_selected = []
        for question in data_selected:
            q_question = manageXML.data_choice(question.code, question.extension)["itemBody"]["choiceInteraction"]["question"]
            question_selected.append({"question": q_question, "data": question})
        form = FormativeForm(instance=formative)
    else:
        formative.name = request.POST.getlist('name')[0]
        formative.description=request.POST.getlist('description')[0]
        formative.creation_date=timezone.now()
        formative.question.clear()

        position = 0
        for question_id in request.POST.getlist('questions[]'):
            question = Question.objects.get(id=question_id)
            fhasq = FormativeHasQuestion.objects.create(
                order=position,
                formative=formative, 
                question=question)
            fhasq = None
            question = None
            position = position + 1

        formative.save()
        data = {}
        data['redirect'] = '/formativa/'
        return JsonResponse(data)
    return render(request, 'formative/create.html', {'form': form, 'questions': questions, 'question_selected': question_selected, 'title': 'MAs Play - Editar Formativa'})


@login_required
def start_formative(request):
    if request.method == "POST":
        formative = Formative.objects.get(id=request.POST['formative'])
        course = Course.objects.get(id=request.POST['course'])
        duration = request.POST['time']        
        try:
            play = Play.objects.create(
                id_char="C{0}F{1}".format(course.id, formative.id),
                creation_play=timezone.now(),
                duration=timedelta(minutes=int(duration)),
                start_play=timezone.now(),
                limit_time=timedelta(hours=1),
                close_play=timezone.now() + timedelta(hours=1),
                is_active=1,
                formative=formative,
                course=course)

            play.id_char = "P{0}{1}".format(                    
                play.id,
                play.id_char)
            play.save()            
            data = {"redirect": "OK"}

        except Exception as e:
            print("Error: ", e)
            data = {"message": "Error: {0}".format(e)}

    return JsonResponse(data)




