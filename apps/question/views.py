from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponse
from django.utils import timezone

from play.settings import BASE_DIR
import base64, os
import xml.etree.ElementTree as ET
from io import BytesIO
from PIL import Image
import os, zlib, base64, zipfile, shutil
from apps.teacher.models import Teacher, Question, TeacherHasQuestion



@login_required
def create_choice(request):
    if request.method == "GET":
        return render(request, 'question/create_choice.html')
    else:
        if request.POST.get("extension", "") == "zip":
            response = save_zip(request, "Selección simple")
        else:
            response = save_question(request, "Selección simple")

        return JsonResponse(response)


def save_question(request, spanish_type):
    question_xml = request.POST.get("question", "")
    title = request.POST.get("title", "")
    random = request.POST.get("number", "")
    type_question = request.POST.get("type", "")
    extension = request.POST.get("extension", "")

    response = {}
    try:
        question = Question.objects.create(
            title=title,
            type=type_question,
            spanish_type=spanish_type,
            creation_date=timezone.now(),
            share=0,
            extension=extension)

        code = str(hex(zlib.crc32(bytes(question.id))))[2:]
        question.code = code
        question.url = "preguntas/{0}.{1}".format(code, extension)
        question.save()

        thq = TeacherHasQuestion.objects.create(
            teacher=request.user.teacher, 
            question=question,
            incorporation_date=question.creation_date,
            deleted=0)

        file = open(question.url, "w")
        file.write(question_xml)
        file.close()    

        response["result"] = "success"
        return response
    except Exception as e:
        print("Error: {0}".format(e))
        response["result"] = "fail"
        return response


def save_zip(request, spanish_type):
    question_xml = request.POST.get("question", "")
    imsmanifest_xml = request.POST.get("imsmanifest", "")
    title = request.POST.get("title", "")
    random = request.POST.get("number", "")
    type_question = request.POST.get("type", "")
    extension = request.POST.get("extension", "")
    name_image = request.POST.get("name_image", "")

    response = {}
    try:
        question = Question.objects.create(
            title=title,
            type=type_question,
            spanish_type=spanish_type,
            creation_date=timezone.now(),
            share=0,
            extension=extension)

        code = str(hex(zlib.crc32(bytes(question.id))))[2:]
        question.code = code
        question.url = "preguntas/{0}.{1}".format(code, extension)
        question.save()

        thq = TeacherHasQuestion.objects.create(
            teacher=request.user.teacher, 
            question=question,
            incorporation_date=question.creation_date,
            deleted=0)

        os.makedirs("preguntas/{0}".format(code))
        os.makedirs("preguntas/{0}/images".format(code))
        file = open(BASE_DIR+"/preguntas/{0}/archivo.xml".format(code), "w")
        file.write(question_xml)
        file.close()
        file = open(BASE_DIR+"/preguntas/{0}/imsmanifest.xml".format(code), "w")
        file.write(imsmanifest_xml)
        file.close()
                
        #print((request.POST['image'].partition('base64,')[2]))
        image = Image.open(BytesIO(base64.b64decode(request.POST['image'].partition('base64,')[2])))
        image.save("preguntas/{0}/images/{1}".format(code, name_image), image.format, quality = 100)

        zip_file = zipfile.ZipFile(question.url, "w")
 
        for folder, subfolders, files in os.walk("preguntas/{0}".format(code)):
            for file in files:                
                zip_file.write(os.path.join(folder, file), os.path.relpath(os.path.join(folder,file), "preguntas/{0}".format(code)), compress_type = zipfile.ZIP_DEFLATED)
 
        zip_file.close()

        #shutil.rmtree("preguntas/{0}/".format(code))

        response["result"] = "success"
        return response
    except Exception as e:
        print("Error: {0}".format(e))
        response["result"] = "fail"
        return response


def question_data(question):
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
            # Obtener archivo.xml
            # Obtener imsmanifest.xml
            try:
                fo = open(BASE_DIR+"/preguntas/"+question.code+"/archivo.xml", "r")
                archivo = fo.read()
                fo.close()
                fo = open(BASE_DIR+"/preguntas/"+question.code+"/imsmanifest.xml", "r")
                imsmanifest = fo.read()
                fo.close()                
            except Exception as e:
                print("Error:", e)
                data = {"result": "error", "message": "Error al obtener la pregunta. Cod.fo"}
                return data
            #print(archivo)
            data["archivo"] = archivo
            #print(imsmanifest)
            data["imsmanifest"] = imsmanifest            
            # Eliminar carpeta descomprimida
            #delete_folder(question.code)
        else:
            data = {"result": "error", "message": "Error al obtener la pregunta. Cod.zip"}
            return data
    # Si no es zip
    else:        
        # Obtener archivo.xml
        try:
            fo = open(BASE_DIR+"/"+question.url, "r")
            archivo = fo.read()
            fo.close()
        except Exception as e:
            print("Error:", e)
            data = {"result": "error", "message": "Error al obtener la pregunta. Cod.fo"}
            return data
        data["archivo"] = archivo
        data["imsmanifest"] = ""                
    # Enviar información
    return data


def decompress_zip(url, code, extension):
    print("DESCOMPRIMIENDO")    
    try:
        zf = zipfile.ZipFile(BASE_DIR+"/"+url, "r")
        for i in zf.namelist():
            zf.extract(i, path=BASE_DIR+"/preguntas/"+code+"/")
        zf.close()
        return True
    except Exception as e:
        print("Error decompress_zip:", e)
        return False