$(document).ready(function() {
  $("ul.tabs").tabs();
  $("form#student_log input[name='username']").keyup(function(event) {
    var input = $("form#student_log input[name='username']");    
    var rut = input.val().replace("-", "");
    if (rut.length > 1  ) {
      var sub1 = rut.substring(0, rut.length - 1);
      var sub2 = rut.substring(rut.length - 1);
      input.val(sub1+"-"+sub2);
    } else {
      var rut = input.val().replace("-", "");
      input.val(rut);
    }
  });  
});