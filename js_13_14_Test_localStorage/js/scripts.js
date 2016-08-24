$(function () {
    console.log('DOM loaded with jQuery - short version');

    // we get test questions with reply options and save to localStorage, but correct replies are not defined
    $.getJSON("https://brootle.github.io/js_13_14_Test_localStorage/test.json", function (data) {
        // get JSON data from a file as an object and save it to local storage as JSON
        localStorage.setItem('examQuestions', JSON.stringify(data));
    });

   
    var softwareTest = localStorage.getItem('examQuestions'); // get JSON formatted string from local storage

    softwareTest = JSON.parse(softwareTest); // convert JSON format string to JavaScript object
    

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

    $('.submit-button').on('click', creatResultsObject);

    function creatResultsObject(e) {
        var testResults = new Object;
        e.preventDefault();
        console.log('check results');

        for (var i = 0; i < $('.question').length; i++) {
            // here we get questions

            var testResultsKey = $('.question').eq(i).children(".question__tittle").html();
            //console.log(key);

            var valueObject = new Object;

            // now we get replies 
            for (var j = 0; j < $('.question').eq(i).children(".question__reply").length; j++) {

                // get reply which is inside label
                var key = $('.question').eq(i).children(".question__reply").eq(j).children("label").html();
                //console.log(key);

                // see if user checked reply or not
                var value = $('.question').eq(i).children(".question__reply").eq(j).children("input").prop('checked');
                //console.log(value);

                // add key and value to our Object that has asnwers
                valueObject[key] = value;
            }

            // add object with reply and its status to the object that keeps all results of the test

            testResults[testResultsKey] = valueObject;
        }
        //console.log(testResults);

        // now we get questions and defined correct replies
        $.getJSON("https://brootle.github.io/js_13_14_Test_localStorage/testWithReplies.json", callbackFuncWithData);

        function callbackFuncWithData(data) {
            localStorage.setItem('examQuestionsAndReplies', JSON.stringify(data));
        }

        var testWithResults = localStorage.getItem('examQuestionsAndReplies'); // get JSON formatted string from local storage

        testWithResults = JSON.parse(testWithResults); // convert JSON format string to JavaScript object

        //console.log(testWithResults);

        // now we need to run a function that will compare results

        var errors = compareTestResults(testResults, testWithResults);
        console.log(errors);

        // now we should show modal window with results to the user

        // after we compare resuts - remove correct from memory
        localStorage.removeItem('examQuestionsAndReplies');
    }

    function compareTestResults(userResults, validResults) {

        // we count errors and also send questions where there was wrong reply
        var errors = {
            numberOfErrors: 0,
            errorsList: []
        };

        // this code we use in html document as a template
        var keys = Object.keys(userResults);

        var validKeys = Object.keys(validResults);

        for (var i = 0; i < keys.length; i++) {
            //console.log(keys[i]);

            var replies = userResults[keys[i]];

            var validReplies = validResults[validKeys[i]];

            keys_replies = Object.keys(replies);

            valid_keys_replies = Object.keys(validReplies);

            for (var j = 0; j < keys_replies.length; j++) {
                //console.log(keys_replies[j] + ':' + replies[keys_replies[j]]);
                //console.log(valid_keys_replies[j] + ':' + validReplies[valid_keys_replies[j]]);

                //console.log(replies[keys_replies[j]] + ' : ' + validReplies[valid_keys_replies[j]]);

                // manualy convert 'true' or 'false' to true or false 
                if (validReplies[valid_keys_replies[j]] === 'true') {
                    validReplies[valid_keys_replies[j]] = true;
                }

                if (validReplies[valid_keys_replies[j]] === 'false') {
                    validReplies[valid_keys_replies[j]] = false;
                }

                if (validReplies[valid_keys_replies[j]] !== replies[keys_replies[j]]) {
                    errors.numberOfErrors++;
                    errors.errorsList.push(keys[i]);
                    //console.log(keys[i] + ':' + keys_replies[j] + ':' + replies[keys_replies[j]]);
                }

            }
        }


        return errors;
    }


});