$(document).ready(function() {
  start_time()
});

function start_time() {
  $.each($(".countdown-play"), function(index, val) {        
    $(val).countdown($(val).data("close-play"))
    .on("update.countdown", function(event) {
      var format = "%M:%S";
      if (event.offset.hours > 0) {
        format = "%H:" + format;
      }
      $(this).html(event.strftime(format));
    })
    .on("finish.countdown", function(event) {
      $(this).html("Cerrada")
        .parent().addClass("disabled");
      document.location.href = document.location.pahtname;
    });
  });
}