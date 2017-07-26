$(document).ready(function() {
  /* Save shared question */
  $("#save_question").click(function() {
    if ($("#shared_code").val() == "") {
      $("input#shared_code").next("label").attr("data-error", "Código requerido");
      $("input#shared_code").removeClass("valid").addClass("invalid");
    } else {
      save_question();      
    }
  });

  /* Preview shared question */
  $("#preview_question").click(function() {
    if ($("#shared_code").val() == "") {
      $("input#shared_code").next("label").attr("data-error", "Código requerido");
      $("input#shared_code").removeClass("valid").addClass("invalid");
    } else {
      preview_question();
    }    
  });
});

function save_question() {
  $.ajax({
    type: "POST",
    url: document.location.pathname,
    headers: {'X-CSRFToken': Cookies.get('csrftoken')},
    data: {
      action: "save",
      shared_code: $("input#shared_code").val()
    },
    dataType: 'json',
  })
  .done(function(data) {
    if (data.result == "error") {
        Materialize.toast(data.message, 3000,'rounded');
        $("input#shared_code").next("label").attr("data-error", data.message);
        $("input#shared_code").removeClass("valid").addClass("invalid");
    } else {
        Materialize.toast('Pregunta agregada', 3000,'rounded');
        $("input#shared_code").val("").removeClass("valid");
    }
  })
  .fail(function() {
    Materialize.toast('Un error a ocurrido. Intente nuevamente', 3000, 'rounded');
  });
};

function preview_question() {
  $.ajax({
    type: "POST",
    url: document.location.pathname,
    headers: {'X-CSRFToken': Cookies.get('csrftoken')},
    data: {
      action: "preview",
      shared_code: $("input#shared_code").val()
    },
    dataType: 'json',
  })
  .done(function(data){
    if (data.result == "error") {
        Materialize.toast(data.message, 3000,'rounded');
        $("input#shared_code").next("label").attr("data-error", data.message);
        $("input#shared_code").removeClass("valid").addClass("invalid");
    } else {
        //Materialize.toast('Pregunta valida', 3000,'rounded');
        url           = data.url;
        tipo_pregunta = data.type;
        extension     = data.extension;
        codigo        = data.code;
        opcion        = "visualizar";
        xml_archivo   = $.parseXML(data.archivo);
        xml_manifest  = $.parseXML(data.imsmanifest);
        select_method()
    }
  })
  .fail(function() {
    Materialize.toast('Un error a ocurrido. Intente nuevamente', 3000, 'rounded');
  });
};

function select_method() {
  if (tipo_pregunta == "choice" ) {  
    procesar_choice_datos();
  };
  if (tipo_pregunta == "order" ) {
    procesar_order_datos();
  };
  if (tipo_pregunta == "inline choice" ) {
    procesar_inlinechoice_datos();
  };
  if (tipo_pregunta == "text entry" ) {
    procesar_textentry_datos();
  };
  if (tipo_pregunta == "slider" ) {
    procesar_slider_datos();  
  };
  if (tipo_pregunta == "associate" ) {
    procesar_associate_datos();  
  };
  if (tipo_pregunta == "hotspot" ) {
    procesar_hotspot_datos();  
  };
}

function procesar_choice_datos(){
  extrear_datos_xml_choice();
  if (extension == "zip") {
    extrear_datos_imsmanifest();   
    cargar_datos_modal_choice();
    eliminar_carpeta_zip()
  } else {
    cargar_datos_modal_choice();
  }
};

function procesar_order_datos() {
  extraer_datos_xml_order();              
  extrear_datos_imsmanifest();
  cargar_datos_modal_order();
};

function procesar_inlinechoice_datos() {
  extraer_datos_xml_inlinechoice();              
  extrear_datos_imsmanifest();
  cargar_datos_modal_inlinechoice();  
};

function procesar_textentry_datos(){
  extraer_datos_xml_textentry();              
  extrear_datos_imsmanifest();
  cargar_datos_modal_textentry();
};

function procesar_slider_datos(){
  extraer_datos_xml_slider();              
  extrear_datos_imsmanifest();
  cargar_datos_modal_slider();
};

function procesar_associate_datos(){
  extraer_datos_xml_associate();              
  extrear_datos_imsmanifest();
  cargar_datos_modal_associate();
};

function procesar_hotspot_datos(){
  extraer_datos_xml_hotspot();              
  extrear_datos_imsmanifest();
  cargar_datos_modal_hotspot();
};