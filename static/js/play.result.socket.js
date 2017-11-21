socket.onmessage = function(e) {
  var data = JSON.parse(e.data);
  if (data.action == "answer") {
    cell = $("td[data-student='"+data.student+"'][data-question='"+data.question+"'] i");
    console.log(cell);

    if (cell.hasClass("reply") && cell.hasClass("correct")) {  //Estaba correcta
      console.log("Estaba correcta");
      if (data.correct == 0) { //Respondió incorrectamente
        console.log("Respondió incorrectamente");
        cell
          .removeClass('fa-check correct')          
          .addClass("fa-times incorrect");
        var student_total = parseInt(cell.parent().parent().children().last().html());
        if (student_total > 0) {
          cell.parent().parent().children().last().html(student_total-1);
        }
        var questions_corrects = parseInt($("td[data-question='"+data.question+"'] div.corrects").html());        
        if (isNaN(questions_corrects)) {
          $("td[data-question='"+data.question+"'] div.corrects").html(0);
          $("td[data-question='"+data.question+"'] div.incorrects").html(1);
        } else {
          if (questions_corrects > 0) {
            var questions_incorrects = parseInt($("td[data-question='"+data.question+"'] div.incorrects").html());         
            $("td[data-question='"+data.question+"'] div.incorrects").html(questions_incorrects+1);
            $("td[data-question='"+data.question+"'] div.corrects").html(questions_corrects-1);
          }
        }
      }
    } else {
      if (cell.hasClass("reply") && cell.hasClass("incorrect")) { // Estaba incorrecta
        console.log("Estaba incorrecta");
        if (data.correct == 1) { // Respondio correcto
          console.log("Respondió correcto");
          cell
            .removeClass('fa-times incorrect')            
            .addClass("fa-check correct");
          var student_total = parseInt(cell.parent().parent().children().last().html());
          if (student_total >= 0) {
            cell.parent().parent().children().last().html(student_total+1);
          }
          var questions_corrects = parseInt($("td[data-question='"+data.question+"'] div.corrects").html());
          if (isNaN(questions_corrects)) {
            $("td[data-question='"+data.question+"'] div.corrects").html(1);
            $("td[data-question='"+data.question+"'] div.incorrects").html(0);
          } else {
            if (questions_corrects >= 0) {
              var questions_incorrects = parseInt($("td[data-question='"+data.question+"'] div.incorrects").html());
              $("td[data-question='"+data.question+"'] div.corrects").html(questions_corrects+1);  
              $("td[data-question='"+data.question+"'] div.incorrects").html(questions_incorrects-1);            
            }        
          }
        }
      } else { // No se había respondido
        console.log("No había respondido");
        if (data.correct == 0) { // Respondio incorrectamente
          console.log("Respondió incorrectamente");
          cell            
            .removeClass("fa-minus")
            .addClass("fa-times reply incorrect");
          var questions_corrects = parseInt($("td[data-question='"+data.question+"'] div.corrects").html());
          if (isNaN(questions_corrects)) {
            $("td[data-question='"+data.question+"'] div.corrects").html(0);
            $("td[data-question='"+data.question+"'] div.incorrects").html(1);
          } else {          
            var questions_incorrects = parseInt($("td[data-question='"+data.question+"'] div.incorrects").html());
            $("td[data-question='"+data.question+"'] div.incorrects").html(questions_incorrects+1);
          }          
        } else { // Respondio correctamente
          console.log("Respondió correctamente");
          cell
            .removeClass("fa-minus")
            .addClass("fa-check reply correct");            
          var student_total = parseInt(cell.parent().parent().children().last().html());
          if (student_total >= 0) {
            cell.parent().parent().children().last().html(student_total+1);
          }
          var questions_corrects = parseInt($("td[data-question='"+data.question+"'] div.corrects").html());
          if (isNaN(questions_corrects)) {
            $("td[data-question='"+data.question+"'] div.corrects").html(1);
            $("td[data-question='"+data.question+"'] div.incorrects").html(0);
          } else {
            if (questions_corrects >= 0) {
              var questions_incorrects = parseInt($("td[data-question='"+data.question+"'] div.incorrects").html());
              $("td[data-question='"+data.question+"'] div.corrects").html(questions_corrects+1);              
            }
          }
        }
        var question_total = parseInt($("td[data-question='"+data.question+"'] div.total").html());
        $("td[data-question='"+data.question+"'] div.total").html(question_total+1);
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