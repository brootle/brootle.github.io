$(function () {

    'use strict'

    $('.search__button').on('click', update);

    function update() {

        var parameters = {
            q: $("#q").val(),
            format: 'json'
        };
        $.getJSON("https://api.duckduckgo.com/", parameters)
        .done(function (data, textStatus, jqXHR) {

            console.log(data);

            console.log($(data).data('RelatedTopics'));

            // here we must look through our data
            //for (var i = 0; i < data.RelatedTopics.lengh; i++) {
            //    console.log(data[i]);
            //}
        })
         .fail(function (jqXHR, textStatus, errorThrown) {

             // log error to browser's console
             console.log(errorThrown.toString());
         });
    }

    //http://www.programmableweb.com/api/duck-duck-go
    //http://api.duckduckgo.com/?q=Lugansk&format=json

    //$.ajax({
    //    // AJAX-specified URL
    //    // callback function with parameters must be in url
    //    url: "http://ajax.googleapis.com/ajax/services/search/web",
    //    data: {
    //        abc: 123
    //    },
    //    method: 'POST',
    //    dataType: "jsonp",
    //    // Handle the success event
    //    success: function (data) {
    //        // equal to previuos example
    //        // ...

    //        console.log('connected to server');
    //    },
    //    error: function () {

    //    }
    //});

    //function GoogleCallback(jQueryObject, data) {
    //    console.log(data);
    //}

});