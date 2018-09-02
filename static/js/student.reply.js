$(document).ready(function() {
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
});