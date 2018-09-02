$(document).ready(function () {
  /* Filter */
  (function ($) {
    $('#search-input').keyup(function () {
      var rex = new RegExp($(this).val(), 'i');
      $('ul#list-question-for-formative.collection li').hide();
      $('ul#list-question-for-formative.collection li').filter(function () {
        return rex.test($(this).text());
      }).show();
    })
  }(jQuery));
  
  /* Drag and Drop */
  $( function() {
    $( "#formative-questions, #list-question-for-formative" ).sortable({
      connectWith: ".connectedSortable",
      items: "> li",
      scroll: true,
      revert: true,
      placeholder: "place-holder",
      forcePlaceholderSize: true,
      start: function(event, ui) {
        $('#formative-questions').addClass('over');
      },
      over: function(event, ui) {
        if ( event.target.id == 'formative-questions' ) {
          if ( $('#formative-questions li').length == 1 ) {
            hideInstructionsDropZone();
          }
        }
      },
      out: function(event, ui) {
        if ( event.target.id == 'formative-questions' ) {
          if ( event.originalEvent.type == 'mousemove' && $('#formative-questions li').length == 1 ) {
            showInstructionsDropZone();
          }
        }
      },
      stop: function(event, ui) {
        $('#formative-questions').removeClass('over');
        if ( $('#formative-questions li').length == 0 ) {
          showInstructionsDropZone();
        }
      },
    }).disableSelection();
  });

  /* Send form */
  $('form#form-new-formative').submit(function(event) {
    event.preventDefault();

    var questions = [];
    $.each($('ul#formative-questions li'), function(index, val) {
       questions.push(val.dataset.id);
    });

    var data = $('form#form-new-formative').serializeArray();

    $.ajax({
      url: document.location.pathname,
      type: 'POST',
      headers: {'X-CSRFToken': Cookies.get('csrftoken')},
      dataType: 'json',
      data: {name: data[1].value, description: data[2].value, questions: questions},
    })
    .done(function(data) {
      document.location.href = "/fama"+data.redirect;
    })
    .fail(function() {
      Materialize.toast('Un error a ocurrido. Intente nuevamente', 5000, 'rounded')
    });
  });

});

function hideInstructionsDropZone() {
  $('#formative-questions h5').hide();
  $('#formative-questions').removeClass('valign-wrapper');
  $('#formative-questions').removeClass('center-align');
}

function showInstructionsDropZone() {  
  $('#formative-questions').addClass('valign-wrapper');
  $('#formative-questions').addClass('center-align');
  $('#formative-questions h5').show();
}