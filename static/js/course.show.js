$(document).ready(function() {
  $('.modal').modal({
    complete: function () {
      $("div#add_student table td>input[name^='rut_']").parent().parent().remove(); 
    }
  });
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
});