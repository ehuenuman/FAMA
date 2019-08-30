var orden_correcto = [];

$(document).ready(function() {
  number = 1;
  
  $(".up,.down").click(function(){ 
        var row = $(this).parents("tr:first");
        if ($(this).is(".up")) {
            row.insertBefore(row.prev());
        } else {
            row.insertAfter(row.next());
        }
  });

  $("#"+number+".respuesta").on('input', function() {//.change(function(){S
        var id = $(this)[0].id;
        xx = $("#"+number+".respuesta").val();
        //console.log("esta es la id de la filaxxx: "+id);
        $("#"+number+".respuestas").val(xx);
        //console.log(xx);
        var resp = $(".respuesta").val();
        resp = accentDecode(resp);
        $(".respuesta")[0].value = resp;
  });

  $("a.reply-btn").click(function(event) {

    inicio = 0;
    $('#tablacopia tr').each(function () {
        var numero_id = $(this)[0].id; 

        if($("#"+numero_id+".check").is(':checked')) {  
            var estado = "activado";
            correcta = numero_id;
        }else{
            var estado = "desactivado";
        }
        //var respuesta = $('#'+numero_id+".respuesta").val();
        var respuesta = "alternativa"+numero_id;
        var puntuacion = $('#'+numero_id+".puntuacion").val();
        //console.log(estado+" id: "+numero_id+" respuesta: "+respuesta+" puntuacion: "+puntuacion);

        orden_correcto[inicio] = respuesta;
        //console.log("orden_correcto: "+orden_correcto[inicio]);
        inicio++;
    });

    //console.log(orden_correcto);

    
      $.ajax({
        url: document.location.pathname,
        type: "POST",
        headers: {"X-CSRFToken": Cookies.get("csrftoken")},
        dataType: "JSON",
        data: {answer: JSON.stringify(orden_correcto)},
      })
      .done(function(data) {
        if (data.data == "OK") {
          Materialize.toast("Respuesta guardada", 1000, "rounded")
        } else {
          Materialize.toast(data.data, 1000, "rounded")
        }
      })
      .fail(function() {
        Materialize.toast("Un error ha ocurrido", 1000, "rounded")
      });

  });
});