 function loadModalChoiceData() {
  $("#modal-text-mis-preguntas").click();
  $("#content_preview").empty();
  $("#banner_preview h5.white-text").empty();
  $("#banner_preview h5.white-text").append('Selecci&oacute;n Simple');

  if (question_title!="") $("#content_preview").append('<span><b>Titulo: </b>'+question_title+'</span></br>');
  else $("#content_preview").append('<span><b>Titulo: </b>* Pregunta sin t&iacute;tulo *</span></br>');

  if (alternative_text!="") $("#content_preview").append('<span><b>Texto alternativo: </b>'+alternative_text+'</span></br>');
  else $("#content_preview").append('<span><b>Texto alternativo: </b>* Pregunta sin texto alternativo *</span></br>');

  if (image!='') {
    $("#content_preview").append('<span><b>Imagen:</span></br>');
    $("#content_preview").append("<center><img src='/preguntas/"+code+"/"+image+"' width='250px'/></center>");
  }

  if (question_text!="") $("#content_preview").append('<span><b>Pregunta: </b>'+question_text+'</span></br>');
  else $("#content_preview").append('<span><b>Pregunta: </b>* No tiene pregunta *</span></br>');

  $("#content_preview").append('<span><b>Alternativas: </b></span></br>');
  var agregar = "";
  for (var i = 0; i < alternatives.length ; i++) {
    agregar += '<p>';
    if (alternatives[i].identifier == correct_response) {
        agregar += "<input name='group1' type='radio' id='"+alternatives[i].identifier+"' checked>";
    } else {
        agregar += "<input name='group1' type='radio' id='"+alternatives[i].identifier+"'/>";
    }
    agregar += "<label for='"+alternatives[i].identifier+"'>"+alternatives[i].alternative+"</label>";
    agregar += "</p>";
  };
  $('#content_preview').append(agregar);
  $('#preview_modal').modal('open');
  resetVariables();
};

 function loadModalOrderData() {
  $("#modal-text-mis-preguntas").click();
  $("#content_preview").empty();
  $("#banner_preview h5.white-text").empty();
  $("#banner_preview h5.white-text").append('Selecci&oacute;n Ordenamiento');

  if (question_title!="") $("#content_preview").append('<span><b>Titulo: </b>'+question_title+'</span></br>');
  else $("#content_preview").append('<span><b>Titulo: </b>* Pregunta sin t&iacute;tulo *</span></br>');

  if (alternative_text!="") $("#content_preview").append('<span><b>Texto alternativo: </b>'+alternative_text+'</span></br>');
  else $("#content_preview").append('<span><b>Texto alternativo: </b>* Pregunta sin texto alternativo *</span></br>');

  if (image!='') {
    $("#content_preview").append('<span><b>Imagen:</span></br>');
    $("#content_preview").append("<center><img src='/fama/media/"+code+"/"+image+"' width='250px'/></center>");
  }

  if (question_text!="") $("#content_preview").append('<span><b>Pregunta: </b>'+question_text+'</span></br>');
  else $("#content_preview").append('<span><b>Pregunta: </b>* No tiene pregunta *</span></br>');

  $("#content_preview").append('<span><b>Alternativas: </b></span></br>');
  var agregar = "";
  for (var i = 0; i < alternatives.length ; i++) {
    agregar += '<ul id="sortable">';
    
    agregar += '<li class="ui-state-default"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>'+alternatives[i].alternative+'</li>';
    
    //agregar += "<label for='"+alternatives[i].identifier+"'>"+alternatives[i].alternative+"</label>";
    agregar += "</ul>";
  };
  $('#content_preview').append(agregar);
  $('#preview_modal').modal('open');
  resetVariables();
};

 function loadModalInlineData() {
    $("#modal-text-mis-preguntas").click();
    $("#content_preview").empty();
    $("#banner_preview h5.white-text").empty();
    $("#banner_preview h5.white-text").append('Selecci&oacute;n entre l&iacute;neas');

    if (question_title!="") $("#content_preview").append('<span><b>Titulo: </b>'+question_title+'</span></br>');
    else $("#content_preview").append('<span><b>Titulo: </b>* No tiene t&iacute;tulo *</span></br>');

    if (alternative_text!="") $("#content_preview").append('<span><b>Texto alternativo: </b>'+alternative_text+'</span></br>');
    else $("#content_preview").append('<span><b>Texto alternativo: </b>* No tiene texto alternativo *</span></br>');

    if (image!='') {
        $("#content_preview").append('<span><b>Imagen:</span></br>');
        $("#content_preview").append("<center><img src='/fama/media/"+code+"/"+image+"' width='250px'/></center>");
    }

    if (question_text!="") $("#content_preview").append('<span><b>Pregunta: </b>'+question_text+'</span></br>');
    else $("#content_preview").append('<span><b>Pregunta: </b>* No tiene pregunta *</span></br>');
 
    $("#content_preview").append('<span><b>Alternativas: </b></span></br>');
    var agregar = "";
    //alternatives = $('#answers_table >tbody >tr').length;

    agregar += '<select style="display: inline;width: 20%;float: left;height: 25px;padding: 0px;font-size: 12px;">';
    for (var i = 0; i < alternatives.length ; i++) {
      agregar += '<option value='+alternatives[i].identifier+'>'+alternatives[i].alternative+'</option>'; 
    };
    agregar += '</select>';

    $("#content_preview").append(
      '<div style="width:100%;height:auto;">' +
      '<div style="width:40%;height:auto;background-color:none;float:left;text-align:right;padding-right:5px;">'+text_previo+'</div>' +
      agregar+
      '<div style="width:40%;height:auto;background-color:none;float:left;text-align:left;padding-left:5px;">'+text_posterior+'</div>'+
      '</div>');

    $('#preview_modal').modal('open');
    resetVariables();
};

 function loadModalEntryData() {
    $("#modal-text-mis-preguntas").click();
    $("#content_preview").empty();
    $("#banner_preview h5.white-text").empty();
    $("#banner_preview h5.white-text").append('Texto entre l&iacute;neas');

    if (question_title!="") $("#content_preview").append('<span><b>Titulo: </b>'+question_title+'</span></br>');
    else $("#content_preview").append('<span><b>Titulo: </b>* No tiene t&iacute;tulo *</span></br>');

    if (alternative_text!="") $("#content_preview").append('<span><b>Texto alternativo: </b>'+alternative_text+'</span></br>');
    else $("#content_preview").append('<span><b>Texto alternativo: </b>* No tiene texto alternativo *</span></br>');

    if (image!='') {
        $("#content_preview").append('<span><b>Imagen:</span></br>');
        $("#content_preview").append("<center><img src='/fama/media/"+code+"/"+image+"' width='250px'/></center>");
    }

    if (question_text!="") $("#content_preview").append('<span><b>Pregunta: </b>'+question_text+'</span></br>');
    else $("#content_preview").append('<span><b>Pregunta: </b>* No tiene pregunta *</span></br>');
 
    $("#content_preview").append(
      '<div style="width:100%;height:auto;">' +
        '<div style="width:40%;height:auto;background-color:none;float:left;text-align:right;padding-right:5px;">'+text_previo+'</div>' +

        '<input style="width:18%;float:left;border:1px solid black;height: 1.3rem;margin:0 0 0px 0;" type="text" name="" value="" size="15">' +

        '<div style="width:40%;height:auto;background-color:none;float:left;text-align:left;padding-left:5px;">'+text_posterior+'</div>'+
      '</div>');

    $('#preview_modal').modal('open');
    resetVariables();
};

 function loadModalSliderData() {
  $("#modal-text-mis-preguntas").click();
  $("#content_preview").empty();
  $("#banner_preview h5.white-text").empty();
  $("#banner_preview h5.white-text").append('Deslizador');

  if (question_title!="") $("#content_preview").append('<span><b>Titulo: </b>'+question_title+'</span></br>');
  else $("#content_preview").append('<span><b>Titulo: </b>* Pregunta sin t&iacute;tulo *</span></br>');

  if (alternative_text!="") $("#content_preview").append('<span><b>Texto alternativo: </b>'+alternative_text+'</span></br>');
  else $("#content_preview").append('<span><b>Texto alternativo: </b>* Pregunta sin texto alternativo *</span></br>');

  if (image!='') {
    $("#content_preview").append('<span><b>Imagen:</span></br>');
    $("#content_preview").append("<center><img src='/fama/media/"+code+"/"+image+"' width='250px'/></center>");
  }

  if (question_text!="") $("#content_preview").append('<span><b>Pregunta: </b>'+question_text+'</span></br>');
  else $("#content_preview").append('<span><b>Pregunta: </b>* No tiene pregunta *</span></br>');

  $("#content_preview").append(
      '<div style="width:100%;height:auto;">' +
      '<div style="width:10%;height:auto;background-color:none;float:left;text-align:center;margin-top: 20px;">'+limite_inferior+'</div>' +
                    
      '<div style="width:80%;float:left;" class="slider-content">' +
        '<p class="range-field">' +
        '<input type="range" id="slider-input_preview"  step="1" min='+limite_inferior+' max='+limite_superior+' />' +
        '</p>' +
      '</div>' +

      '<div style="width:10%;height:auto;background-color:none;float:left;text-align:center;margin-top: 20px;">'+limite_superior+'</div>'+
      '</div>'
    );

    $('#slider-input_preview').on("change mousemove", function() {
      valor_correcto = $(this).val();
      $("#valor_correcto_slider").text(valor_correcto);
    });

    $("#content_preview").append('<div style="width:100%;height:auto;display: inline-block;text-align:center;"><span id="valor_correcto_slider">50</span></div>');

  $('#preview_modal').modal('open');
  resetVariables();
};

 function loadModalAssociateData() {
  $("#modal-text-mis-preguntas").click();
  $("#content_preview").empty();
  $("#banner_preview h5.white-text").empty();
  $("#banner_preview h5.white-text").append('T&eacute;rminos Pareados');

  if (question_title!="") $("#content_preview").append('<span><b>Titulo: </b>'+question_title+'</span></br>');
  else $("#content_preview").append('<span><b>Titulo: </b>* Pregunta sin t&iacute;tulo *</span></br>');

  if (alternative_text!="") $("#content_preview").append('<span><b>Texto alternativo: </b>'+alternative_text+'</span></br>');
  else $("#content_preview").append('<span><b>Texto alternativo: </b>* Pregunta sin texto alternativo *</span></br>');

  if (image!='') {
    $("#content_preview").append('<span><b>Imagen:</span></br>');
    $("#content_preview").append("<center><img src='/fama/media/"+code+"/"+image+"' width='250px'/></center>");
  }

  if (question_text!="") $("#content_preview").append('<span><b>Pregunta: </b>'+question_text+'</span></br>');
  else $("#content_preview").append('<span><b>Pregunta: </b>* No tiene pregunta *</span></br>');

  var opciones = "";
  for (var i = 0; i < alternatives.length; i++) {
    opciones +='<option value='+alternatives[i].alternative+'>'+alternatives[i].alternative+'</option>';
  };

  var agregar = "";
  numero_fila_pares = alternatives.length / 2;
  //console.log(numero_fila_pares);
  agregar += '<table>';
  agregar += '<thead style="border-bottom: 0px solid #d0d0d0;">';
  agregar += '<tr><th style="padding: 2px;"></th><th style="padding: 2px;" ></th></tr>';
  agregar += '</thead>';
  for (var i = 0; i < numero_fila_pares; i++) {
    agregar += '<tr style="    border: 1px dashed grey;padding: 5px;margin-top: 5px;"> ';
    agregar +=      '<td style="width:50%;padding: 2px 2px;">'
    agregar +=            '<select class="alternativa1"  style="display:inline;height: auto;">'+opciones+'</select>'
    agregar +=      '</td>'

    agregar +=      '<td style="width:50%;padding: 2px 2px;">'
    agregar +=            '<select class="alternativa2"  style="display:inline;height: auto;">'+opciones+'</select>'
    agregar +=      '</td>'
    agregar += '</tr>';
  };

  $('#content_preview').append(agregar);
  $('#preview_modal').modal('open');
  resetVariables();
};


