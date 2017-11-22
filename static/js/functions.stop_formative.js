$(document).ready(function() {
  
  var playId;
  var url;
  $(".btn.stop-formative").click(function(event) {
    playId = $(event.currentTarget).data("play-id");
    url = $(event.currentTarget).data("url");
    $(".modal.stop-formative").modal("open", {
      dismissible: false,      
      endingTop: '20%'
    });
  });

  $(".modal.stop-formative a.stop-formative").click(function(event) {    
    $.ajax({
      url: url,
      type: "POST",
      headers: {'X-CSRFToken': Cookies.get('csrftoken')},
      dataType: "json",      
      data: { playId: playId },
    })
    .done(function(data) {      
      if (data.data == "OK") {
        document.location.href = document.location.pathname;
      } 
    })
    .fail(function(jqXHR, textStatus, e) {
      console.log("Error:", e);
    });
  });

});