function select_method() {
  if (tipo_pregunta == "choice" ) {  
    procesar_choice_datos();
  };
  if (tipo_pregunta == "order" ) {
    procesar_order_datos();
  };
  if (tipo_pregunta == "inline choice" ) {
    procesar_inlinechoice_datos();
  };
  if (tipo_pregunta == "text entry" ) {
    procesar_textentry_datos();
  };
  if (tipo_pregunta == "slider" ) {
    procesar_slider_datos();  
  };
  if (tipo_pregunta == "associate" ) {
    procesar_associate_datos();  
  };
  if (tipo_pregunta == "hotspot" ) {
    procesar_hotspot_datos();  
  };
}

function procesar_choice_datos(){
  extrear_datos_xml_choice();
  if (extension == "zip") {
    extrear_datos_imsmanifest();   
    cargar_datos_modal_choice();
    eliminar_carpeta_zip()
  } else {
    cargar_datos_modal_choice();
  }
};

function procesar_order_datos() {
  extraer_datos_xml_order();              
  extrear_datos_imsmanifest();
  cargar_datos_modal_order();
};

function procesar_inlinechoice_datos() {
  extraer_datos_xml_inlinechoice();              
  extrear_datos_imsmanifest();
  cargar_datos_modal_inlinechoice();  
};

function procesar_textentry_datos(){
  extraer_datos_xml_textentry();              
  extrear_datos_imsmanifest();
  cargar_datos_modal_textentry();
};

function procesar_slider_datos(){
  extraer_datos_xml_slider();              
  extrear_datos_imsmanifest();
  cargar_datos_modal_slider();
};

function procesar_associate_datos(){
  extraer_datos_xml_associate();              
  extrear_datos_imsmanifest();
  cargar_datos_modal_associate();
};

function procesar_hotspot_datos(){
  extraer_datos_xml_hotspot();              
  extrear_datos_imsmanifest();
  cargar_datos_modal_hotspot();
};