/*#################################################################################################################
Unused functions

 function cargar_choice_pantalla(){
        $("#parte").fadeIn();
        $("#miTabla-mispreguntas").fadeOut();
        $(".pagination").fadeOut();
        $(".content").css("width","70%");
        $(".brand-logo").text("Editando pregunta");

        $(".titulo-choice").val(texto_titulo);
        $(".pregunta-choice").val(prompt);
        $(".texto_alternativo").val(texto_alternativo);

        var agregar = "";
        for (var i = 0; i < alternativas.length ; i++) {
            agregar += '<tr id='+i+'>';
            agregar += '<td style="padding: 0px;width:10px;"><input name="group1" type="radio" id=test'+i+' name="radio" id='+i+' class="check" /><label style="margin-top:5px;" for=test'+i+'></label></td>';
            agregar += '<td style="padding: 0px 10px 0px 10px;width: 80%;"><input  type="text"      id='+i+' class="respuesta"></td>';
            agregar += '<td style="padding: 0px;"><a class="up"   id='+i+'><img style="height:20px;" src="img/subir.png"></a> <a class="down" id='+i+'><img style="height:20px;" src="img/bajar.png"></a></td>';
            agregar += '<td style="padding: 0px;float:right;"><button  style="background-color:#ee6e73;" class="eliminan waves-effect waves-light btn" id='+i+' type="button"   ><i class="material-icons">delete</i></button></td>';
            agregar += '</tr>';
        };

        $('tbody').append(agregar);
        
        for (var i = 0; i < alternativas.length; i++) {

            $("#"+i+".respuesta").val(alternativas[i]);

            $("#"+i+".eliminan").click(function(){ 
                var id = $( this ).context.id;
                $("#"+id).remove();
                console.log("id de la fila edición: "+id);
            });

            $("#"+i+".up").click(function(){
                var row = $(this).parents("tr:first");
                if ($(this).is(".up")) {
                    row.insertBefore(row.prev());
                }
            });

            $("#"+i+".down").click(function(){
                var row = $(this).parents("tr:first");
                if ($(this).is(".down")) {
                    row.insertAfter(row.next());
                }
            });
            //cuando escribo en los campos debo actualizarlos porque choice-edit.js no esta tomando el value nuevo
            $("#"+i+".respuesta").on('input', function() {
                var id = $( this ).context.id;
                console.log("id: "+id);
                console.log($("input"+"#"+id+".respuesta"));
                console.log($("input"+"#"+id+".respuesta")[1].value);
                xx = $("input"+"#"+id+".respuesta").val();
                //console.log(xx);
                $("input"+"#0"+".respuestas").val("ola");
                //console.log(xx);
            });

        };

        console.log(alternativas);
}






function cargar_datos_modal_order(){

    console.log("4) cargando datos a la modal");
    //console.log("codigo: "+codigo);              //CODIGO GLOBAL ESTA EN LA SALIDA DE UN AJAX
    $("#modal-text-mis-preguntas").click();
    $("#content_preview").empty();
    $("#content_preview").append('<h5>Vista previa "'+texto_identificador+'"</h5>');   

    if (texto_titulo!="") $("#content_preview").append('<span><b>Titulo: </b>'+texto_titulo+'</span></br>');
    else $("#content_preview").append('<span><b>Titulo: </b>No tiene titulo *</span></br>');

    if (texto_alternativo!="") $("#content_preview").append('<span><b>Texto alternativo: </b>'+texto_alternativo+'</span></br>');
    else $("#content_preview").append('<span><b>Texto alternativo: </b>No tiene texto alternativo *</span></br>');

    if (url_imagen!='') $("#content_preview").append("<center><img src='preguntas/"+codigo+"/"+url_imagen+"' width='250px'/></center>");
    else $("#content_preview").append("<center><img src='img/imagen.png' width='250px'/></center>");

    if (prompt!="") $("#content_preview").append('<span><b>Pregunta: </b>'+prompt+'</span></br>');
    else $("#content_preview").append('<span><b>Pregunta: </b>No tiene pregunta *</span></br>');
    
    var agregar = "";
    agregar += '<ul id="sortable">';
    for (var i = 0; i < alternativas.length ; i++) {

        agregar += '<li class="ui-state-default"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>'+alternativas[i]+'</li>';
            
    };
    agregar += '</ul>';  

    $('#content_preview').append(agregar);
    $( "#sortable" ).sortable();
    $( "#sortable" ).disableSelection();       
};


function cargar_datos_modal_inlinechoice(){

    console.log("4) cargando datos a la modal");
    //console.log("codigo: "+codigo);              //CODIGO GLOBAL ESTA EN LA SALIDA DE UN AJAX
    $("#modal-text-mis-preguntas").click();
    $("#content_preview").empty();
    $("#content_preview").append('<h5>Vista previa de pregunta "'+texto_identificador+'"</h5>');   

    if (texto_titulo!="") $("#content_preview").append('<span><b>Titulo: </b>'+texto_titulo+'</span></br>');
    else $("#content_preview").append('<span><b>Titulo: </b>No tiene titulo *</span></br>');

    if (url_imagen!='') $("#content_preview").append("<center><img src='preguntas/"+codigo+"/"+url_imagen+"' width='250px'/></center>");
    else $("#content_preview").append("<center><img src='img/imagen.png' width='250px'/></center>");

    if (texto_alternativo!="") $("#content_preview").append('<span><b>Pregunta: </b>'+texto_alternativo+'</span></br>');
    else $("#content_preview").append('<span><b>Texto alternativo: </b>No tiene pregunta *</span></br>');

    //if (prompt!="") $("#content_preview").append('<span><b>Pregunta: </b>'+prompt+'</span></br>');
    //else $("#content_preview").append('<span><b>Pregunta: </b>No tiene pregunta *</span></br>');
    
    var agregar = "";
    cantidad_alternativas = alternativas.length;

    agregar += '<select style="display: inline;width: 20%;float: left;height: 25px;padding: 0px;font-size: 12px;">';
    for (var i = 0; i < cantidad_alternativas ; i++) {
            agregar += '<option value='+alternativas[i]+'>'+alternativas[i]+'</option>'; 
    };
    agregar += '</select>';  

    if(texto_antes=="") texto_antes="Este es un texto previo";
    if(texto_despues=="") texto_despues="Este es un texto posterior";

    $("#content_preview").append(
            '<div style="width:100%;height:auto;">' +
                '<div style="width:40%;height:auto;background-color:none;float:left;text-align:center;">'+texto_antes+'</div>' +
                agregar+
                '<div style="width:40%;height:auto;background-color:none;float:left;text-align:center;">'+texto_despues+'</div>'+
            '</div>'); 
};


function cargar_datos_modal_textentry(){

    console.log("4) cargando datos a la modal");
    $("#modal-text-mis-preguntas").click();
    $("#content_preview").empty();
    $("#content_preview").append('<h5>Vista previa de pregunta "'+texto_identificador+'"</h5>');   

    if (texto_titulo!="") $("#content_preview").append('<span><b>Titulo: </b>'+texto_titulo+'</span></br>');
    else $("#content_preview").append('<span><b>Titulo: </b>No tiene titulo *</span></br>');

    if (url_imagen!='') $("#content_preview").append("<center><img src='preguntas/"+codigo+"/"+url_imagen+"' width='250px'/></center>");
    else $("#content_preview").append("<center><img src='img/imagen.png' width='250px'/></center>");

    if (texto_alternativo!="") $("#content_preview").append('<span><b>Pregunta: </b>'+texto_alternativo+'</span></br>');
    else $("#content_preview").append('<span><b>Texto alternativo: </b>No tiene pregunta *</span></br>');

    //if (prompt!="") $("#content_preview").append('<span><b>Pregunta: </b>'+prompt+'</span></br>');
    //else $("#content_preview").append('<span><b>Pregunta: </b>No tiene pregunta *</span></br>');
    
    if(texto_antes=="") texto_antes="Este es un texto previo";
    if(texto_despues=="") texto_despues="Este es un texto posterior";

    $("#content_preview").append(
            '<div style="width:100%;height:auto;">' +
                '<div style="width:40%;height:auto;background-color:none;float:left;text-align:center;">'+texto_antes+'</div>' +

                '<input style="width:18%;float:left;border:1px solid black;height: 1.3rem;margin:0 0 0px 0;" type="text" name="" value="" size="15">' +

                '<div style="width:40%;height:auto;background-color:none;float:left;text-align:center;">'+texto_despues+'</div>'+
            '</div>');
};


function cargar_datos_modal_slider(){

    console.log("4) cargando datos a la modal");
    $("#modal-text-mis-preguntas").click();
    $("#content_preview").empty();
    $("#content_preview").append('<h5>Vista previa de pregunta "'+texto_identificador+'"</h5>');   

    if (texto_titulo!="") $("#content_preview").append('<span><b>Titulo: </b>'+texto_titulo+'</span></br>');
    else $("#content_preview").append('<span><b>Titulo: </b>No tiene titulo *</span></br>');

    if (url_imagen!='') $("#content_preview").append("<center><img src='preguntas/"+codigo+"/"+url_imagen+"' width='250px'/></center>");
    else $("#content_preview").append("<center><img src='img/imagen.png' width='250px'/></center>");

    if (texto_alternativo!="") $("#content_preview").append('<span><b>Pregunta: </b>'+texto_alternativo+'</span></br>');
    else $("#content_preview").append('<span><b>Texto alternativo: </b>No tiene pregunta *</span></br>');
    
    if(texto_antes=="") texto_antes="Este es un texto previo";
    if(texto_despues=="") texto_despues="Este es un texto posterior";

    $("#content_preview").append(
            '<div style="width:100%;height:auto;">' +
                '<div style="width:10%;height:auto;background-color:none;float:left;text-align:center;margin-top: 20px;">'+limite_inferior+'</div>' +
                
                '<div style="width:80%;float:left;" class="slider-content">' +
                    '<p class="range-field">' +
                      '<input type="range" id="slider-input_preview"  value='+respuesta_correcta+' step='+salto+' min='+limite_inferior+' max='+limite_superior+' />' +
                    '</p>' +
                '</div>' +

                '<div style="width:10%;height:auto;background-color:none;float:left;text-align:center;margin-top: 20px;">'+limite_superior+'</div>'+
            '</div>'
            );
    $('#slider-input_preview').on("change mousemove", function() {
        valor_correcto = $(this).val();
        $("#valor_correcto_slider").text(valor_correcto);
    });
    $("#content_preview").append('<div style="width:100%;height:auto;display: inline-block;text-align:center;"><span id="valor_correcto_slider">'+respuesta_correcta+'</span></div>');
};


function cargar_datos_modal_associate(){

    console.log("4) cargando datos a la modal");
    $("#modal-text-mis-preguntas").click();
    $("#content_preview").empty();
    $("#content_preview").append('<h5>Vista previa de pregunta "'+texto_identificador+'"</h5>');   

    if (texto_titulo!="") $("#content_preview").append('<span><b>Titulo: </b>'+texto_titulo+'</span></br>');
    else $("#content_preview").append('<span><b>Titulo: </b>No tiene titulo *</span></br>');

    if (texto_alternativo!="") $("#content_preview").append('<span><b>Texto alternativo: </b>'+texto_alternativo+'</span></br>');
    else $("#content_preview").append('<span><b>Texto alternativo: </b>No tiene texto alternativo *</span></br>');

    if (url_imagen!='') $("#content_preview").append("<center><img src='preguntas/"+codigo+"/"+url_imagen+"' width='250px'/></center>");
    else $("#content_preview").append("<center><img src='img/imagen.png' width='250px'/></center>");

    if (prompt!="") $("#content_preview").append('<span><b>Pregunta: </b>'+prompt+'</span></br>');
    else $("#content_preview").append('<span><b>Pregunta: </b>No tiene pregunta *</span></br>');


    var opciones = "";
    for (var i = 0; i < alternativas.length; i++) {
        opciones +='<option value='+alternativas[i]+'>'+alternativas[i]+'</option>';
    };
            
    var agregar = "";

    agregar += '<table>';
    agregar += '<thead style="border-bottom: 0px solid #d0d0d0;">';
    agregar += '<tr><th style="padding: 2px;"></th><th style="padding: 2px;"></th></tr>';
    agregar += '</thead>';
    for (var i = 1; i <= (alternativas.length)/2; i++) {
        agregar += '<tr > ';
        agregar +=      '<td style="width:50%;padding: 2px 2px;">'
        agregar +=            '<select class="alternativa1"  style="display:inline;height: auto;">'+opciones+'</select>'
        agregar +=      '</td>'

        agregar +=      '<td style="width:50%;padding: 2px 2px;">'
        agregar +=            '<select class="alternativa2"  style="display:inline;height: auto;">'+opciones+'</select>'
        agregar +=      '</td>'
        agregar += '</tr>';
    };
    $('#content_preview').append(agregar);
};

function cargar_datos_modal_hotspot(){

    console.log("4) cargando datos a la modal");
    $("#modal-text-mis-preguntas").click();
    $("#content_preview").empty();
    $("#content_preview").append('<h5>Vista previa de pregunta "'+texto_identificador+'"</h5>');   

    if (texto_titulo!="") $("#content_preview").append('<span><b>Titulo: </b>'+texto_titulo+'</span></br>');
    else $("#content_preview").append('<span><b>Titulo: </b>No tiene titulo *</span></br>');

    if (texto_alternativo!="") $("#content_preview").append('<span><b>Texto alternativo: </b>'+texto_alternativo+'</span></br>');
    else $("#content_preview").append('<span><b>Texto alternativo: </b>No tiene texto alternativo *</span></br>');

    $("#content_preview").append("<div id='imagen-desplegada-modal'  style='width:100%;height:auto;'></div>")
    if (url_imagen!='') $("#imagen-desplegada-modal").append("<img id='img-desplegada-modal' src='preguntas/"+codigo+"/"+url_imagen+"' width='100%' height='auto'/>");
    else $("#imagen-desplegada-modal").append("<center><img src='img/imagen.png' width='250px'/></center>");
    
     topx = $("#imagen-desplegada-modal").position().top;  //rango entre donde comienza la modal y donde se encuentra la imagen (POSICION Y)
     leftx = $("#imagen-desplegada-modal").position().left;//rango entre donde comienza la modal y donde se encuentra la imagen (posicion X)
     console.log("topx: " + topx);
     console.log("leftx: " + leftx);


    imagen_ancho_modal = $("#img-desplegada-modal").width();  //ancho de la imagen en la modal, lo saco directo
    console.log("imagen-ancho-modal: " + imagen_ancho_modal);

    imagen_alto_modal  =Math.round( (imagen_ancho_modal*var_height)/var_width ); //alto de la imagen en la modal, lo calculo, no puedo sacar porque tiene height:auto
    console.log("imagen-alto-modal: " + imagen_alto_modal);

  
    if (imagen_ancho_modal > imagen_alto_modal) {
        tamano_circulo = (imagen_ancho_modal * 30)/var_width;
        tamano_fuente  = ( tamano_circulo * 18 )/30;
        espacio_top    = ( tamano_circulo * -2 )/30;
    }else{
        tamano_circulo = (imagen_alto_modal * 30)/var_height;
        tamano_fuente  = ( tamano_circulo * 18 )/30;
        espacio_top    = ( tamano_circulo * -2 )/30;
    }
    for (var i = 0; i < alternativas_x.length; i++) {
        nuevo_top = (imagen_alto_modal * alternativas_y[i])/var_height ;
        nuevo_left = ( imagen_ancho_modal * alternativas_x[i] )/var_width;
        $("#imagen-desplegada-modal").append("<div style='position:absolute;top:"+(topx + nuevo_top)+"px;left:"+(leftx+nuevo_left+8)+"px;"+"width:"+(tamano_circulo)+"px;height:"+(tamano_circulo)+"px;'class='caja2' id='inicio'><center><span style='font-size:"+tamano_fuente+"px;position:relative;top:"+espacio_top+"px;'>"+(i+1)+"<span></center></div>");
    };

    if (prompt!="") $("#content_preview").append('<span><b>Pregunta: </b>'+prompt+'</span></br>');
    else $("#content_preview").append('<span><b>Pregunta: </b>No tiene pregunta *</span></br>');          

};
#################################################################################################################*/