$(function () {
    console.log('DOM loaded with jQuery - short version');

    //$('.alexcarousel').alexcarousel({
    //    numberOfImages: '3',
    //    backgroundColor: 'rgba(255,255,255,0.5)'
    //});

    $.getJSON("https://brootle.github.io/js_13_14_Test_localStorage/test.json", function (data) {

        console.log(data);      // data is an Object we get from JSON file



    });

});