var listCoursesReady = false;
var formativeID;
var courseID;
var formativeTime;

$(document).ready(function(){
    
  $("a.start-formative").click(function(event) {
    if (listCoursesReady == false) {
      $.ajax({
        url: $(event.currentTarget).data("url"),
        type: "POST",
        headers: {'X-CSRFToken': Cookies.get('csrftoken')},
        dataType: "json",   
      })
      .done(function(data) {
        $.each(data, function(index, course) {
          var html = '<div class="col s12 m6">'
             html += '<div class="card-item col s12 hoverable click" data-course-id='+index+'>';
             html += '<span class="col s12">'+course.code+'</span>';
             html += '<span class="col s12">'+course.name+'</span>';           
             html += '</div></div>';

           $(".step-2 .row.last-row.course-list").append(html);
        });

        $.each($(".step-2 .row.last-row.course-list .card-item"), function(index, val) {
          $(val).click(function(event) {            
            courseID = $(event.currentTarget).data('course-id');
            $(".step-2 .row.last-row.course-list .card-item").removeClass("active");
            $(event.currentTarget).addClass("active");
            $(".modal-footer.row button.next").removeClass("disabled");
          });
        });
      })
      .fail(function(jqXHR, textStatus, e) {
        console.log("error: " + e);
      });

      listCoursesReady = true;
    }

    if ($(event.currentTarget).data("formative-name") != undefined) {
      formativeID = $(event.currentTarget).data("formative-id");
      $(".modal#start_formative .formative-name").text($(event.currentTarget).data("formative-name"));
      $(".step-2").removeClass("hide");
      $(".modal-footer.row button.next").data("next", "step-3");
    } else {
      $(".step-1").removeClass("hide");
    }

    $("#start_formative.modal").modal("open", {
      dismissible: false,
      complete: function() { 
        $(".step-1, .step-2, .step-3").addClass("hide");
        $(".step-2 .row.last-row.course-list .card-item").removeClass("active");
        $(".step-3 .row.last-row .card-item").removeClass("active");
        $(".modal-footer.row button.next").addClass("disabled").text("Continuar").removeClass("hide");
        formativeID = "";
        courseID = "";
        formativeTime = "";
      }
    });

  });  
  
  $(".modal-footer.row button.next").click(function(event) {
    $(".step-1, .step-2, .step-3").addClass("hide");
    var next = $(event.currentTarget).data("next");
    $(".modal-footer.row button.next").addClass("disabled");
    $("."+next).removeClass("hide");
    if (next == "step-2") {
      $(".modal-footer.row button.next").data("next", "step-3");
    } else {
      if (next == "step-3") {
        $(".modal-footer.row button.next").data("next", "play").text("Comenzar formativa");
      } else { //play
        $("#start_formative.modal").modal("close");
        startFormative($(event.currentTarget).data("url"))
      }
    }
  });

  $(".step-3 .row.last-row .card-item").click(function(event) {
    formativeTime = $(event.currentTarget).data("time");
    $(".step-3 .row.last-row .card-item").removeClass("active");
    $(event.currentTarget).addClass("active");
    $(".modal-footer.row button.next").removeClass("disabled");
  });
});

function startFormative(url) {
  $.ajax({
    url: url,
    type: "POST",
    headers: {'X-CSRFToken': Cookies.get('csrftoken')},    
    data: {
      "course": courseID,
      "formative": formativeID,
      "time": formativeTime
    },
  })
  .done(function(data) {
    console.log(data);
    document.location.href = data.redirect;
    /*$("tbody.list-play").append(""
      + "<tr>"
      + "<td>"+data.course+"</td>"
      + "<td>"+data.formative+"</td>"
      + "<td>"+data.duration+"</td>"
      + "<td class='countdown-play' data-close-play='"+data.close_play+"'></td>"
      + "</tr>");
    start_time();
    */
  })
  .fail(function(jqXHR, textStatus, e) {
    console.log("error: "+e);
  });  
}