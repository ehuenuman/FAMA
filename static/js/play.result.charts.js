var played_formative_chart;
function played_formative_chart(total_student, played_student) {
  played_formative_chart = c3.generate({
    bindto: "#students_play_chart",
    data: {
      columns: [
        ['Estudiantes', 0]
      ],
      type: 'gauge'
    },
    padding: {
      bottom: 20
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
    }
  });

  setTimeout(function () {
    played_formative_chart.load({
        columns: [['Estudiantes', played_student]]
    });
  }, 500);   
}