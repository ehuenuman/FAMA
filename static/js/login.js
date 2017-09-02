$(document).ready(function() {
  $("form#login_alumno input[name='username']").keyup(function(event) {
    var input = $("form#login_alumno input[name='username']");    
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

function switchForm() {
  if ($("input[type='checkbox']")[0].checked) {
    logTeacher();
  }
  else {
    logStudent();
  }
}

function logTeacher() {
  $("input[type='checkbox']")[0].checked = true;
  $("#login_alumno").hide(1000); 
  $("#login_profesor").show(1000);
}

function logStudent() {
  $("input[type='checkbox']")[0].checked = false;
  $("#login_profesor").hide(1000);
  $("#login_alumno").show(1000);    
}