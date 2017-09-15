from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required, user_passes_test
from django.http import JsonResponse, HttpResponse
from django.utils import timezone

from play.settings import BASE_DIR
from apps.login.views import teacher_check
from apps.question.views import question_data
from apps.course.models import Course
from apps.formative.models import Formative
from apps.play.models import Play
from apps.teacher.models import Teacher, Question, TeacherHasQuestion

import zipfile, shutil


@login_required
def index(request):
    if teacher_check(request.user):
        user = request.user
        courses = Course.objects.filter(teacher=user.teacher).order_by('id').reverse()[:5]
        total_course = Course.objects.filter(teacher=user.teacher).count()
        formatives = Formative.objects.filter(teacher=user.teacher)[:5]
        total_formatives = Formative.objects.filter(teacher=user.teacher).count()
        active_plays = Play.objects.filter(formative__teacher=user.teacher, is_active=1)
        closed_plays = Play.objects.filter(formative__teacher=user.teacher, is_active=0).order_by('close_play').reverse()[:3]
        return render(request,'teacher/home.html', {
            'user': user, 
            'courses': courses, 
            'total_course': total_course,
            'formatives': formatives,
            'total_formatives': total_formatives,
            'active_plays': active_plays,
            'closed_plays': closed_plays,
            })
    else:
        return redirect('student:home')


@login_required
@user_passes_test(teacher_check)
def view_questions(request):
    if request.method == "GET":
        user = request.user.teacher
        questions = user.question.filter(teacherhasquestion__deleted=0).order_by('-teacherhasquestion__incorporation_date').extra(select={'incorporation_date': 'teacher_has_question.incorporation_date'})
        #questions = TeacherHasQuestion.objects.filter(deleted=0, teacher=user).order_by('-incorporation_date').select_related('question')
        #print(questions.query)
        return render(request, 'teacher/questions.html', {'questions': questions})
    else:
        id_question = request.POST.get("id_question", "")
        if request.POST.get("action", "") == "preview":
            try:
                question = Question.objects.get(id = id_question)
                data = question_data(question)
                return JsonResponse(data)
            except Exception as e:
                print("Error:", e)
                data = {"result": "error", "message": "Error al obtener la pregunta"}
                return JsonResponse(data)

@login_required
@user_passes_test(teacher_check)
def share_question(request, question_id):
    if request.method == 'POST':
        question = Question.objects.get(id = question_id)

        if question.share == 1:   # Shared
            question.share = 0    # Stop share
            data = {'code': "dontshare"}
        else:
            question.share = 1    # Start share
            data = {'code': question.code}

        question.save()
    return JsonResponse(data)


@login_required
@user_passes_test(teacher_check)
def download_question(request, question_id=None):
    #Se puede mejorar poniendo data-url en html
    print("DESCARGAR PREGUNTA")
    if request.method == "POST":
        question_id = request.POST.get("id_question", "")
        try:
            question = Question.objects.get(id = question_id)
            if question.extension == "zip":
                print("DESCARGAR PREGUNTA ZIP")
                #zf = zipfile.ZipFile(question.url, "r", zipfile.ZIP_DEFLATED)                
                fo = open(BASE_DIR+"/"+question.url, "rb")
                zf = fo.read()
                print(str(zf)[1:])
                fo.close()                
                response = HttpResponse(str(zf)[1:], content_type="application/zip")
                response['Content-Disposition'] = 'attachment; filename="'+question.code+'.zip"'
                response['Content-Size'] = len(zf)
                response['Name'] = question.code+".zip"
                return response            
            else:
                print("DESCARGAR PREGUNTA XML")
                fo = open(BASE_DIR+"/"+question.url, "r")
                xml_file = fo.read()
                fo.close()
                response = HttpResponse(xml_file, content_type="text/xml")
                response['Content-Disposition'] = 'attachment; filename="'+question.code+'.xml"'
                response['Name'] = question.code+".xml"
                return response
        except Exception as e:
            data = {"result": "error", "message": "Error al obtener la pregunta"}
            print("Error: {0}".format(e))
            return JsonResponse(data)
    else:
        try:
            question = Question.objects.get(id = question_id)
            fo = open(BASE_DIR+"/"+question.url, "rb")
            zf = fo.read()        
            fo.close()                
            response = HttpResponse(zf, content_type="application/zip")
            response['Content-Disposition'] = 'attachment; filename="'+question.code+'.zip"'
            response['Content-Size'] = len(zf)
            response['Name'] = question.code+".zip"
            return response        
        except Exception as e:
            data = {"result": "error", "message": "Error al obtener la pregunta"}
            print("Error: {0}".format(e))
            return JsonResponse(data)


@login_required
@user_passes_test(teacher_check)
def add_question(request):
    if request.method == "GET":
        return render(request, "teacher/add_question.html")
    else:
        shared_code = request.POST.get("shared_code", "")

        try:
            question = Question.objects.get(code = shared_code)
        except Exception as e:
            data = {"result": "error", "message": "C\u00F3digo erroneo"}
            return JsonResponse(data)

        if question.share == 0:     # Dont Shared
            data = {"result": "error", "message": "Pregunta se encuentra privada"}            
        else:
            if request.POST.get("action", "") == "save":
                print("GUARDAR")
                user = request.user.teacher
                TeacherHasQuestion.objects.create(
                    teacher=user,
                    question=question,
                    incorporation_date=timezone.now(),
                    deleted=0)
                data = {"result": "success", "message": "Pregunta agregada"}
            else:
                print("VISUALIZAR")
                data = question_data(question)
        return JsonResponse(data)


@login_required
@user_passes_test(teacher_check)
def delete_folder(request):
    data = {}
    if request.method == "POST":
        code = request.POST.get("code", "")
        print("ELIMINANDO CARPETA")
        try:
            shutil.rmtree("preguntas/"+code+"/")
            data["status"] = "success"
            return JsonResponse(data)
        except Exception as e:
            print("Error al eliminar la carpeta {0}. Error: {1}".format("preguntas/"+code+"/", e))
            data["status"] = "fail"
            return JsonResponse(data)


