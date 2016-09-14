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

    $('.slide figure').hover(
        function () {
            $(this).children('.slide-image-hover').css("display", "block");
            $(this).children('figcaption').css("color", "#f6b60e");
        },
        function () {
            $(this).children('.slide-image-hover').css("display", "none");
            $(this).children('figcaption').css("color", "white");
        }
    );

});