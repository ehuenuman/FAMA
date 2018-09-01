$(document).ready(function() {
  
  $("a.reply-btn").click(function(event) {
    
    var correctas = [];
    $('#answers_table tbody').each(function () {
      
      $('select option:selected').each(function() {
        //console.log($(this).text() + ' ' + $(this).val());
        correctas.push("alternativa"+$(this).val())
      });   
    });
    //console.log(JSON.stringify(correctas));

    $.ajax({
      url: document.location.pathname,
      type: "POST",
      headers: {"X-CSRFToken": Cookies.get("csrftoken")},
      dataType: "JSON",
      data: {'correctas': JSON.stringify(correctas)},
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