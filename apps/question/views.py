from __future__ import unicode_literals
from django.utils.encoding import smart_text
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponse
from django.utils import timezone

from play.settings import BASE_DIR
from io import BytesIO
from PIL import Image
import os, zlib, base64, zipfile, shutil
from apps.teacher.models import Teacher, Question, TeacherHasQuestion
import apps.question.manageXML as manageXML


@login_required
def create_choice(request):
    """Create simple choice interaction."""
    if request.method == "GET":
        return render(request, 'question/create_choice.html')
    else:
        if request.POST.get("extension", "") == "zip":
            response = save_zip(request, "Alternativas")
        else:
            response = save_question(request, "Alternativas")

        return JsonResponse(response)

@login_required
def create_order(request):
    """Create simple order interaction."""
    if request.method == "GET":
        return render(request, 'question/create_order.html')
    else:
        if request.POST.get("extension", "") == "zip":
            response = save_zip(request, "Selección ordenamiento")
        else:
            response = save_question(request, "Selección ordenamiento")

        return JsonResponse(response)

@login_required
def create_inlinechoice(request):
    """Create simple inline choice interaction."""
    if request.method == "GET":
        return render(request, 'question/create_inlinechoice.html')
    else:
        if request.POST.get("extension", "") == "zip":
            response = save_zip(request, "Selección entre lineas")
        else:
            response = save_question(request, "Selección entre lineas")

        return JsonResponse(response)

@login_required
def create_textentry(request):
    """Create simple textentry interaction."""
    if request.method == "GET":
        return render(request, 'question/create_textentry.html')
    else:
        if request.POST.get("extension", "") == "zip":
            response = save_zip(request, "Completar texto")
        else:
            response = save_question(request, "Completar texto")

        return JsonResponse(response)

@login_required
def create_slider(request):
    """Create simple slider interaction."""
    if request.method == "GET":
        return render(request, 'question/create_slider.html')
    else:
        if request.POST.get("extension", "") == "zip":
            response = save_zip(request, "Deslizador")
        else:
            response = save_question(request, "Deslizador")

        return JsonResponse(response)

@login_required
def create_associate(request):
    """Create simple associate interaction."""
    if request.method == "GET":
        return render(request, 'question/create_associate.html')
    else:
        if request.POST.get("extension", "") == "zip":
            response = save_zip(request, "Términos pareados")
        else:
            response = save_question(request, "Términos pareados")

        return JsonResponse(response)

@login_required
def create_hotspot(request):
    """Create simple associate interaction."""
    if request.method == "GET":
        return render(request, 'question/create_hotspot.html')
    else:
        if request.POST.get("extension", "") == "zip":
            response = save_zip(request, "Puntos seleccionables")
        else:
            response = save_question(request, "Puntos seleccionables")

        return JsonResponse(response)

@login_required
def edit_choice(request, question_id):
    """Edit simple choice interaction."""
    #questions = []
    if request.method == "GET":
        question = Question.objects.get(id = question_id)
        if (question.type == "choice"):
            q_question = manageXML.data_choice(question.code, question.extension)
            #questions.append({"question": q_question, "data": question})
            return render(request, 'question/edit_choice.html',{'questions': q_question})
        if (question.type == "order"):
            q_question = manageXML.data_order(question.code, question.extension)
            #questions.append({"question": q_question, "data": question})
            return render(request, 'question/edit_order.html',{'questions': q_question})
        if (question.type == "inline"):
            q_question = manageXML.data_inline(question.code, question.extension)
            #questions.append({"question": q_question, "data": question})
            return render(request, 'question/edit_inlinechoice.html',{'questions': q_question})
        if (question.type == "entry"):
            q_question = manageXML.data_entry(question.code, question.extension)
            #questions.append({"question": q_question, "data": question})
            return render(request, 'question/edit_textentry.html',{'questions': q_question})
        if (question.type == "slider"):
            q_question = manageXML.data_slider(question.code, question.extension)
            #questions.append({"question": q_question, "data": question})
            return render(request, 'question/edit_slider.html',{'questions': q_question})
        if (question.type == "associate"):
            q_question = manageXML.data_associate(question.code, question.extension)
            #questions.append({"question": q_question, "data": question})
            return render(request, 'question/edit_associate.html',{'questions': q_question})
    else:
        if request.POST.get("extension", "") == "zip":
            question = Question.objects.get(id = question_id)
            if (question.type == "choice"):
                response = editSave_zip(request, "Alternativas",question_id)
            if (question.type == "order"):
                response = editSave_zip(request, "Selección ordenamiento",question_id)
            if (question.type == "inline"):
                response = editSave_zip(request, "Completar texto",question_id)
            if (question.type == "entry"):
                response = editSave_zip(request, "Texto entre líneas",question_id)
            if (question.type == "slider"):
                response = editSave_zip(request, "Deslizador",question_id)
            if (question.type == "associate"):
                response = editSave_zip(request, "Términos pareados",question_id)
        else:
            question = Question.objects.get(id = question_id)
            if (question.type == "choice"):
                response = editSave_question(request, "Alternativas",question_id)
            if (question.type == "order"):
                response = editSave_question(request, "Selección ordenamiento",question_id)
            if (question.type == "inline"):
                response = editSave_question(request, "Completar texto",question_id)
            if (question.type == "entry"):
                response = editSave_question(request, "Texto entre líneas",question_id)
            if (question.type == "slider"):
                response = editSave_question(request, "Deslizador",question_id)
            if (question.type == "associate"):
                response = editSave_question(request, "Términos pareados",question_id)
        return JsonResponse(response)
        

