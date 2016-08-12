$(function () {
    console.log('DOM loaded with jQuery - short version');

    var links = $('.menu a');
    links.on('click', function (e) {
        e.preventDefault(); // prevent default behavior of the link
                            // e is the event that called our function

        var submenu = $(this).siblings('.submenu');
        //submenu.show();
        //submenu.toggle();
        submenu.slideToggle();
    });
});
