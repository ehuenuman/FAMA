var number=1;
var respuestas = [];    //array que contiene las respuestas
var puntuaciones = [];  //array que contiene las puntuaciones
var numero_fila;        //numero de filas 
var titulo;             //titulo de la pregunta
var pregunta;           //pregunta ingresada
var texto_alternativo;
var correcta;           //respuesta correcta
var ruta_pregunta;

//queremos que esta variable sea global
var fileExtension = "";
var nombre_foto   = "";
var random;
var formato;
var formData;
var result; //para el preview
var descargar     = false;
var opcion        = "visualizar";

var tipo_pregunta   = "";
var xml_archivo     = "";
var url_xml_archivo = "";
var xml_manifest    = "";
var url             = "";
var url_imagen      = "";
var extension       = "";
var opcion          = "";    //1 visualizar - 2 editar
var texto_antes     = "";
var texto_despues   = "";
var limite_inferior = "";
var limite_superior = "";
var salto           = "";

function extrear_datos_imsmanifest(){
  //console.log("3) procesando IMSMANIFEST ");
  var cantidad_item = $(xml_manifest).find('manifest resources resource file').length;
  //console.log("cantidad_item file xml_manifest: "+cantidad_item);
  var n = 0;
  if (cantidad_item!= 0 && xml_manifest!= '') {
    $(xml_manifest).find('manifest resources resource file').each(function() {
      ruta_contenido = $(this).attr('href');
      //console.log("ruta_contenido: "+ruta_contenido);
      if ((ruta_contenido != "") && (n == 0)) {
        url_xml_archivo = ruta_contenido;
        //console.log("url_xml_archivo: "+url_xml_archivo);
      }
      if ((ruta_contenido != "") && (n == 1)) {
        url_imagen = ruta_contenido;
        //console.log("url_imagen: "+url_imagen);
      }
      n++;
    });
  };
};

function extrear_datos_xml_choice(){

  //console.log("2) Procesando ARCHIVO XML ");

  $(xml_archivo).find('assessmentItem').each( function() {
    texto_titulo        = $(this).attr('title');
    texto_identificador = $(this).attr('identifier');
    respuesta_correcta  = $(xml_archivo).find('assessmentItem responseDeclaration correctResponse value').text();
    prompt              = $(xml_archivo).find('assessmentItem itemBody choiceInteraction prompt').text();
    texto_alternativo   = $(xml_archivo).find('assessmentItem itemBody p').text();

    /*
    console.log("titulo: "              +texto_titulo);
    console.log("tipo pregunta: "       +texto_identificador);
    console.log("respuesta correcta: "  +respuesta_correcta);
    console.log("pregunta/prompt: "     +prompt);
    console.log("texto_alternativo: "   +texto_alternativo);
    */

    var n = 0;
    alternativas = [];
    $(xml_archivo).find('assessmentItem itemBody choiceInteraction simpleChoice').each(function(){
      alternativas[n] = $(xml_archivo).find('assessmentItem itemBody choiceInteraction simpleChoice')[n].innerHTML;
      //console.log("alternativa nº"+n+" : "+alternativas[n]);
      n++;
    });

  });
};

/*#################################################################################################################
Unused Functions
 ##################################################################################################################*/

function extraer_datos_xml_inlinechoice(){

    console.log("2) procesando ARCHIVO XML ");

    $(xml_archivo).find('assessmentItem').each( function(){
        texto_titulo        = $(this).attr('title');
        texto_identificador = $(this).attr('identifier');
        respuesta_correcta  = $(xml_archivo).find('assessmentItem responseDeclaration correctResponse value').text();
        //prompt              = $(xml_archivo).find('assessmentItem itemBody orderInteraction prompt').text();
        texto_alternativo   = $(xml_archivo).find('assessmentItem itemBody p')[0].childNodes[0].textContent.trim();
        

        console.log("titulo: "              +texto_titulo);
        console.log("tipo pregunta: "       +texto_identificador);
        console.log("respuesta_correcta: "  +respuesta_correcta);
        console.log("texto_alternativo: "   +texto_alternativo );

        var n = 0;
        alternativas = [];          //alternativas desordenadas
        $(xml_archivo).find('assessmentItem itemBody blockquote inlineChoiceInteraction inlineChoice').each(function(){
            alternativas[n] = $(xml_archivo).find('assessmentItem itemBody blockquote inlineChoiceInteraction inlineChoice')[n].innerHTML;
            console.log("alternativa nº"+n+" : "+alternativas[n]);
            n++;
        });
        n = 0;
        $(xml_archivo).find('assessmentItem itemBody p').each(function(){
            if (n==1 && extension == 'xml') {
                texto_antes = $(xml_archivo).find('assessmentItem itemBody p')[n].childNodes[0].textContent.trim();
                texto_despues = $(xml_archivo).find('assessmentItem itemBody p')[n].childNodes[2].textContent.trim();
            }
            if (n==2) {
                texto_antes = $(xml_archivo).find('assessmentItem itemBody p')[n].childNodes[0].textContent.trim();
                texto_despues = $(xml_archivo).find('assessmentItem itemBody p')[n].childNodes[2].textContent.trim();
            };
            n++;
        });
        console.log("texto_antes: "+texto_antes);
        console.log("texto_despues: "+texto_despues);

    });
};

