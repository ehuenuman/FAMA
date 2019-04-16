$(document).ready(function() {
  $("button[data-action='delete']").click(function() {
    var opcion = confirm("¿Desea eliminar el curso?");
    if (opcion == true) {
      var id_course = $(this)[0].id;
      deleteCourse(id_course);
    } else {
      Materialize.toast(
        "Cancelo la acción de eliminar el curso",
        3000,
        "rounded"
      );
    }
  });

  function deleteCourse(id_course) {
    $.ajax({
      type: "POST",
      url: document.location.pathname + "delete/",
      headers: { "X-CSRFToken": Cookies.get("csrftoken") },
      data: {
        action: "delete",
        id_course: id_course
      },
      dataType: "json"
    })
      .done(function(data) {
        if (data.result == "error") {
          Materialize.toast(data.message, 3000, "rounded");
        } else {
          Materialize.toast("Borrado exitoso", 3000, "rounded");
          document.location.reload();
        }
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        Materialize.toast(
          "Un error a ocurrido. Intente nuevamente",
          3000,
          "rounded"
        );
        console.log(errorThrown);
      });
  }
});
