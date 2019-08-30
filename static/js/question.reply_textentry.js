$(document).ready(function() {
  
  var resp = $(".previo.collection-item.center-align")[0].innerText;
  resp = accentDecode(resp);
  $(".previo.collection-item.center-align")[0].innerText = resp;
  
  $("a.reply-btn").click(function(event) {
    
    //console.log($('li.collection-item input').val());

      $.ajax({
        url: document.location.pathname,
        type: "POST",
        headers: {"X-CSRFToken": Cookies.get("csrftoken")},
        dataType: "JSON",
        data: {answer: $('li.collection-item input').val()},
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