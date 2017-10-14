function selectMethod() {  
  if (question_type == "choice" ) {    
    processingChoiceData();
  };
  if (question_type == "order" ) {
    procesar_order_datos();
  };
  if (question_type == "inline choice" ) {
    procesar_inlinechoice_datos();
  };
  if (question_type == "text entry" ) {
    procesar_textentry_datos();
  };
  if (question_type == "slider" ) {
    procesar_slider_datos();  
  };
  if (question_type == "associate" ) {
    procesar_associate_datos();  
  };
  if (question_type == "hotspot" ) {
    procesar_hotspot_datos();  
  };
}

function processingChoiceData() {  
  loadModalChoiceData()
};


/*#################################################################################################################
Unused Functions

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

#################################################################################################################*/