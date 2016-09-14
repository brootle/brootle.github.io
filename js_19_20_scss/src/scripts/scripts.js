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

});