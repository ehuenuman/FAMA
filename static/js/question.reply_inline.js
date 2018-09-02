$(document).ready(function() {
  
  $("a.reply-btn").click(function(event) {
    
    //console.log($("select option:selected").val());
    var resp = "alternativa"+$("select option:selected").val();
    //console.log(resp);    

    $.ajax({
      url: document.location.pathname,
      type: "POST",
      headers: {"X-CSRFToken": Cookies.get("csrftoken")},
      dataType: "JSON",
      data: {answer: resp},
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