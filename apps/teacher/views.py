from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.utils import timezone

from apps.course.models import Course
from apps.formative.models import Formative
from apps.teacher.models import Teacher, Question, TeacherHasQuestion

import zipfile, shutil


@login_required
def index(request):
    user = request.user
    courses = Course.objects.filter(teacher=user.teacher).order_by('id').reverse()[:5]
    total_course = Course.objects.filter(teacher=user.teacher).count()
    formatives = Formative.objects.filter(teacher=user.teacher)[:5]
    total_formatives = Formative.objects.filter(teacher=user.teacher).count()
    return render(request,'teacher/home.html', {
        'user': user, 
        'courses': courses, 
        'total_course': total_course,
        'formatives': formatives ,
        'total_formatives': total_formatives
        })


@login_required
def view_questions(request):
    user = request.user.teacher
    questions = user.question.filter(teacherhasquestion__deleted=0)

    return render(request, 'teacher/questions.html', {'questions': questions})


@login_required
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
def add_question(request):
    if request.method == "GET":
        return render(request, "teacher/add_question.html")
    else:
        shared_code = request.POST.get("shared_code", "")

        try:
            question = Question.objects.get(code = shared_code)
        except Exception as e:
            data = {"result": "error", "message": "C&oacute;digo erroneo"}
            return JsonResponse(data)

        if question.share == 0:     # Dont Shared
            data = {"result": "error", "message": "Pregunta se encuentra privada"}
            return JsonResponse(data)
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
                return JsonResponse(data)
            else:
                print("VISUALIZAR")
                # Obtener datos pregunta
                data = {
                    "result": "success",
                    "url": question.url,
                    "type": question.type,
                    "extension": question.extension,
                    "code": question.code}
                # Si es zip
                if question.extension == "zip":
                    # Descomprimir
                    success = decompress_zip(
                        question.url, 
                        question.code, 
                        question.extension)
                    #print(success)
                    if success:
                        print("LEER XML")
                        # Obtener archivo.xml
                        # Obtener imsmanifest.xml
                        try:
                            fo = open("preguntas/"+question.code+"/archivo.xml")
                            archivo = fo.read()
                            fo.close()
                            fo = open("preguntas/"+question.code+"/imsmanifest.xml")
                            imsmanifest = fo.read()
                            fo.close()
                        except Exception as e:
                            data = {"result": "error", "message": "Error al obtener la pregunta. Cod.fo"}
                            return JsonResponse(data)
                        #print(archivo)
                        data["archivo"] = archivo
                        #print(imsmanifest)
                        data["imsmanifest"] = imsmanifest                        
                        # Eliminar carpeta descomprimida
                        #delete_folder(question.code)
                    else:
                        data = {"result": "error", "message": "Error al obtener la pregunta. Cod.zip"}
                        return JsonResponse(data)
                # Si no es zip
                else:
                    print("LEER XML")
                    # Obtener archivo.xml
                    try:
                        fo = open("preguntas/"+question.code+".xml")
                        archivo = fo.read()
                        fo.close()
                    except Exception as e:
                        data = {"result": "error", "message": "Error al obtener la pregunta. Cod.fo"}
                        return JsonResponse(data)
                    data["archivo"] = archivo
                    data["imsmanifest"] = ""                
                # Enviar información
                return JsonResponse(data)


def decompress_zip(url, code, extension):
    print("DESCOMPRIMIENDO")
    try:
        zf = zipfile.ZipFile(url, "r")
        for i in zf.namelist():
            zf.extract(i, path="preguntas/"+code+"/")
        return True
    except Exception as e:
        return False


@login_required
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





