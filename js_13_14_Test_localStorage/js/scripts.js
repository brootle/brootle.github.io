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
        //console.log(keys[i]);

        var replies = softwareTest[keys[i]];

        keys_replies = Object.keys(replies);

        for (var j = 0; j < keys_replies.length; j++) {
            //console.log(keys_replies[j]);
        }
    }

    // using template to put data in our page
    var content = tmpl(html, {
        data: softwareTest
    });

    $('main').append(content);

    // add event listener on submit button

    $('.submit-button').on('click', collectResults);

    var testResults = new Object;
    console.log(testResults);

    function collectResults(e) {
        e.preventDefault();
        console.log('check results');

        for (var i = 0; i < $('.question').length; i++) {
            // here we get questions
            console.log($('.question').eq(i).children(".question__tittle").html());

            // now we get replies 
            for (var j = 0; j < $('.question').eq(i).children(".question__reply").length; j++) {
                // get reply which is inside label
                console.log($('.question').eq(i).children(".question__reply").eq(j).children("label").html());

                console.log(' : ');

                // see if user checked reply or not
                console.log($('.question').eq(i).children(".question__reply").eq(j).children("input").prop('checked'));
            }
        }
    }

    // we send use Object without correct answers!
    // another JSON with questions, a answers and correct ones must be in separate JSON file not accessible by use
    // we must set permissions to make it accessable by server only

    // we should run through the page and build an object

});