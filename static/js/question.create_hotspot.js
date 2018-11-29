var number              = 1;  //id row answers_table
var respuestas          = []; //array que contiene las respuestas
var puntuaciones        = []; //array que contiene las puntuaciones
var numero_fila;              //numero de filas 
var titulo;                   //titulo de la pregunta
var pregunta;                 //pregunta ingresada
var texto_alternativo;
var correcta;                 //respuesta correcta
var ruta_pregunta;

//queremos que esta variable sea global
var fileExtension   = "";
var nombre_foto     = "";
var random ;
var formato;
var formData;
var result;                   //para el preview
var descargar       = false;
var x = 0;
var y = 0;
var bandera_x;
var bandera_y;
var contador_puntos = 0;
var respuestas_top = [];
var respuestas_left = [];
var imagen_ancho;
var imagen_alto;


$(document).ready(function() {

  titulo = $(".titulo-choice").val();
  titulo = accentDecode(titulo);
  $(".titulo-choice")[0].value = titulo;

  pregunta = $(".pregunta-choice").val();
  pregunta = accentDecode(pregunta);
  $(".pregunta-choice")[0].value = pregunta;
        
  texto_alternativo = $(".texto_alternativo").val();
  texto_alternativo = accentDecode(texto_alternativo);
  $(".texto_alternativo")[0].value = texto_alternativo;
  
  if($("#imagen-desplegada img")[0] != undefined){
    imgSrc = $("#imagen-desplegada img")[0].src;
    var cadena = imgSrc,
    patron = "fama/pregunta/editar/",
    nuevoValor    = "preguntas/",
    url = cadena.replace(patron, nuevoValor);
    $("#imagen-desplegada img")[0].src = url;
  }
  
  random = Math.floor((Math.random() * 100000) + 1);
  //console.log(random);

  /* Form validate */
  $("form").submit(validate_form);

  $("button#save_question").click(function(){
    descargar = false;    
  });

  $("button#download_question").click(function(){
    descargar = true;    
  });

  /* Up and down alternatives/row */
  $(".up, .down").click(function() {
      var row = $(this).parents("tr:first");
      if ($(this).is(".up")) {
        row.insertBefore(row.prev());
      } else {
        row.insertAfter(row.next());
      }
  });    

  /* Delete alternative/row */
  $("button[data-action='delete-row']").click(function() {
    $("tr#"+this.id).hide('slow', function() {
      $("tr#"+this.id).remove();
    });
  });        

  /* Load image */
  $(':file').change(function(){         
    var file = $("#imagen")[0].files[0];
    //console.log("file");
    //console.log(file);
    formData = new FormData($("form")[0]);
    //console.log(formData);
    var fileSize = file.size;
    if (fileSize <= 1400000 ) {
      //console.log("menor de los 1400.0Kb, tamaño: "+fileSize/1000+"Kb"); 
      nombre_foto = file.name;
         
      var input_foto = $("#input_foto");
      $("#input_foto").replaceWith(input_foto.val(nombre_foto).clone(true));

      var reader = new FileReader();
      reader.onload = fileOnload;
      reader.readAsDataURL(file);
    } else {
      //console.log("mas de los 1400.0Kb, tamaño: "+fileSize/1000+"Kb");
      Materialize.toast('Imagen muy pesada', 4000, 'rounded');
      var input_foto = $("#input_foto");
      input_foto.replaceWith(input_foto.val('Tamaño máximo permitido: 1.4Mb').clone(true));;
          
      var control = $("#imagen");
      control.replaceWith( control = control.clone( true ) );

      nombre_foto = "";
    }
  });

  function fileOnload(e) {
    //console.log("cargo la imagen");
    result=e.target.result;
    //console.log("result: "+result);

    //$("#imagen-desplegada").append("<a id='eliminar_foto' class='btn-floating waves-effect waves-light btn-large btn-danger'><i class='fa fa-trash-o fa-2x' aria-hidden='true'></i></a>");
    
    $(".guardar-punto").prepend("<center>"
                   +"<button style='width:32%;height:auto;font-size:13px;display:inline-block;margin-bottom:10px;' class='waves-effect waves-light btn' id='guardar_punto' type='button'>Guardar punto</button>"
                   +" <button style='width:32%;height:auto;font-size:13px;display:inline-block;margin-bottom:10px;' class='waves-effect waves-light btn' id='eliminar_foto2' type='button'>Eliminar Imagen</button>"
                   +"</center>");

    $("#eliminar_foto2").click(function(){
            var input_foto = $("#input_foto");
            input_foto.replaceWith(input_foto.val('').clone(true));;
            nombre_foto = "";
            //console.log("dentro sucess,nombre_foto: "+nombre_foto);
            $("#imagen-desplegada").empty();//remueve div de la iamgen desplegada
            $("#imagen").prop( "disabled", false );
            $("#boton-imagen").css({background: "#26a69a" });
            $("#imagen").css({cursor: "pointer" }); 
            $('#imagen').val(''); //resetea el nombre que queda en el input para subir la misma si se quiere
            $(".guardar-punto").empty();
            $('#answers_table > tbody').empty();
            contador_puntos = 0;                   
    });

    $("#guardar_punto").click(function(){

      
      $("#imagen-desplegada").append("<div class='caja1' id='"+contador_puntos+"'><center><span style='position:relative;top:-2px;'>"+parseInt(contador_puntos+1)+"</span></center></div>");
      
      console.log("position mouse in page");
      console.log(event.pageX,event.pageY);
      console.log("position div");
      console.log($("#imagen-desplegada").position().left,$("#imagen-desplegada").position().top);
      console.log("position imagen");
      console.log($("#imagen-desplegada > img").position().left,$("#imagen-desplegada > img").position().top);
      console.log("tamaño imagen");
      console.log($("#imagen-desplegada > img").width(),$("#imagen-desplegada > img").height());

      left_x = Math.floor( $("#caja").position().left );
      top_x  = Math.floor( $("#caja").position().top );
      console.log("coordenadas caja al guardar: ");
      console.log("x: "+left_x+ ", " + "y: "+top_x);
      $("#"+contador_puntos+".caja1").offset({ left: left_x   , top: top_x });
      //console.log($("#"+contador_puntos+".caja1").offset());

      console.log("posición dentro de la imagen");
      bandera_x = Math.floor(event.pageX - $("#imagen-desplegada").position().left);
      bandera_y = Math.floor(event.pageY - $("#imagen-desplegada").position().top);
      console.log("x: "+bandera_x+ ", " + "y: "+bandera_y);

      var res_top =  Math.floor( $('#'+contador_puntos+".caja1").position().top - $("#imagen-desplegada").position().top );
      var res_left = Math.floor( $('#'+contador_puntos+".caja1").position().left - $("#imagen-desplegada").position().left );
      console.log("coordenadas que se guardan");
      console.log("x: "+res_left+ ", " + "y: "+res_top);      
      
      var agregar = "";
      agregar += '<tr id='+contador_puntos+'>';
      agregar += '<td style="padding: 0px;width:10px;"><input name="group1" type="radio" id=test'+contador_puntos+' name="radio" id='+contador_puntos+' class="check" /><label style="margin-top:5px;" for=test'+contador_puntos+'></label></td>';
      agregar += '<td style="padding: 0px 10px 0px 10px;width: 80%;"><input  type="text"      id='+contador_puntos+' class="respuesta" disabled></td>';
      agregar += '<td style="padding: 0px;"><i class="up fa fa-caret-up fa-3x" aria-hidden="true" id='+contador_puntos+'></i><i class="down fa fa-caret-down fa-3x" aria-hidden="true" id='+contador_puntos+'></i></td>';
      agregar += '<td style="padding: 0px;float:right;"><button class="eliminar waves-effect waves-light btn btn-danger" id='+contador_puntos+' type="button"><i class="fa fa-trash-o" aria-hidden="true"></i></button></td>';
      agregar += '</tr>';

      $('tbody').append(agregar);

      $("#"+contador_puntos+".eliminar").click(function(){ //para las filas que se crean desde jquery
        var id = this.id;
        //console.log("esta es la id de la fila: "+id);
        //console.log($("input"+"#"+id+".respuesta")[0].value);
        $("#"+id+".caja1").remove();
        $("#"+id).remove();
      });

      $("#"+contador_puntos+".up").click(function(){
        var row = $(this).parents("tr:first");
        if ($(this).is(".up")) {
          row.insertBefore(row.prev());
        }
      });
      
      $("#"+contador_puntos+".down").click(function(){
        var row = $(this).parents("tr:first");
        if ($(this).is(".down")) {
          row.insertAfter(row.next());
        }
      });
      
      $("#"+contador_puntos+".respuesta").val(contador_puntos+1);
      contador_puntos++;

    }); // fin boton guardar

    $("#imagen-desplegada").append("<div id='caja' ><img style='width:100%;' src='http://fama.gita.cl/images/icon_gps2.png' /></div>");
    $( "#imagen-desplegada" ).mousemove(function(event){
      x = event.pageX;
      y = event.pageY; 
    });
    
    $("#caja").draggable({containment:'#imagen-desplegada'});
    $("#imagen-desplegada").click(function(){
      //console.log("posición dentro de la imagen");
      bandera_x = Math.floor(event.pageX - $("#imagen-desplegada").position().left);
      bandera_y = Math.floor(event.pageY - $("#imagen-desplegada").position().top);
      //console.log("x: "+bandera_x+ ", " + "y: "+bandera_y);
      $("#caja").offset({ top:event.pageY-15  , left: event.pageX-15 });
      x = event.pageX;
      y = event.pageY;
    });

    $("#imagen-desplegada").append("<img style='top:-20px;position: relative;' src='"+result+"' width='350px'/>");
    $("#imagen").prop( "disabled", true );    
    $("#imagen").css({cursor: "not-allowed" }); 
  
  }// Fin carga imagen

  /* Fill modal preview */
  $("button[data-action='preview_question']").click(function(){ 
    titulo = $(".titulo-choice").val();
    pregunta = $(".pregunta-choice").val();
    texto_alternativo = $(".texto_alternativo").val();

    $("#content_preview").empty();
    $("#banner_preview h5.white-text").empty();
    $("#banner_preview h5.white-text").append('Puntos seleccionables');

    if (titulo!="") $("#content_preview").append('<span><b>Titulo: </b>'+titulo+'</span></br>');
    else $("#content_preview").append('<span><b>Titulo: </b>* No tiene t&iacute;tulo *</span></br>');

    if (texto_alternativo!="") $("#content_preview").append('<span><b>Texto alternativo: </b>'+texto_alternativo+'</span></br>');
    else $("#content_preview").append('<span><b>Texto alternativo: </b>* No tiene texto alternativo *</span></br>');

    if (nombre_foto!='') {
    	//console.log("/preguntas/"+result);
      $("#content_preview").append("<div id='imagen-desplegada-modal'  style='width:100%;height:auto;''></div>");
      //$("#content_preview").append("<center><img id='img-desplegada-modal' src='"+result+"' width='250px'/></center>");
      $("#imagen-desplegada-modal").append("<img id='img-desplegada-modal' src='"+result+"' width='100%'/>");
      
      inicio = 1;
      $('tbody tr').each(function () {
        var numero_id = $(this)[0].id;
        var res_top =  Math.floor( $('#'+numero_id+".caja1").position().top - $("#imagen-desplegada").position().top );
        var res_left = Math.floor( $('#'+numero_id+".caja1").position().left - $("#imagen-desplegada").position().left );
        $("#imagen-desplegada-modal").append("<div class='caja2' id='"+numero_id+"'><center><span style='position:relative;top:-2px;'>"+parseInt(numero_id)+"</span></center></div>");
        //$("#caja1").draggable({containment:'#imagen-desplegada-modal'});
        $("#"+numero_id+".caja2").offset({ left: res_left   , top: res_top });
        inicio++;

      });
    }

    if (pregunta!="") $("#content_preview").append('<span><b>Pregunta: </b>'+pregunta+'</span></br>');
    else $("#content_preview").append('<span><b>Pregunta: </b>* No tiene pregunta *</span></br>');

    $('#preview_modal').modal('open');    
  });

}); 


