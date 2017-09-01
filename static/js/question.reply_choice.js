$(document).ready(function() {
  $("li.collection-item").click(function(event) {   
    $(this).children("input")[0].click();
  });

  $('#timer').countdown($("#timer").data("limit-time"))
  .on('update.countdown', function(event) {
    var format = '%H:%M:%S';
    if(event.offset.totalDays > 0) {
      format = '%-d day%!d ' + format;
    }
    if(event.offset.weeks > 0) {
      format = '%-w week%!w ' + format;
    }
    $(this).html(event.strftime(format));
  })
  .on('finish.countdown', function(event) {
    $(this).html('Tiempo Completado')
      .parent().addClass('disabled');

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