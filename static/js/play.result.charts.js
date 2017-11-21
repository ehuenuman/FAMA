var played_formative_chart;
var answer_formative_chart;
var end_formative_chart;

var finished_student = [];

function setup_played_formative_chart(total_student, played_student) {
  played_formative_chart = c3.generate({
    bindto: "#students_start_chart",
    data: {
      columns: [
        ['Iniciaron', 0]
      ],
      type: 'gauge'
    },
    gauge: {
      label: {
        format: function(value, ratio) {
          return value;
        },
        show: false // to turn off the min/max labels.
      },
      max: total_student,
      width: 25
    },
    tooltip: {
      show: false,
    },
    color: {
      pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
      threshold: {
        unit: 'value',    
        values: [total_student*1/4, total_student*2/4, total_student*3/4, total_student]
      }
    },
    size: {
      height: 80,
      width: 140
    },
    padding: {
      bottom: 5
    }
  });  

  setTimeout(function () {
    played_formative_chart.load({
        columns: [['Iniciaron', played_student]]
    });
  }, 500);  
};


function setup_finished_formative_chart(total_student, end_student, id_students) {
  finished_student = id_students;
  end_formative_chart = c3.generate({
    bindto: "#students_end_chart",
    data: {
      columns: [
        ['Terminaron', 0]
      ],
      type: 'gauge'
    },
    gauge: {
      label: {
        format: function(value, ratio) {
          return value;
        },
        show: false // to turn off the min/max labels.
      },
      max: total_student,
      width: 25
    },
    tooltip: {
      show: false,
    },
    color: {
      pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
      threshold: {
        unit: 'value',    
        values: [total_student*1/4, total_student*2/4, total_student*3/4, total_student]
      }
    },
    size: {
      height: 80,
      width: 140
    },
    padding: {
      bottom: 5
    }
  });  

  setTimeout(function () {
    end_formative_chart.load({
        columns: [['Terminaron', end_student]]
    });
  }, 500);  
};

function setup_answer_formative_chart(total_for_question) {
  temp = [];
  for (var i = 0; i < total_for_question.length; i++) {
    total_for_question[i].question = "P"+(i+1);
    temp.push({question: "P"+(i+1), corrects: 0, incorrects: 0});
  }  
  
  answer_formative_chart = c3.generate({
    bindto: "#students_answer_chart",
    data: {
      json: temp,
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
      right: 15,
      top: 5
    }
  });

  setTimeout(function () {
    answer_formative_chart.load({
      json: total_for_question,
      keys: {
        x: "question",
        value: ["corrects", "incorrects"],
      }    
    });
  }, 500);
};