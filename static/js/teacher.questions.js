$(document).ready(function() {
  /* Preview question */
  $("button[data-action='preview']").click(function() {  
    id_question = $(this)[0].id;
    previewQuestion(id_question)
  });

  /* Download question */
  $("button[data-action='download']").click(function() {
    id_question = $(this)[0].id;
    downloadQuestion(id_question)
  });

  /* Share/don't share question */
  $("input[type='checkbox']").change(function(){ 
    id_checkbox = $(this)[0].id;
    shareQuestion(id_checkbox);
  });
});

function downloadQuestion(id_question) {
  $.ajax({
    type: "POST",
    url: document.location.pathname+"download",
    headers: {'X-CSRFToken': Cookies.get('csrftoken')},
    data: {id_question: id_question},
  })
  .done(function( data, textStatus, jqXHR ) {
    content_type = jqXHR.getResponseHeader("content-type");
    if ( content_type == "text/xml" ) {
      var file = new File([jqXHR.responseText], jqXHR.getResponseHeader("Name"), {type: content_type});
      saveAs(file)
    } else {
      if ( content_type == "application/zip" ) {
        $.fileDownload(document.location.pathname+"download/"+id_question, {
          failCallback: function (html, url) {
            Materialize.toast('Error al obtener la pregunta', 3000, 'rounded');
          }
        }); 
      } else {
        Materialize.toast(data.message, 3000, 'rounded');
      }
    }
  })
  .fail(function( jqXHR, textStatus, errorThrown ) {
    console.log(errorThrown);
    Materialize.toast('Un error ha ocurrido. Intente nuevamente', 3000, 'rounded');
  });
  
  //window.open(document.location.pathname+"/download/"+id_question, "_blank");
};

function previewQuestion(id_question) {  
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
        setVariables(data);
        selectMethod();
    }
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
    Materialize.toast('Un error a ocurrido. Intente nuevamente', 3000, 'rounded');
    console.log(errorThrown);
  });
};



function shareQuestion(id_checkbox) {
  $.ajax({
    type: 'POST',
    url: document.location.pathname + "share/" + id_checkbox,
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