function validate_form(){    
  manage_question();
  return false;
} 

function manage_question() {
  //console.log("1) extrayendo los datos del formulario");
  titulo = $(".titulo-choice").val();
  var titulo2 = $(".titulo-choice").val();
  titulo = remplazarCaracteresEspeciales(titulo);

  pregunta = $(".pregunta-choice").val();
  pregunta = remplazarCaracteresEspeciales(pregunta);
      
  texto_alternativo = $(".texto_alternativo").val();
  texto_alternativo = remplazarCaracteresEspeciales(texto_alternativo);

  imagen_ancho = $("#imagen-desplegada > img").width();
  imagen_alto = $("#imagen-desplegada >img").height();
  console.log(imagen_ancho);
  console.log(imagen_alto);

  numero_fila = $('#answers_table>tbody>tr').length;  //cantidad de filas respuestas
  var inicio = 0;

  $('tbody tr').each(function () {
    var numero_id = $(this)[0].id;
    console.log("numero_id: "+numero_id);
    if($("#test"+numero_id+".check").is(':checked')) {  
      var estado = "activado";
      correcta = inicio;
      //console.log("correcta: "+correcta);
    } else {
      var estado = "desactivado";
    }
    var respuesta = remplazarCaracteresEspeciales($('#'+numero_id+'.respuesta').val());
    console.log(respuesta);
    var res_top =  Math.floor( $('#'+numero_id+".caja1").position().top - $("#imagen-desplegada").position().top );
    var res_left = Math.floor( $('#'+numero_id+".caja1").position().left - $("#imagen-desplegada").position().left );
    respuestas_top[inicio] = res_top;
    respuestas_left[inicio] = res_left;
    respuestas[inicio] = respuesta;
    inicio++;
  });

  console.log(respuestas);
  console.log(respuestas_top);
  console.log(respuestas_left); 
  
  var xml_question = crear_pregunta_xml();
  if (nombre_foto != "") {
    var xml_imsmanifest = crear_imsmanifest();
    if (descargar) {
      //console.log("DESCARGAR ZIP");
      var zip = new JSZip();
      zip.file("archivo.xml", xml_question);
      zip.file("imsmanifest.xml", xml_imsmanifest);
      var img = zip.folder("images");
      img.file(nombre_foto, result.split("base64,")[1], {base64: true});
      zip.generateAsync({type:"blob"})
      .then(function(content) {
          // see FileSaver.js
          saveAs(content, titulo+".zip");
      });
    } else {
      //console.log("GUARDAR ZIP");
      var data = {
        "question": xml_question,
        "imsmanifest": xml_imsmanifest,
        "title": titulo2,
        "number": random,
        "type": "hotspot",
        "extension": "zip",
        "image": result,
        "name_image": nombre_foto,
        "correct": correcta
      }
      send_question(data);
    }
  } else {
    if (descargar) {
      var xml_file = new File([xml_question], titulo+".xml", {type: "text/xml;charset=utf-8"});
      saveAs(xml_file);
    } else {      
      var data = {
        "question": xml_question,
        "title": titulo2,
        "number": random,
        "type": "hotspot",
        "extension": "xml",
        "correct": correcta
      }
      send_question(data);
    }
  }
};

