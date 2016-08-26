$(function () {

    'use strict'
    

    url="http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=AAA&callback=?";

    $.getJSON(url, function(data) {
        alert('hello 1');
    });

});