socket.onmessage = function(e) {
  var data = JSON.parse(e.data);
  if (data.action == "answer") {
    var cell = $("td[data-student='"+data.student+"'][data-question='"+data.question+"'] i");

    if (cell.hasClass("reply correct")) {  //Era correcta
      if (data.correct == 0) { //Respondió incorrectamente
        cell
          .removeClass('fa-check correct')          
          .addClass("fa-times incorrect");
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
            .removeClass('fa-times incorrect')            
            .addClass("fa-check correct");
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
            .removeClass("fa-minus")
            .addClass("fa-times reply incorrect");
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
            .removeClass("fa-minus")
            .addClass("fa-check reply correct");            
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
    answer_formative_chart.load({
      json: data.total_for_question,
      keys: {
        x: "question",
        value: ["corrects", "incorrects"],
      }
    });

    if (data.add_finish) {      
      if (finished_student.indexOf(data.student) == -1) {
        finished_student.push(data.student)
        end_formative_chart.load({
            columns: [['Terminaron', end_formative_chart.data.values("Terminaron")[0] + 1]]
        });
      }
    }
  } else {
    played_formative_chart.load({
        columns: [['Iniciaron', data.played_students]]
    });
  }
};

// Call onopen directly if socket is already open
if (socket.readyState == WebSocket.OPEN) socket.onopen();