function extraer_datos_xml_textentry(){

    console.log("2) procesando ARCHIVO XML ");

    $(xml_archivo).find('assessmentItem').each( function(){
        texto_titulo        = $(this).attr('title');
        texto_identificador = $(this).attr('identifier');
        respuesta_correcta  = $(xml_archivo).find('assessmentItem responseDeclaration correctResponse value').text();
        //prompt              = $(xml_archivo).find('assessmentItem itemBody orderInteraction prompt').text();
        texto_alternativo   = $(xml_archivo).find('assessmentItem itemBody p')[0].childNodes[0].textContent.trim();
        

        console.log("titulo: "              +texto_titulo);
        console.log("tipo pregunta: "       +texto_identificador);
        console.log("respuesta_correcta: "  +respuesta_correcta);
        console.log("texto_alternativo: "   +texto_alternativo );

        n = 0;
        $(xml_archivo).find('assessmentItem itemBody p').each(function(){
            if (n==1 && extension == 'xml') {
                texto_antes = $(xml_archivo).find('assessmentItem itemBody p')[n].childNodes[0].textContent.trim();
                texto_despues = $(xml_archivo).find('assessmentItem itemBody p')[n].childNodes[2].textContent.trim();
            }
            if (n==2 && extension == 'zip') {
                texto_antes = $(xml_archivo).find('assessmentItem itemBody p')[n].childNodes[0].textContent.trim();
                texto_despues = $(xml_archivo).find('assessmentItem itemBody p')[n].childNodes[2].textContent.trim();
            }
            n++;
        });
        console.log("texto_antes: "+texto_antes);
        console.log("texto_despues: "+texto_despues);

    });
};


function extraer_datos_xml_slider(){

    console.log("2) procesando ARCHIVO XML ");

    $(xml_archivo).find('assessmentItem').each( function(){
        texto_titulo        = $(this).attr('title');
        texto_identificador = $(this).attr('identifier');
        respuesta_correcta  = $(xml_archivo).find('assessmentItem responseDeclaration correctResponse value').text();
        prompt              = $(xml_archivo).find('assessmentItem itemBody sliderInteraction prompt').text();
        texto_alternativo   = $(xml_archivo).find('assessmentItem itemBody p').text();


        console.log("titulo: "              +texto_titulo);
        console.log("tipo pregunta: "       +texto_identificador);
        console.log("respuesta correcta: "  +respuesta_correcta);
        console.log("pregunta/prompt: "     +prompt);
        console.log("texto_alternativo: "   +texto_alternativo);

        $(xml_archivo).find('assessmentItem itemBody sliderInteraction').each(function(){
            limite_inferior = $(this).attr('lowerBound');
            limite_superior = $(this).attr('upperBound');
            salto = $(this).attr('step');
        });
        console.log("limite_inferior: "+limite_inferior);
        console.log("limite_superior: "+limite_superior);
        console.log("salto: "+salto);

    });
};


function extraer_datos_xml_associate(){

    console.log("2) procesando ARCHIVO XML ");

    $(xml_archivo).find('assessmentItem').each( function(){
        texto_titulo        = $(this).attr('title');
        texto_identificador = $(this).attr('identifier');
        //respuesta_correcta  = $(xml_archivo).find('assessmentItem responseDeclaration correctResponse value').text();
        prompt              = $(xml_archivo).find('assessmentItem itemBody associateInteraction prompt').text();
        texto_alternativo   = $(xml_archivo).find('assessmentItem itemBody p').text();


        console.log("titulo: "              +texto_titulo);
        console.log("tipo pregunta: "       +texto_identificador);
        //console.log("respuesta correcta: "  +respuesta_correcta);
        console.log("pregunta/prompt: "     +prompt);
        console.log("texto_alternativo: "   +texto_alternativo);


        var n = 0;
        alternativas = [];
        $(xml_archivo).find('assessmentItem itemBody associateInteraction simpleAssociableChoice').each(function(){
            alternativas[n] = $(xml_archivo).find('assessmentItem itemBody associateInteraction simpleAssociableChoice')[n].innerHTML;
            console.log("alternativa nº"+n+" : "+alternativas[n]);
            n++;
        });

    });
};

