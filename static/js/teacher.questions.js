$(document).ready(function() {
  /* Share/don't share question */
  $("input[type='checkbox']").change(function(){ 
    id_checkbox = $(this)[0].id;
    share(id_checkbox);
  });
});

function share(id_checkbox) {
  $.ajax({
    url: document.location.pathname + "/share/" + id_checkbox,
    type: 'POST',
    headers: {'X-CSRFToken': Cookies.get('csrftoken')},
    dataType: 'json',
  })
  .done(function(data) {
    if (data.code == "dontshare") {
      $("#"+id_checkbox+".codigo").text("");
    } else {
      $("#"+id_checkbox+".codigo").text(data.code);
    }
  })
  .fail(function() {
    Materialize.toast('Un error a ocurrido. Intente nuevamente', 5000, 'rounded');
  });
};