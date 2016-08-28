$(function () {

    'use strict'

    $('.search__button').on('click', update);

    function update() {

        var parameters = {
            token: 'dc2e336c-0244-4317-be31-3b93bd72fc3c',
            format: 'json',
            q: $("#q").val()
        };
        $.getJSON("https://webhose.io/search", parameters)
        .done(function (data, textStatus, jqXHR) {

            // here we analyze data and add search results to the page
            console.log(data);

            var totalResults = data['totalResults'];
            $("main").append('<p>Total results: ' + totalResults + '</p>');
            console.log(totalResults);

            var posts = data['posts'];

            // here we must look through our data
            for (var i = 0; i < posts.length; i++) {

                if (posts[i].language === 'english') {
                    //console.log(posts[i].title);
                    if (posts[i].title === '') {
                        $("main").append('<p>' + 'No tittle' + '</p>');
                    } else {
                        $("main").append('<p>' + posts[i].title + '</p>');
                    }
                    
                }

                // add data to the page

                //console.log(RelatedTopics[i]['Result']);

                //$("main").append('<p>'+RelatedTopics[i]['Result']+'</p>');
            }


        })
         .fail(function (jqXHR, textStatus, errorThrown) {

             // log error to browser's console
             console.log(errorThrown.toString());
         });
    }

    //function update() {

    //    var parameters = {
    //        q: $("#q").val(),
    //        format: 'json'
    //    };
    //    $.getJSON("https://api.duckduckgo.com/", parameters)
    //    .done(function (data, textStatus, jqXHR) {

    //        //console.log(data);

    //        var RelatedTopics = data['RelatedTopics'];

    //        // here we must look through our data
    //        for (var i = 0; i < RelatedTopics.length; i++) {

    //            // add data to the page

    //            //console.log(RelatedTopics[i]['Result']);

    //            $("main").append('<p>'+RelatedTopics[i]['Result']+'</p>');
    //        }

    //    })
    //     .fail(function (jqXHR, textStatus, errorThrown) {

    //         // log error to browser's console
    //         console.log(errorThrown.toString());
    //     });
    //}

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