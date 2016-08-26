$(function () {

    'use strict'
    
    //Your search engine ID:
    //004155958433879807615:oz0xev5kykc

    //Key
    //AIzaSyAHIsWIFjkev1zQdgRWXSA4-oD-aWmlSOg

    //GET https://www.googleapis.com/customsearch/v1?key=AIzaSyAHIsWIFjkev1zQdgRWXSA4-oD-aWmlSOg&cx=004155958433879807615:oz0xev5kykc&q=goit


    // callback function
    function GoogleCallback(func, data) {
        window[func](data);
    }

    // change key!!!
    $.getJSON("https://www.googleapis.com/customsearch/v1?key=AIzaSyAHIsWIFjkev1zQdgRWXSA4-oD-aWmlSOg&cx=004155958433879807615:oz0xev5kykc&q=goit&callback=GoogleCallback&context=?",
    function (data) {
        var ul = document.createElement("ul");
        $.each(data.results, function (i, val) {
            var li = document.createElement("li");
            li.innerHTML = '<a href="' + val.url + '" title="' + val.url + '" target="_blank">' + val.title + "</a> - " + val.content;
            ul.appendChild(li);
        });
        $('body').html(ul);
    });


});