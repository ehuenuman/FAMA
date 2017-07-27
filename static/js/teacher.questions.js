$(document).ready(function() {
  /* Share/don't share question */
  $("input[type='checkbox']").change(function(){ 
    id_checkbox = $(this)[0].id;
    share_question(id_checkbox);
  });

  /* Preview question */
  $("button[data-action='preview']").click(function() {
    id_question = $(this)[0].id;
    preview_question(id_question)
  });
});

function share_question(id_checkbox) {
  $.ajax({
    type: 'POST',
    url: document.location.pathname + "/share/" + id_checkbox,
    headers: {'X-CSRFToken': Cookies.get('csrftoken')},
    dataType: 'json',
  })
  .done(function(data) {
    if (data.code == "dontshare") {
      $("#"+id_checkbox+".codigo").text("");
    } else {
      $("#"+id_checkbox+".codigo").text(data.code);
    }
  })
  .fail(function() {
    Materialize.toast('Un error a ocurrido. Intente nuevamente', 5000, 'rounded');
  });
};

function preview_question(id_question) {
  $.ajax({
    type: "POST",
    url: document.location.pathname,
    headers: {'X-CSRFToken': Cookies.get('csrftoken')},
    data: {
      action: "preview",
      id_question: id_question
    },
    dataType: 'json',
  })
  .done(function(data){
    if (data.result == "error") {
        Materialize.toast(data.message, 3000,'rounded');        
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