function send_question(data) {
  $.ajax({
    type: "POST",
    url: document.location.pathname,
    headers: {'X-CSRFToken': Cookies.get('csrftoken')},
    data: data,
  })
  .done(function(data, textStatus, jqXHR) {
    if (data.result == "success") {
      Materialize.toast('Pregunta guardada con exito', 3000, 'rounded');
    } else {
    	console.log(data);
    	console.log(textStatus);
    	console.log(jqXHR);
      Materialize.toast('Error al guardar la pregunta', 3000, 'rounded');
    }
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    Materialize.toast('Un error a ocurrido. Intente nuevamente', 3000, 'rounded');
  });
}

function crear_pregunta_xml() {
  //console.log("2) entrando a crear_pregunta_xml");
  var cH = new XMLWriter('UTF-8','1.0');
        cH.formatting = 'indented';//add indentation and newlines
        cH.indentChar = ' ';//indent with spaces
        cH.indentation = 3;//add 2 spaces per levelXMLWriter

        cH.writeStartDocument( );
        cH.writeStartElement('assessmentItem');
                        cH.writeAttributeString('xmlns', 'http://www.imsglobal.org/xsd/imsqti_v2p1');
                        cH.writeAttributeString('xmlns:xsi','http://www.w3.org/2001/XMLSchema-instance');
                        cH.writeAttributeString('xsi:schemaLocation','http://www.imsglobal.org/xsd/imsqti_v2p1  http://www.imsglobal.org/xsd/qti/qtiv2p1/imsqti_v2p1.xsd ');
                        cH.writeAttributeString('identifier','hotspot');
                        cH.writeAttributeString('title',titulo);
                        cH.writeAttributeString('adaptive','false');
                        cH.writeAttributeString('timeDependent','false');

                        cH.writeStartElement('responseDeclaration');
                            cH.writeAttributeString('identifier','RESPONSE');
                            cH.writeAttributeString('cardinality','single');
                            cH.writeAttributeString('baseType','identifier');

                            cH.writeStartElement('correctResponse');
                                cH.writeStartElement('value');
                                    cH.writeString('alternativa'+correcta);
                                cH.writeEndElement('value');
                            cH.writeEndElement('correctResponse');

                        cH.writeEndElement('responseDeclaration');

                        cH.writeStartElement('outcomeDeclaration');
                            cH.writeAttributeString('identifier','SCORE');
                            cH.writeAttributeString('cardinality','single');
                            cH.writeAttributeString('baseType','float');
                            
                            cH.writeStartElement('defaultValue');
                                cH.writeStartElement('value');
                                    cH.writeString('0');
                                cH.writeEndElement('value');
                            cH.writeEndElement('defaultValue');
                        cH.writeEndElement('outcomeDeclaration');

                        cH.writeStartElement('itemBody');
                            if (texto_alternativo != "") {
                                cH.writeStartElement('p');
                                    cH.writeString(texto_alternativo);
                                cH.writeEndElement('p'); 
                            };
                            cH.writeStartElement('hotspotInteraction');
                                cH.writeAttributeString('responseIdentifier','RESPONSE');
                                cH.writeAttributeString('maxChoices',1);
                                cH.writeStartElement('prompt');
                                    cH.writeString(pregunta);
                                cH.writeEndElement('prompt');

                                if (nombre_foto != "") {
                                    cH.writeStartElement('object');
                                        cH.writeAttributeString('type','image/png');
                                        cH.writeAttributeString('width',imagen_ancho);
                                        cH.writeAttributeString('height',imagen_alto);
                                        cH.writeAttributeString('data','images/'+nombre_foto+'');
                                        cH.writeString("imagen");
                                    cH.writeEndElement('object');                       
                                };

                                for (var i = 1; i <= numero_fila; i++) 
                                {
                                    cH.writeStartElement('hotspotChoice');
                                        cH.writeAttributeString('shape','circle');
                                        cH.writeAttributeString('coords',respuestas_left[i]+","+respuestas_top[i]);
                                        cH.writeAttributeString('identifier','alternativa'+i);
                                            //cH.writeString(respuestas[i]);
                                    cH.writeEndElement('hotspotChoice');
                                };

                            cH.writeEndElement('hotspotInteraction');
                        cH.writeEndElement('itemBody');

                        cH.writeStartElement('responseProcessing');
                        cH.writeAttributeString('template','http://www.imsglobal.org/question/qti_v2p1/rptemplates/match_correct');
                        cH.writeEndElement('responseProcessing');
        cH.writeEndElement('assessmentItem');//fin assessment item
        var xml = cH.flush();

  return xml;
  /*++++++imprime el xml en consola++++++*/
  //console.log(xml);
  /*++++++imprime el xml en consola++++++*/  
};

