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

$(document).ready(function() {

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

  /* Add alternatives/row */
  $("#add_alternative").click(function(){
    number++;      
    var agregar = "";       
    agregar += "<tr id='"+number+"'>";
    agregar += "<td>";
    agregar += "<input id='test"+number+"' name='group1' type='radio' name='radio' class='check'/>";
    agregar += "<label for='test"+number+"'></label>";
    agregar += "</td>";
    agregar += "<td>";
    agregar += "<input id='"+number+"' type='text' class='respuesta' data-content='alternative' required>";
    agregar += "</td>";
    agregar += "<td class='center-align'>";
    agregar += "<i id='"+number+"' class='up fa fa-caret-up fa-3x' aria-hidden='true'></i>";
    agregar += "<i id='"+number+"' class='down fa fa-caret-down fa-3x' aria-hidden='true'></i>";
    agregar += "</td>";
    agregar += "<td>";
    agregar += "<button id='"+number+"' type='button' class='waves-effect waves-light btn btn-danger' data-action='delete-row'>";
    agregar += "<i class='fa fa-trash-o' aria-hidden='true'></i>";
    agregar += "</button>";
    agregar += "</td>";
    agregar += "</tr>";      

    $('tbody').append(agregar);

    $("#"+number+".up, #"+number+".down").click(function() {
      var row = $(this).parents("tr:first");        
      if ($(this).is(".up")) {
        row.insertBefore(row.prev());
      } else {
        row.insertAfter(row.next());
      }
    });

    $("button[data-action='delete-row']").click(function() {
      $("tr#"+this.id).hide('slow', function() {
        $("tr#"+this.id).remove();
      });
    });    
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

    $("#imagen-desplegada").append("<a id='eliminar_foto' class='btn-floating waves-effect waves-light btn-large btn-danger'><i class='fa fa-trash-o fa-2x' aria-hidden='true'></i></a>");
    $("#eliminar_foto").click(function(){
      var input_foto = $("#input_foto");
      input_foto.replaceWith(input_foto.val('').clone(true));;
      nombre_foto = "";
      //console.log("dentro sucess,nombre_foto: "+nombre_foto);
      $("#imagen-desplegada").empty();//remueve div de la iamgen desplegada
      $("#imagen").prop( "disabled", false );      
      $("#imagen").css({cursor: "pointer" }); 
      $('#imagen').val(''); //resetea el nombre que queda en el input para subir la misma si se quiere
    });
    $("#imagen-desplegada").append("<img style='top:-20px;position: relative;' src='"+result+"' width='350px'/>");
    $("#imagen").prop( "disabled", true );    
    $("#imagen").css({cursor: "not-allowed" }); 
  }

  /* Fill modal preview */
  $("#preview_question").click(function(){ 
    titulo = $(".titulo-choice").val();
    pregunta = $(".pregunta-choice").val();
    texto_alternativo = $(".texto_alternativo").val();

    $("#content_preview").empty();
    $("#banner_preview h5.white-text").empty();
    $("#banner_preview h5.white-text").append('Selecci&oacute;n Simple');

    if (titulo!="") $("#content_preview").append('<span><b>Titulo: </b>'+titulo+'</span></br>');
    else $("#content_preview").append('<span><b>Titulo: </b>* No tiene t&iacute;tulo *</span></br>');

    if (texto_alternativo!="") $("#content_preview").append('<span><b>Texto alternativo: </b>'+texto_alternativo+'</span></br>');
    else $("#content_preview").append('<span><b>Texto alternativo: </b>* No tiene texto alternativo *</span></br>');

    if (nombre_foto!='') {
      $("#content_preview").append('<span><b>Imagen:</span></br>');
      $("#content_preview").append("<center><img src='"+result+"' width='250px'/></center>");
    }

    if (pregunta!="") $("#content_preview").append('<span><b>Pregunta: </b>'+pregunta+'</span></br>');
    else $("#content_preview").append('<span><b>Pregunta: </b>* No tiene pregunta *</span></br>');

    var inicio = 1;
    $('tbody tr').each(function () {          
      var numero_id = $(this)[0].id;      
      var respuesta = $('#'+numero_id+".respuesta").val();
      respuestas[inicio] = respuesta;
      if (respuestas[inicio] == "") respuestas[inicio] = "Alternativa vacía";
      inicio++;
    }); 

    $("#content_preview").append('<span><b>Alternativas: </b></span></br>');
    cantidad_alternativas = $('#answers_table >tbody >tr').length;
    var agregar = "";
    for (var i = 1; i <= cantidad_alternativas; i++) {
      agregar += '<p>';
      agregar += "<input name='group1' type='radio' id='alternative"+i+"'/>";
      agregar += "<label for='alternative"+i+"'>"+respuestas[i]+"</label>";
      agregar += "</p>";
    };
    $('#content_preview').append(agregar);
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
  titulo = remplazarCaracteresEspeciales(titulo);

  pregunta = $(".pregunta-choice").val();
  pregunta = remplazarCaracteresEspeciales(pregunta);
      
  texto_alternativo = $(".texto_alternativo").val();
  texto_alternativo = remplazarCaracteresEspeciales(texto_alternativo);

  numero_fila = $('#answers_table>tbody>tr').length;  //cantidad de filas respuestas
  var inicio = 1;

  $('tbody tr').each(function () {
    var numero_id = $(this)[0].id;
    //console.log("numero_id: "+numero_id);
    if($("#test"+numero_id+".check").is(':checked')) {  
      var estado = "activado";
      correcta = inicio;
      //console.log("correcta: "+correcta);
    } else {
      var estado = "desactivado";
    }
    var respuesta = remplazarCaracteresEspeciales($('#'+numero_id+'.respuesta').val());

    respuestas[inicio] = respuesta;
    inicio++;
  }); 
  
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
        "title": titulo,
        "number": random,
        "type": "choice",
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
        "title": titulo,
        "number": random,
        "type": "choice",
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
      Materialize.toast('Error al gurdar la pregunta', 3000, 'rounded');
    }
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    Materialize.toast('Un error a ocurrido. Intente nuevamente', 3000, 'rounded');
  });
}

function crear_pregunta_xml() {
  //console.log("2) entrando a crear_pregunta_xml");
  var cH = new XMLWriter('UTF-8','1.0');
  cH.formatting = 'indented';   //add indentation and newlines
  cH.indentChar = ' ';          //indent with spaces
  cH.indentation = 3;           //add 2 spaces per levelXMLWriter

  cH.writeStartDocument( );
  cH.writeStartElement('assessmentItem');
  cH.writeAttributeString('xmlns', 'http://www.imsglobal.org/xsd/imsqti_v2p1');
  cH.writeAttributeString('xmlns:xsi','http://www.w3.org/2001/XMLSchema-instance');
  cH.writeAttributeString('xsi:schemaLocation','http://www.imsglobal.org/xsd/imsqti_v2p1  http://www.imsglobal.org/xsd/qti/qtiv2p1/imsqti_v2p1.xsd ');
  cH.writeAttributeString('identifier','choice');
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
  if (nombre_foto != "") {
    cH.writeStartElement('p');
    cH.writeStartElement('img');
    cH.writeAttributeString('src','images/'+nombre_foto+'');
    cH.writeAttributeString('alt','');
    cH.writeAttributeString('width','100');
    cH.writeAttributeString('height','100');
    cH.writeEndElement('img');
    cH.writeEndElement('p');                          
  };
    cH.writeStartElement('choiceInteraction');
    cH.writeAttributeString('responseIdentifier','RESPONSE');
    cH.writeAttributeString('shuffle','false');
    cH.writeAttributeString('maxChoices',1);
    cH.writeStartElement('prompt');
    cH.writeString(pregunta);
    cH.writeEndElement('prompt');

  for (var i = 1; i <= numero_fila; i++) {
    cH.writeStartElement('simpleChoice');
    cH.writeAttributeString('identifier','alternativa'+i);
    cH.writeString(respuestas[i]);
    cH.writeEndElement('simpleChoice');
  };

  cH.writeEndElement('choiceInteraction');
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
      cH.writeAttributeString('identifier', 'choice');   
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