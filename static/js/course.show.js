$(document).ready(function() {
  //Click manually option
  $(".modal-content #manually").click(function(event) {
    $(".modal #modal_menu").addClass("hide");
    $("#form_manually").removeClass("hide");
  });
  //Click upload template option
  $(".modal-content #template").click(function(event) {
    $(".modal #modal_menu").addClass("hide");
    $("#form_template").removeClass("hide");
  });

  //Initialize and clear modal
  $('.modal').modal({
    complete: function () {
      $("div#add_student table td>input[name^='rut_']").parent().parent().remove();
      $(".modal #modal_menu").removeClass("hide");
      $("#form_manually").addClass("hide");      
      $("#form_template").addClass("hide");
      $(".file-path-wrapper").addClass("hide");
      $(".modal-footer.row input.file-path").val("");
      $("form button[type='submit'] span").removeClass("hide");
      $("form button[type='submit'] i").addClass("hide");
    }
  });

  //Show name file
  $("input[type='file'").change(function(event) {
    if ($("input[type=file]")[0].files[0] == undefined) {
      $(".file-path-wrapper").addClass("hide");
      $(".modal-footer.row input.file-path").val(""); 
    } else {
      $(".file-path-wrapper input.file-path").val($("input[type=file]")[0].files[0].name);
      $(".file-path-wrapper").removeClass("hide");
    }
  });
  
  //Add input text new student  
  var count = 0;
  $('div#add_student a#add').click(function() {
    var trData = "<tr style='display: none;'>";
       trData += "<td><input name='rut_"+count+"' placeholder='12345678-K' type='text' class='validate' maxlength='15' pattern='[0-9]+-[kK0-9]' required></td>";
       trData += "<td><input name='name_"+count+"' type='text' class='validate' maxlength='100' required></td>";
       trData += "<td><input name='last_name_"+count+"' type='text' class='validate' maxlength='100' required></td>";
       trData += "<td class='center-align'><a class='btn-floating waves-effect waves-light red'><i class='fa fa-minus fa-4x'></i></a></td>";
       trData += "</tr>";
    
    $(trData).insertBefore('div#add_student table>tbody tr:last-child').show('slow');

    $('div#add_student').animate({scrollTop:$('div#add_student table').height()+'px'});
    $('div#add_student table>tbody tr:eq(-2) td:eq(0) input').focus();
    
    $('div#add_student a.btn-floating>i.fa-minus').click(function(event) {
      $(event.target).parents("tr").hide('slow', function() {
        $(event.target).parents("tr").remove();
      });
    });

    count++;
  });

  //Submit manually student list
  $('div#add_student form#form_manually').submit(function(event) {
    event.preventDefault();

    $('form#form_manually button[type="submit"] span').addClass('hide');
    $('form#form_manually button[type="submit"] i').removeClass('hide');

    var form = $( this ).serializeArray();
    //console.log(form);
    var initial_students = $('span#student_count').data('count');  

    var students = [];
    for (var i = 0; i < form.length; i+=3) {
      students.push([form[i]['value'], form[i+1]['value'], form[i+2]['value']]);
    }

    $.ajax({
      url: document.location.pathname+"/agregar-estudiantes",
      type: 'POST',
      headers: {'X-CSRFToken': Cookies.get('csrftoken')},
      dataType: 'json',
      data: {students: students},
    })
    .done(function( data ) {
      fill_student_list(data, initial_students)
    })
    .fail(function() {
      $('div#add_student').modal('close');
      Materialize.toast('Un error a ocurrido. Intento nuevamente', 5000, 'rounded');
    });  
  });

  //Submit csv student list
  $('div#add_student form#form_template').submit(function(event) {
    event.preventDefault();    

    $('form#form_template button[type="submit"] span').addClass('hide');
    $('form#form_template button[type="submit"] i').removeClass('hide');

    var formData = new FormData();
    formData.append('csv_file', $('input[type=file]')[0].files[0]);

    var initial_students = $('span#student_count').data('count');
    
    $.ajax({
      url: document.location.pathname+"/agregar-estudiantes",
      type: 'POST',
      headers: {'X-CSRFToken': Cookies.get('csrftoken')},      
      data: formData,
      contentType: false,
      processData: false,
    })
    .done(function(data) {
      fill_student_list(data, initial_students);
    })
    .fail(function() {
      $('div#add_student').modal('close');
      Materialize.toast('Un error a ocurrido. Intento nuevamente', 5000, 'rounded');
    });    
    
  });
  
});

function fill_student_list(data, initial_students) {

  $.each(data, function(index, val) {
    if (initial_students == 0) {
      $('#list_students').empty().append("<span>Estudiantes inscritos: <span data-count='{{ students.count }}'>{{ students.count }}</span></span>");
      //initial_students++;
    }
     var card = "<div class='card-item col s12 hoverable teal white-text valign-wrapper'>";
        card += "<div class='col s10 left-align'>";
        card += "<span class='col s12'>"+val.rut+"</span>";
        card += "<span class='col s12'>"+val.name+" "+val.last_name+"</span>";
        card += "</div>"
        card += "<a href='!#'' class='col s2'>";
        card += "<div class='valign col s12'>";
        card += "<i class='fa fa-trash-o fa-2x'></i>";
        card += "</div></a></div>";
     $(card).insertAfter('#list_students span>span').fadeIn(800);
  });

  var count = initial_students;
  $('#list_students span>span').html(count+Object.keys(data).length);
  $('#list_students span>span').data('count', count+Object.keys(data).length);
  
  if (Object.keys(data).length == 1) {
    Materialize.toast('Se agregó un nuevo estudiante', 5000, 'rounded')
  } else {
    Materialize.toast('Se agregaron '+Object.keys(data).length+' nuevos estudiantes', 5000, 'rounded')
  }

  $('div#add_student').modal('close');
}