def editSave_question(request, spanish_type, question_id):
    """Save xml for interaction without image."""
    question_xml = request.POST.get("question", "")
    title = request.POST.get("title", "")
    correct = request.POST.get("correct", "")
    random = request.POST.get("number", "")
    type_question = request.POST.get("type", "")
    extension = request.POST.get("extension", "")

    response = {}
    try:
        q_code = Question.objects.get(id=question_id)
        code = q_code.code
        
        question_url = "preguntas/{0}.{1}".format(code, extension)
        #question.save()

        question = Question.objects.filter(id=question_id).update(
            title=title,
            type=type_question,
            spanish_type=spanish_type,
            correct="alternativa{0}".format(correct),
            creation_date=timezone.now(),
            share=0,
            code=code,
            url=question_url,
            extension=extension)

        file = open(BASE_DIR+"/"+question_url, "w")
        file.write(question_xml)
        file.close()    

        response["result"] = "success"
        return response
    except Exception as e:
        print("Error: {0}".format(e))
        response["result"] = "Error: {0}".format(e)
        return response

def save_question(request, spanish_type):
    """Save xml for interaction without image."""
    question_xml = request.POST.get("question", "")
    title = request.POST.get("title", "")
    correct = request.POST.get("correct", "")
    random = request.POST.get("number", "")
    type_question = request.POST.get("type", "")
    extension = request.POST.get("extension", "")

    response = {}
    try:
        question = Question.objects.create(
            title=title,
            type=type_question,
            spanish_type=spanish_type,
            correct="alternativa{0}".format(correct),
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
            incorporation_date=timezone.now(),
            deleted=0)

        file = open(BASE_DIR+"/"+question.url, "w")
        file.write(question_xml)
        file.close()    

        response["result"] = "success"
        return response
    except Exception as e:
        print("Error: {0}".format(e))
        response["result"] = "Error: {0}".format(e)
        return response


def save_zip(request, spanish_type):
    """Create folder with imsmanifest and interaction.
    Only work with folder, not create the zip file."""
    question_xml = request.POST.get("question", "")
    imsmanifest_xml = request.POST.get("imsmanifest", "")
    title = request.POST.get("title", "")
    correct = request.POST.get("correct", "")
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
            correct="alternativa{0}".format(correct),
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

        os.makedirs(BASE_DIR+"/preguntas/{0}".format(code))
        os.makedirs(BASE_DIR+"/preguntas/{0}/images".format(code))
        file = open(BASE_DIR+"/preguntas/{0}/{0}.xml".format(code), "w")
        file.write(question_xml)
        file.close()
        file = open(BASE_DIR+"/preguntas/{0}/imsmanifest.xml".format(code), "w")
        file.write(imsmanifest_xml)
        file.close()
                
        #print((request.POST['image'].partition('base64,')[2]))
        image = Image.open(BytesIO(base64.b64decode(request.POST['image'].partition('base64,')[2])))
        image.save(BASE_DIR+"/preguntas/{0}/images/{1}".format(code, name_image), image.format, quality = 100)

        #zip_file = zipfile.ZipFile(BASE_DIR+"/"+question.url, "w")
 
        #for folder, subfolders, files in os.walk(BASE_DIR+"/preguntas/{0}".format(code)):
        #    for file in files:                
        #        zip_file.write(os.path.join(folder, file), os.path.relpath(os.path.join(folder,file), BASE_DIR+"/preguntas/{0}".format(code)), compress_type = zipfile.ZIP_DEFLATED)
 
        #zip_file.close()

        #shutil.rmtree("preguntas/{0}/".format(code))

        response["result"] = "success"
        return response
    except Exception as e:
        print("Error: {0}".format(e))
        response["result"] = "Error: {0}".format(e)
        return response


def editSave_zip(request, spanish_type,question_id):
    """Create folder with imsmanifest and interaction.
    Only work with folder, not create the zip file."""
    question_xml = request.POST.get("question", "")
    imsmanifest_xml = request.POST.get("imsmanifest", "")
    title = request.POST.get("title", "")
    correct = request.POST.get("correct", "")
    random = request.POST.get("number", "")
    type_question = request.POST.get("type", "")
    extension = request.POST.get("extension", "")
    name_image = request.POST.get("name_image", "")

    response = {}
    try:
        q_code = Question.objects.get(id=question_id)
        code = q_code.code
        
        question_url = "preguntas/{0}.{1}".format(code, extension)
        #question.save()

        question = Question.objects.filter(id=question_id).update(
            title=title,
            type=type_question,
            spanish_type=spanish_type,
            correct="alternativa{0}".format(correct),
            creation_date=timezone.now(),
            share=0,
            code=code,
            url=question_url,
            extension=extension)

        shutil.rmtree(BASE_DIR+"/preguntas/"+code+"/")

        os.makedirs(BASE_DIR+"/preguntas/{0}".format(code))
        os.makedirs(BASE_DIR+"/preguntas/{0}/images".format(code))
        file = open(BASE_DIR+"/preguntas/{0}/{0}.xml".format(code), "w")
        file.write(question_xml)
        file.close()
        file = open(BASE_DIR+"/preguntas/{0}/imsmanifest.xml".format(code), "w")
        file.write(imsmanifest_xml)
        file.close()
                
        #print((request.POST['image'].partition('base64,')[2]))
        image = Image.open(BytesIO(base64.b64decode(request.POST['image'].partition('base64,')[2])))
        image.save(BASE_DIR+"/preguntas/{0}/images/{1}".format(code, name_image), image.format, quality = 100)

        response["result"] = "success"
        return response
    except Exception as e:
        print("Error: {0}".format(e))
        response["result"] = "Error: {0}".format(e)
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
                fo = open(BASE_DIR+"/preguntas/"+question.code+"/"+question.code+".xml", "r")
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
