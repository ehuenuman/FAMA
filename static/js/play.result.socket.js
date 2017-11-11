socket.onmessage = function(e) {
  var data = JSON.parse(e.data);
  if (data.action == "answer") {
    var cell = $("td[data-student='"+data.student+"'][data-question='"+data.question+"']");

    if (cell.hasClass("reply correct")) {  //Era correcta
      if (data.correct == 0) { //Respondió incorrectamente
        cell
          .removeClass('correct')
          .empty()
          .addClass("incorrect")
          .append('<i class="fa fa-times fa-lg" aria-hidden="true"></i>');
        var student_total = parseInt(cell.parent().children().last().html());
        if (student_total > 0) {
          cell.parent().children().last().html(student_total-1);
        }
        var questions_corrects = parseInt($("td[data-question='"+data.question+"'] div.corrects span").html());
        if (isNaN(questions_corrects)) {
          $("td[data-question='"+data.question+"'] div.corrects span").html(0);
          $("td[data-question='"+data.question+"'] div.incorrects span").html(1);
        } else {
          if (questions_corrects > 0) {
            var questions_incorrects = parseInt($("td[data-question='"+data.question+"'] div.incorrects span").html());         
            $("td[data-question='"+data.question+"'] div.incorrects span").html(questions_incorrects+1);
            $("td[data-question='"+data.question+"'] div.corrects span").html(questions_corrects-1);
          }
        }
      }
    } else {
      if (cell.hasClass("reply incorrect")) { // Estaba incorrecta
        if (data.correct == 1) { // Respondio correcto
          cell
            .removeClass('incorrect')
            .empty()
            .addClass("correct")
            .append('<i class="fa fa-check fa-lg" aria-hidden="true"></i>');
          var student_total = parseInt(cell.parent().children().last().html());
          if (student_total >= 0) {
            cell.parent().children().last().html(student_total+1);
          }
          var questions_corrects = parseInt($("td[data-question='"+data.question+"'] div.corrects span").html());
          if (isNaN(questions_corrects)) {
            $("td[data-question='"+data.question+"'] div.corrects span").html(1);
            $("td[data-question='"+data.question+"'] div.incorrects span").html(0);
          } else {
            if (questions_corrects >= 0) {
              var questions_incorrects = parseInt($("td[data-question='"+data.question+"'] div.incorrects span").html());
              $("td[data-question='"+data.question+"'] div.corrects span").html(questions_corrects+1);  
              $("td[data-question='"+data.question+"'] div.incorrects span").html(questions_incorrects-1);            
            }        
          }
        }
      } else { // No se había respondido
        if (data.correct == 0) { // Respondio incorrectamente
          cell            
            .empty()
            .addClass("center-align reply incorrect")
            .append('<i class="fa fa-times fa-lg" aria-hidden="true"></i>');          
          var questions_corrects = parseInt($("td[data-question='"+data.question+"'] div.corrects span").html());
          if (isNaN(questions_corrects)) {
            $("td[data-question='"+data.question+"'] div.corrects span").html(0);
            $("td[data-question='"+data.question+"'] div.incorrects span").html(1);
          } else {
            var questions_incorrects = parseInt($("td[data-question='"+data.question+"'] div.incorrects span").html());         
            $("td[data-question='"+data.question+"'] div.incorrects span").html(questions_incorrects+1);
          }
        } else { // Respondio correctamente
          cell
            .empty()
            .addClass("center-align reply correct")
            .append('<i class="fa fa-check fa-lg" aria-hidden="true"></i>');
          var student_total = parseInt(cell.parent().children().last().html());
          if (student_total >= 0) {
            cell.parent().children().last().html(student_total+1);
          }
          var questions_corrects = parseInt($("td[data-question='"+data.question+"'] div.corrects span").html());
          if (isNaN(questions_corrects)) {
            $("td[data-question='"+data.question+"'] div.corrects span").html(1);
            $("td[data-question='"+data.question+"'] div.incorrects span").html(0);
          } else {
            if (questions_corrects >= 0) {
              var questions_incorrects = parseInt($("td[data-question='"+data.question+"'] div.incorrects span").html());
              $("td[data-question='"+data.question+"'] div.corrects span").html(questions_corrects+1);              
            }
          }
        }
      }
    }
  } else {
    played_formative_chart.load({
        columns: [['Estudiantes', data.played_students]]
    });
  }
}

// Call onopen directly if socket is already open
if (socket.readyState == WebSocket.OPEN) socket.onopen();