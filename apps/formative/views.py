from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import JsonResponse
from django.utils import timezone
from django.core import serializers
from datetime import timedelta
from django.core.exceptions import ObjectDoesNotExist

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
            #print(question.type)
            if question.type == "choice":
                q_question = manageXML.data_choice(question.code, question.extension)["itemBody"]["choiceInteraction"]["question"]
                questions.append({"question": q_question, "data": question})
            if question.type == "associate":
                q_question = manageXML.data_associate(question.code, question.extension)["itemBody"]["associateInteraction"]["question"]
                questions.append({"question": q_question, "data": question})
            if question.type == "entry":
                q_question = manageXML.data_entry(question.code, question.extension)["itemBody"]["question"]
                questions.append({"question": q_question, "data": question})
            if question.type == "slider":
                q_question = manageXML.data_slider(question.code, question.extension)["itemBody"]["sliderInteraction"]["question"]
                questions.append({"question": q_question, "data": question})
            if question.type == "order":
                q_question = manageXML.data_order(question.code, question.extension)["itemBody"]["orderInteraction"]["question"]
                questions.append({"question": q_question, "data": question})
            if question.type == "inline":
                q_question = manageXML.data_inline(question.code, question.extension)["itemBody"]["question"]
                questions.append({"question": q_question, "data": question})
        form = FormativeForm()
    return render(request, 'formative/create.html', {'form': form, 'questions': questions, 'title': 'Crear Evaluación'})


@login_required
def edit_formative(request, formative_id):
    formative = Formative.objects.get(id=formative_id)
    if request.method == 'GET':
        data_selected = formative.question.all().order_by('formativehasquestion__order')
        data = request.user.teacher.question.exclude(id__in=data_selected).order_by('teacherhasquestion__incorporation_date').reverse()
        questions = []
        for question in data:
            #print(question)
            if question.type == "choice":
                q_question = manageXML.data_choice(question.code, question.extension)["itemBody"]["choiceInteraction"]["question"]
                questions.append({"question": q_question, "data": question})
            if question.type == "associate":
                q_question = manageXML.data_associate(question.code, question.extension)["itemBody"]["associateInteraction"]["question"]
                questions.append({"question": q_question, "data": question})
            if question.type == "entry":
                q_question = manageXML.data_entry(question.code, question.extension)["itemBody"]["question"]
                questions.append({"question": q_question, "data": question})
            if question.type == "slider":
                q_question = manageXML.data_slider(question.code, question.extension)["itemBody"]["sliderInteraction"]["question"]
                questions.append({"question": q_question, "data": question})
            if question.type == "order":
                q_question = manageXML.data_order(question.code, question.extension)["itemBody"]["orderInteraction"]["question"]
                questions.append({"question": q_question, "data": question})
            if question.type == "inline":
                q_question = manageXML.data_inline(question.code, question.extension)["itemBody"]["question"]
                questions.append({"question": q_question, "data": question})
        question_selected = []
        for question in data_selected:
            if question.type == "choice":
                q_question = manageXML.data_choice(question.code, question.extension)["itemBody"]["choiceInteraction"]["question"]
                question_selected.append({"question": q_question, "data": question})
            if question.type == "associate":
                q_question = manageXML.data_associate(question.code, question.extension)["itemBody"]["associateInteraction"]["question"]
                question_selected.append({"question": q_question, "data": question})
            if question.type == "entry":
                q_question = manageXML.data_entry(question.code, question.extension)["itemBody"]["question"]
                question_selected.append({"question": q_question, "data": question})
            if question.type == "slider":
                q_question = manageXML.data_slider(question.code, question.extension)["itemBody"]["sliderInteraction"]["question"]
                question_selected.append({"question": q_question, "data": question})
            if question.type == "order":
                q_question = manageXML.data_order(question.code, question.extension)["itemBody"]["orderInteraction"]["question"]
                question_selected.append({"question": q_question, "data": question})
            if question.type == "inline":
                q_question = manageXML.data_inline(question.code, question.extension)["itemBody"]["question"]
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
    return render(request, 'formative/create.html', {'form': form, 'questions': questions, 'question_selected': question_selected, 'title': 'MAs Play - Editar Evaluación'})


@login_required
def start_formative(request):
    if request.method == "POST":
        formative = Formative.objects.get(id=request.POST['formative'])
        course = Course.objects.get(id=request.POST['course'])
        duration = request.POST['time']

        play_obj = Play.objects.all()
        #print(len(play_obj))
        if(len(play_obj) > 0 ):
            max_id = Play.objects.latest('id').id
        else:
            max_id = 0
        max_id = max_id + 1

        try:
            play = Play.objects.create(
                id_char="P{0}C{1}F{2}".format(max_id, course.id, formative.id),
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


@login_required
def delete_formative(request, formative_id):
  formatives = Formative.objects.filter(teacher=request.user.teacher)
  try:
    formative = Formative.objects.get(id=formative_id)
    formative.delete()
    return render(request, 'formative/index.html', {'formatives': formatives})
  except Exception as e:
    print(e)
    messages.add_message(request, messages.ERROR, str("No se puede eliminar la evaluación porque tiene preguntas asociadas."))
    return render(request, 'formative/index.html', {'formatives': formatives})