function crear_imsmanifest(){
  //console.log("3) entrando a crear_imsmanifest");
  var cH = new XMLWriter('UTF-8','1.0');
        cH.formatting = 'indented';//add indentation and newlines
        cH.indentChar = ' ';//indent with spaces
        cH.indentation = 3;//add 2 spaces per levelXMLWriter

        cH.writeStartDocument( );
        cH.writeStartElement('manifest');
            cH.writeAttributeString('xmlns', 'http://www.imsglobal.org/xsd/imscp_v1p1');
            cH.writeAttributeString('xmlns:imsmd', 'http://www.imsglobal.org/xsd/imsmd_v1p2');   
            cH.writeAttributeString('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance');   
            cH.writeAttributeString('xmlns:imsqti', 'http://www.imsglobal.org/xsd/imsqti_metadata_v2p1');   
            cH.writeAttributeString('identifier', 'hotspot');   
            cH.writeAttributeString('xsi:schemaLocation', 'http://www.imsglobal.org/xsd/imscp_v1p1 imscp_v1p1.xsd http://www.imsglobal.org/xsd/imsmd_v1p2 imsmd_v1p2p4.xsd http://www.imsglobal.org/xsd/imsqti_metadata_v2p1  http://www.imsglobal.org/xsd/qti/qtiv2p1/imsqti_metadata_v2p1.xsd');   
            
            cH.writeStartElement('organizations');
            cH.writeEndElement('organizations');

            cH.writeStartElement('resources');
                cH.writeStartElement('resource');
                    cH.writeAttributeString('type', 'imsqti_item_xmlv2p1');
                    cH.writeAttributeString('href', "archivo.xml"); 

                    cH.writeStartElement('file');
                        cH.writeAttributeString('href', "archivo.xml"); 
                    cH.writeEndElement('file'); 

                    cH.writeStartElement('file');
                        cH.writeAttributeString('href', 'images/'+nombre_foto); 
                    cH.writeEndElement('file'); 
                cH.writeEndElement('resource');
            cH.writeEndElement('resources');
        cH.writeEndElement('manifest');//fin assessment item
        var xml = cH.flush();

  return xml;
  /*--------imprimir xml en consola---*/
  //console.log(cH);
  /*--------imprimir xml en consola---*/  
};