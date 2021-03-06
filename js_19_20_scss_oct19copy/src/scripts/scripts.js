$(function () {
    console.log('DOM loaded with jQuery - short version');

    $('.alexcarousel').alexcarousel({
        numberOfImages: '1',
        backgroundColor: 'rgba(255,255,255,0.5)'
    });

    $('.article span').hover(
        function () {
            $(this).children('i').css("color", "#9a9fa2");
            $(this).children('a').css("color", "#268df4");
        },
        function () {
            $(this).children('i').css("color", "#268df4");
            $(this).children('a').css("color", "black");
        }
    );

    $('.slide').hover(
        function () {
            $(this).children('figure').children('.image-container').children('.slide-image-hover').css("display", "block");
            $(this).children('figure').children('.image-container').children('.slide-image-hover__cross').css("display", "block");
            $(this).children('figure').children('figcaption').css("color", "#f6b60e");
        },
        function () {
            $(this).children('figure').children('.image-container').children('.slide-image-hover').css("display", "none");
            $(this).children('figure').children('.image-container').children('.slide-image-hover__cross').css("display", "none");
            $(this).children('figure').children('figcaption').css("color", "white");
        }
    );

    $('.panel').on('click', function (event) {

        // we should not do anything if text clicked, only if panel clicked
        if (!$(event.target).hasClass('panel-text') && event.target.tagName != "P") {

            // check which panel was clicked, white or orange
            var whitePanel = $(this).children('.panel-navigation--default');

            if (whitePanel.length) {
                $(this).find('.panel-navigation__plus--default').css("border-right", "2px solid #f5c63c").html('&#x2012;');
                $(this).children('.panel-navigation--default').removeClass('panel-navigation--default').addClass('panel-navigation');
                $(this).children('.panel-text').css("display", "block");
            } else {
                $(this).find('.panel-navigation__plus--default').css("border-right", "2px solid #e8e8e8").html('+');
                $(this).children('.panel-navigation').removeClass('panel-navigation').addClass('panel-navigation--default');
                $(this).children('.panel-text').css("display", "none");
            }
        }

    });



    //$('.panel-text').css("display", "none");

    //&#8210;

});