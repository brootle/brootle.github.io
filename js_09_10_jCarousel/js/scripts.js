$(function () {
    console.log('DOM loaded with jQuery - short version');

    // we initiate the plugin
    $(".fancybox").fancybox();

    $('.jcarousel').jcarousel({
        // Configuration goes here
    });

    // initiate Select2 plugin
    $('select').select2();
});