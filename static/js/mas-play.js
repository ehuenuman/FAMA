$(document).ready(function(){
  // Initialize collapse button
  $(".button-collapse").sideNav();
  // Initialize collapsible (uncomment the line below if you use the dropdown variation)
  $('.collapsible-header').collapsible();

  $('.button-collapse').sideNav({
    menuWidth: 240, // Default is 240
      //edge: 'left', // Choose the horizontal origin
      //closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true // Choose whether you can drag to open on touch screens
  }); 
});

function remplazarCaracteresEspeciales(texto) {
  texto = texto.replace(/&/g,"&amp;");
  texto = texto.replace(/"/g,"&amp;quot;");
  texto = texto.replace(/“/g,"&amp;quot;");
  texto = texto.replace(/”/g,"&amp;quot;");    
  texto = texto.replace(/'/g,"&amp;apos;");
  texto = texto.replace(/</g,"&amp;lt;");
  texto = texto.replace(/>/g,"&amp;gt;");
  texto = texto.replace(/¿/g,"&amp;iquest;");
  texto = texto.replace(/¡/g,"&amp;iexcl;");
  texto = texto.replace(/á/g,"&amp;aacute;");
  texto = texto.replace(/Á/g,"&amp;Aacute;");
  texto = texto.replace(/é/g,"&amp;eacute;");
  texto = texto.replace(/É/g,"&amp;Eacute;");
  texto = texto.replace(/í/g,"&amp;iacute;");
  texto = texto.replace(/Í/g,"&amp;Iacute;");
  texto = texto.replace(/ó/g,"&amp;oacute;");
  texto = texto.replace(/Ó/g,"&amp;Oacute;");
  texto = texto.replace(/ú/g,"&amp;uacute;");
  texto = texto.replace(/ü/g,"&amp;uuml;");
  texto = texto.replace(/Ú/g,"&amp;Úacute;");
  texto = texto.replace(/Ü/g,"&amp;Uuml;");  
  texto = texto.replace(/ñ/g,"&amp;ntilde;");
  texto = texto.replace(/Ñ/g,"&amp;Ntilde;");
  texto = texto.replace(/\r\n|\r|\n/g,'<br/>');      
  // texto =texto.replace(/ /g,"&#160;");
  texto = texto.replace(/\+/g,"+"); //revisar

  return texto;
}