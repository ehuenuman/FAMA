$(document).ready(function() {
  $("li.collection-item").click(function(event) {   
    $(this).children("input")[0].click();
  });

  $("a.reply-btn").click(function(event) {
    if ($("li.collection-item input:checked").length == 1) {
      console.log($("a.reply-btn").data("question"));
      console.log($("a.reply-btn").data("play"));
    } else {
       Materialize.toast("Selecciona una alternativa", 3000, "rounded")
    }
  });
});