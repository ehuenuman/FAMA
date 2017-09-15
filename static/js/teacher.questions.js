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

  /* Download question */
  $("button[data-action='download']").click(function() {
    id_question = $(this)[0].id;
    download_question(id_question)
  });
});

function share_question(id_checkbox) {
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

function download_question(id_question) {
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
        /*
        console.log(jqXHR)
        console.log(jqXHR.getAllResponseHeaders())
        console.log(data)
        console.log(data.length);
        var buffer = new Uint8Array(str2bytes(data)).buffer;
        var blob = new Blob([buffer], {type: content_type});
        console.log(blob.size);
        saveAs(blob, jqXHR.getResponseHeader("Name"));
        */
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

function str2bytes (str) {
    /*
    var bytes = new Uint8Array(str.length);
    for (var i=0; i<str.length; i++) {
        bytes[i] = str.charCodeAt(i);
    }
    */
    var bytes = []; // char codes
    var bytesv2 = []; // char codes

    for (var i = 0; i < str.length; ++i) {
      var code = str.charCodeAt(i);

      bytes = bytes.concat([code]);

      bytesv2 = bytesv2.concat([code & 0xff, code / 256 >>> 0]);
    }

    // 72, 101, 108, 108, 111, 31452
    //console.log('bytes', bytes.join(', '));

    // 72, 0, 101, 0, 108, 0, 108, 0, 111, 0, 220, 122
    //console.log('bytesv2', bytesv2.join(', '));
    return bytesv2;
}
