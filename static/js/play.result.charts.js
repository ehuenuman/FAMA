var played_formative_chart;
var answer_formative_chart;

function played_formative_chart(total_student, played_student) {
  played_formative_chart = c3.generate({
    bindto: "#students_play_chart",
    data: {
      columns: [
        ['Estudiantes', 0]
      ],
      type: 'gauge'
    },
    gauge: {
      label: {
        format: function(value, ratio) {
          return value;
        }            
      },
      max: total_student,      
      width: 25
    },
    color: {
      pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
      threshold: {
        unit: 'value',    
        values: [total_student*1/4, total_student*2/4, total_student*3/4, total_student]
      }
    },
    size: {
      height: 120,
      width: 150
    },
    padding: {
      bottom: 20
    }
  });

  setTimeout(function () {
    played_formative_chart.load({
        columns: [['Estudiantes', played_student]]
    });
  }, 500);   
};

function answer_formative_chart(total_for_question) {
  for (var i = 0; i < total_for_question.length; i++) {
    total_for_question[i].question = "P"+(i+1);
  }  

  answer_formative_chart = c3.generate({
    bindto: "#students_answer_chart",
    data: {
      json: total_for_question,
      type: "bar",
      groups: [
        ["corrects", "incorrects"]
      ],
      keys: {
        x: "question",
        value: ["corrects", "incorrects"],
      },
      colors: {
        corrects: "#4caf50",
        incorrects: "#f44336"
      },
      names: {
        corrects: "Correctas",
        incorrects: "Incorrectas"
      }
    },
    axis: {
      x: {
        type: "category"
      },
      y: {
        label: {
          text: "Cant. de estudiantes",
          position: 'outer-middle'
        }
      }
    },    
    size: {
      height: 240
    },
    padding: {      
      right: 50
    }
  });
};