function extraer_datos_xml_hotspot(){

    console.log("2) procesando ARCHIVO XML ");

    $(xml_archivo).find('assessmentItem').each( function(){
        texto_titulo        = $(this).attr('title');
        texto_identificador = $(this).attr('identifier');
        respuesta_correcta  = $(xml_archivo).find('assessmentItem responseDeclaration correctResponse value').text();
        prompt              = $(xml_archivo).find('assessmentItem itemBody hotspotInteraction prompt').text();
        texto_alternativo   = $(xml_archivo).find('assessmentItem itemBody p').text();


        console.log("titulo: "              +texto_titulo);
        console.log("tipo pregunta: "       +texto_identificador);
        console.log("respuesta correcta: "  +respuesta_correcta);
        console.log("pregunta/prompt: "     +prompt);
        console.log("texto_alternativo: "   +texto_alternativo);

        var n = 0;
        alternativas_x = [];
        alternativas_y = [];

        var_width  = $(xml_archivo).find('object').attr('width');
        var_height = $(xml_archivo).find('object').attr('height');

        $(xml_archivo).find('hotspotChoice').each( function(){
            //console.log($(this).attr("coords"));
            aux = $(this).attr("coords");
            aux_x = aux.indexOf(",");
            alternativas_x[n] = parseInt(aux.substring(0,aux_x)) ;
            alternativas_y[n] = parseInt(aux.substring(aux_x+1,aux.length));
            console.log("alternativa nº"+n+" : "+alternativas_x[n]+","+alternativas_y[n]);
            n++;
        });

    });
};

function extraer_datos_xml_order(){

    console.log("2) procesando ARCHIVO XML ");

    $(xml_archivo).find('assessmentItem').each( function(){
        texto_titulo        = $(this).attr('title');
        texto_identificador = $(this).attr('identifier');
        prompt              = $(xml_archivo).find('assessmentItem itemBody orderInteraction prompt').text();
        texto_alternativo   = $(xml_archivo).find('assessmentItem itemBody p').text();
        

        console.log("titulo: "              +texto_titulo);
        console.log("tipo pregunta: "       +texto_identificador);
        console.log("pregunta/prompt: "     +prompt);
        console.log("texto_alternativo: "   +texto_alternativo);

        var n = 0;
        alternativas_correctas = []; //orden correcto de alternativas
        $(xml_archivo).find('assessmentItem responseDeclaration correctResponse value').each(function(){
            alternativas_correctas[n] = $(xml_archivo).find('assessmentItem responseDeclaration correctResponse value')[n].innerHTML;
            console.log("alternativas_correctas nº"+n+" : "+alternativas_correctas[n]);
            n++;
        });

        var n = 0;
        alternativas = [];          //alternativas desordenadas
        $(xml_archivo).find('assessmentItem itemBody orderInteraction simpleChoice').each(function(){
            alternativas[n] = $(xml_archivo).find('assessmentItem itemBody orderInteraction simpleChoice')[n].innerHTML;
            console.log("alternativa nº"+n+" : "+alternativas[n]);
            n++;
        });

    });
};

function eliminar_carpeta_zip() {
  if(extension == "zip") {
    $.ajax({
      url:"/delete-folder",
      type: "POST",
      headers: {'X-CSRFToken': Cookies.get('csrftoken')},
      data: {code: codigo},
      dataType: "json",
    })
    .done(function(data) {
      //console.log("Eliminar carpeta: "+data.status);
      resetear_variables();
    })
    .fail(function() {
      //console.log("Error al eliminar la carpeta")
    });
  }
};

function resetear_variables(){
  opcion = "";
  tipo_pregunta = "";
  xml_archivo = "";
  url_xml_archivo = "";
  xml_manifest = "";
  url = "";
  url_imagen = "";
  extension ="";
  texto_alternativo = "";
  prompt = "";
  texto_antes= "";
  texto_despues = "";
  limite_superior = "";
  limite_inferior = "";
  salto = "";
};
