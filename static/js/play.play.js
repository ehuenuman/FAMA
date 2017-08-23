$(document).ready(function() {
  $(".stop-formative").click(function(event) {
    //console.log($(event.currentTarget).parent().parent().detach());
    $.ajax({
      url: "/play/stop",
      type: "POST",
      headers: {'X-CSRFToken': Cookies.get('csrftoken')},
      dataType: "json",
      data: {
        playId: $(event.currentTarget).data("play-id")
      },
    })
    .done(function(data) {
      if (data.data == "OK") {
        document.location.href = document.location.pathname;
      } else {}      

    })
    .fail(function() {
      console.log("error");
    });
  });      
});