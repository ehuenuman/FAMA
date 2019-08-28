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
  
  texto = texto.replace(/,/g,"&amp;#44;");  
  texto = texto.replace(/:/g,"&amp;#58;");
  texto = texto.replace(/=/g,"&amp;#61;");
  texto = texto.replace(/-/g,"&amp;#45;");
  texto = texto.replace(/_/g,"&amp;#95;");

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

var accentDecode = function (tx)
{
  var rp = String(tx);
  //console.log(rp);
  //
  rp = rp.replace(/&aacute;/g, 'á');
  rp = rp.replace(/&eacute;/g, 'é');
  rp = rp.replace(/&iacute;/g, 'í');
  rp = rp.replace(/&oacute;/g, 'ó');
  rp = rp.replace(/&uacute;/g, 'ú');
  rp = rp.replace(/&ntilde;/g, 'ñ');
  rp = rp.replace(/&uuml;/g, 'ü');
  //
  rp = rp.replace(/&Aacute;/g, 'Á');
  rp = rp.replace(/&Eacute;/g, 'É');
  rp = rp.replace(/&Iacute;/g, 'Í');
  rp = rp.replace(/&Oacute;/g, 'Ó');
  rp = rp.replace(/&Uacute;/g, 'Ú');
  rp = rp.replace(/&Ñtilde;/g, 'Ñ');
  rp = rp.replace(/&Üuml;/g, 'Ü');
  //
  rp = rp.replace(/&iquest;/g, '¿');
  rp = rp.replace(/&iexcl;/g, '¡');
  rp = rp.replace(/&quot;/g, '"');
  rp = rp.replace(/&quot;/g, '“');
  rp = rp.replace(/&quot;/g, '”');
  rp = rp.replace(/&lt;/g, '<');
  rp = rp.replace(/&gt;/g, '>');
  rp = rp.replace(/&#44;/g, ',');
  rp = rp.replace(/&#58;/g, ':');
  rp = rp.replace(/&#61;/g, '=');
  rp = rp.replace(/&#45;/g, '-');
  rp = rp.replace(/&#95;/g, '_');
  //
  //console.log(rp);
  return rp;
};