$('#nav ul').hide();

$('#nav li > a').hover(
  function () {
    //show its submenu
    $(this).parent().children('ul').stop().slideDown(100);
  }
);
$('#nav li').hover(null,
  function (e) {
    //hide its submenu
    $(this).children('ul').stop().slideUp(100);
  }
);
