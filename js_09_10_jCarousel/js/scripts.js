$(function () {
    console.log('DOM loaded with jQuery - short version');

    // we initiate the plugin
    $(".fancybox").fancybox();

    $('.jcarousel').jcarousel({
        // Configuration goes here
    }).jcarouselAutoscroll({
        interval: 3000,
        target: '+=1',
        autostart: true
    });

    // initiate Select2 plugin
    $('select').select2();


    // customize checkbox http://www.tutorialrepublic.com/faq/how-to-create-custom-checkboxes-using-css-and-jquery.php

    function customCheckbox(checkboxName) {
        var checkBox = $('input[name="' + checkboxName + '"]');
        $(checkBox).each(function () {
            $(this).wrap("<span class='custom-checkbox'></span>");
            if ($(this).is(':checked')) {
                $(this).parent().addClass("selected");
            }
            if ($(this).is(':disabled')) {
                $(this).parent().addClass("disabled");
            }
        });
        $(checkBox).click(function () {
            $(this).parent().toggleClass("selected");
        });
    };

    customCheckbox("sport[]");

});