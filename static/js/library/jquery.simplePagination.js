(function($){
  $.fn.simplePagination = function(perPage, opened, onClass, paginationSelector){
    var element = this;
    var no_children = element.children().length;
    var pagination = $(paginationSelector);

    if (no_children < perPage) {
      pagination.hide();
      return;
    }

    function doNothing() {
      return false;
    }

    // ------------------------- auto generate the pagination ------------------------- //
    var no_pages = Math.ceil(no_children / perPage);
    var to_append = '<ul><li class="prev"><a href="#"><i class="fa fa-angle-left" aria-hidden="true"></i></a></li>';
    for (i = 1; i <= no_pages; i++) {
      to_append += '<li class="waves-effect';
      if (i === opened) {
        to_append += ' '+onClass;
      }
      to_append += '"><a href="#"><span>'+i+'</span></a></li>';
    }
    to_append += '<li class="next"><a href="#"><i class="fa fa-angle-right" aria-hidden="true"></i></a></li></ul>';
    if (opened !== 1) {
      if (opened === no_pages) {
        pagination.find('.next').find('span').unwrap().wrap('<span></span>');
      }
      var greater_than = (opened - 1) * perPage;
      var less_than = opened * perPage;
      element.children(':lt('+(greater_than+1)+')').hide();
      element.children(':gt('+(less_than-1)+')').hide();
      element.children().slice(greater_than,less_than).show();
    } else {
      element.children(':gt('+(perPage-1)+')').hide();
    }
    pagination.append(to_append);

    pagination.find("li.active").find("a").bind("click", doNothing);

    // ------------------------- hide the 'prev' button if the first page is active ------------------------- //
    if (pagination.find('.'+onClass).index() == 1) {
      pagination.find('.prev').addClass('disabled'); //find('span').hide();
    }

    // ------------------------- hide the 'next' button if the last page is active ------------------------- //
    if (pagination.find('.'+onClass).index() == no_pages) {
      pagination.find('.next').addClass('disabled')
    }

    // ------------------------- the function for click on 'next' button ------------------------- //
    function nextClick() {
      if (!pagination.find('.'+onClass).next().hasClass('next')) {
        pagination.find('.'+onClass).next().addClass(onClass).find("a").unbind().bind("click", doNothing).parent().prev().removeClass(onClass).find("a").unbind().bind("click", pageNumberClick);
        if (pagination.find('.'+onClass).index() == 2) {
          pagination.find('.prev').removeClass('disabled');
        }
        if (pagination.find('.'+onClass).index() == no_pages) {
          pagination.find('.next').addClass('disabled');
        }
        var greater_than = ((pagination.find('.'+onClass).index() - 1) * perPage) - 1;
        var less_than = pagination.find('.'+onClass).index() * perPage;
        element.children(':lt('+(greater_than+1)+')').hide();
        element.children(':gt('+(less_than-1)+')').hide();
        element.children().slice(greater_than+1,less_than).show();
      }
      return false;
    }

    // ------------------------- the function for click on 'prev' button ------------------------- //
    function prevClick() {
      if (!pagination.find('.'+onClass).prev().hasClass('prev')) {
        pagination.find('.'+onClass).prev(":not(.prev)").addClass(onClass).find("a").unbind().bind("click", doNothing).parent().next().removeClass(onClass).removeClass(onClass).find("a").unbind().bind("click", pageNumberClick);
        if (pagination.find('.'+onClass).index() < no_pages) {
          pagination.find('.next').removeClass('disabled');
        }
        if (pagination.find('.'+onClass).index() === 1) {
          pagination.find('.prev').addClass('disabled')
        }
        var lesser_than = ((pagination.find('.'+onClass).index() - 1) * perPage) - 1;
        var less_than = (pagination.find('.'+onClass).index()) * perPage;
        var greater_than = pagination.find('.'+onClass).index() * perPage;
        element.children(':lt('+(lesser_than+1)+')').hide();
        element.children(':gt('+(less_than-1)+')').hide();
        element.children().slice(lesser_than+1,less_than).show();
      }
      return false;
    }

    // ------------------------- click on 'next' button ------------------------- //
    pagination.find('.next').find('a').click(nextClick);

    // ------------------------- click on 'prev' button ------------------------- //
    pagination.find('.prev').find('a').click(prevClick);

    // ------------------------- click on a number of a page ------------------------- //
    function pageNumberClick() {
      var asta = $(this);
      if (asta.parent().index() === 1) {
        pagination.find('.prev').addClass('disabled');
      } else {
        pagination.find('.prev').removeClass('disabled');
      }
      if (asta.parent().index() === no_pages) {
        pagination.find('.next').addClass('disabled');
      } else {
        pagination.find('.next').removeClass('disabled')
      }
      pagination.find('.'+onClass).removeClass(onClass).find("a").unbind().bind("click", pageNumberClick);
      asta.parent().addClass(onClass).find("a").unbind().bind("click", doNothing);
      var greater_than = ((asta.parent().index() - 1) * perPage) - 1;
      var less_than = pagination.find('.'+onClass).index() * perPage;
      element.children(':lt('+(greater_than+1)+')').hide();
      element.children(':gt('+(less_than-1)+')').hide();
      element.children().slice(greater_than+1,less_than).show();
      return false;
    }

    pagination.find('li:not(.prev,.next,.on)').find('a').bind("click", pageNumberClick);
  };
})(jQuery);