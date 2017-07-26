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