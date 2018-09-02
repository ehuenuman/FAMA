from xml.dom import minidom
import xml.etree.ElementTree as ET

from play.settings import BASE_DIR

namespace = {"ns1": "http://www.imsglobal.org/xsd/imsqti_v2p1",
             "ns2": "http://www.w3.org/2001/XMLSchema-instance",
             "ns3": "http://www.imsglobal.org/xsd/imsqti_v2p1  http://www.imsglobal.org/xsd/qti/qtiv2p1/imsqti_v2p1.xsd"}


def data_choice(code, extension="xml"):
    """Get data from choice xml and return this on a dict"""
    file_data = {}
    
    if extension == "xml":
        root = ET.parse(BASE_DIR+"/preguntas/{0}.xml".format(code))
    else:
        root = ET.parse(BASE_DIR+"/preguntas/{0}/{0}.xml".format(code))

    file_data["code"] = code
    #Atributos raiz
    file_data["assessmentItem"] = root.getroot().attrib
    #Atributos responseDeclaration
    file_data["responseDeclaration"] = root.find(".//ns1:responseDeclaration", namespace).attrib
    #Alternativa correcta
    file_data["responseDeclaration"]["correctResponse"] = root.find(".//ns1:responseDeclaration/ns1:correctResponse/ns1:value", namespace).text
    #Atributos itemBody
    file_data["itemBody"] = root.find(".//ns1:itemBody", namespace).attrib
    try:
        #Texto alternativo
        file_data["itemBody"]["alternativeText"] = root.find(".//ns1:itemBody/ns1:p", namespace).text
    except:
        pass
    if extension == "zip":
        #Imagen
        file_data["itemBody"]["img"] = root.find(".//ns1:p/ns1:img", namespace).attrib
    #Atributos choiceInteraction
    file_data["itemBody"]["choiceInteraction"] = root.find(".//ns1:choiceInteraction", namespace).attrib
    #Pregunta
    file_data["itemBody"]["choiceInteraction"]["question"] = root.find(".//ns1:choiceInteraction/ns1:prompt", namespace).text
    #Alternativas
    alternatives = []
    alternatives_xml = root.findall(".//ns1:choiceInteraction/ns1:simpleChoice", namespace)
    for i in alternatives_xml:
        i.attrib["alternative"] = i.text
        alternatives.append(i.attrib)

    file_data["itemBody"]["choiceInteraction"]["simpleChoice"] = alternatives

    #dict/json
    return file_data


