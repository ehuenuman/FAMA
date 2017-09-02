$(document).ready(function() {
  $("li.collection-item").click(function(event) {   
    $(this).children("input")[0].click();
  });

  $("a.reply-btn").click(function(event) {
    if ($("li.collection-item input:checked").length == 1) {
      $.ajax({
        url: document.location.pathname,
        type: 'POST',
        headers: {'X-CSRFToken': Cookies.get('csrftoken')},
        dataType: "JSON",
        data: {answer: $("li.collection-item input:checked")[0].id},
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
    } else {
       Materialize.toast("Selecciona una alternativa", 1000, "rounded")
    }
  });
});