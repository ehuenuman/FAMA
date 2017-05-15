jQuery(document).ready(function(){
  $("#validar_cuenta").submit(validar_cuenta);
});

function validar_cuenta(){
username = $("#email").val();
password = $("#password").val();
$.ajax({
  type: "POST",
  url: "login.php",
  data: "name="+username+"&pwd="+password,
  success: function(data){
      if(data=='true')
      {
      //console.log("true");
          window.location="choice.php";       
      }
      if(data == 'false')
      {
       //console.log("falso");
          $("#message_error").html("Correo o contraseña incorrectos");
          Materialize.toast('Correo o contraseña incorrectos', 3000,'rounded');
          //$("#message_error").style().fadeOut(5000);
      }
   },
});
return false;
}     

function switchForm(){
  if (document.getElementById("check").checked) {
    $("#login_alumno").hide(1000); 
    $("#login_profesor").show(1000);    
  }
  else {
    $("#login_profesor").hide(1000);
    $("#login_alumno").show(1000);    
  }
  
}