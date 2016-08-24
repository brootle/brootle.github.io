$(function () {
    console.log('DOM loaded with jQuery - short version');

    $.getJSON("https://brootle.github.io/js_13_14_Test_localStorage/test.json", function (data) {
        // get JSON data from a file as an object and save it to local storage as JSON
        localStorage.setItem('examQuestions', JSON.stringify(data));
    });

   
    var softwareTest = localStorage.getItem('examQuestions'); // get JSON formatted string from local storage

    softwareTest = JSON.parse(softwareTest); // convert JSON format string to JavaScript object

    console.log(softwareTest);

    var html = $('#exam').html();

    // this code we use in html document as a template
    var keys = Object.keys(softwareTest);

    for (var i = 0; i < keys.length; i++) {
        console.log(keys[i]);

        var replies = softwareTest[keys[i]];

        keys_replies = Object.keys(replies);

        for (var j = 0; j < keys_replies.length; j++) {
            console.log(keys_replies[j]);
        }
    }

    // using template to put data in our page
    var content = tmpl(html, {
        data: softwareTest
    });

    $('main').append(content);



});