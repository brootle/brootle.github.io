// here we use babel, they file in ECMAScript will be transformed to JavaScript
// JavaScript file will be in dist folder
// see gulpfile.js for folder name and file name of the result file

$(function () {

    console.log('DOM loaded with jQuery - short version');

    let body = $('body');
    let overlay;
    let modal;

    // we get test questions with reply options and save to localStorage, but correct replies are not defined
    $.getJSON("https://brootle.github.io/js_13_14_Test_localStorage/test.json", function (data) {
        // get JSON data from a file as an object and save it to local storage as JSON
        localStorage.setItem('examQuestions', JSON.stringify(data));
    });

   
    let softwareTest = localStorage.getItem('examQuestions'); // get JSON formatted string from local storage

    softwareTest = JSON.parse(softwareTest); // convert JSON format string to JavaScript object
    

    let html = $('#exam').html();

    // using template to put data in our page
    let content = tmpl(html, {
        data: softwareTest
    });

    $('main').append(content);

    // add event listener on submit button

    $('.submit-button').on('click', creatResultsObject);

    function creatResultsObject(e) {
        let testResults = new Object;
        e.preventDefault();
        console.log('check results');

        for(let myQuestion of $('.question')){
            // here we get questions

            let testResultsKey = $(myQuestion).children(".question__tittle").html();

            let valueObject = new Object;

            // now we get replies 
            for (let questionReply of $(myQuestion).children(".question__reply")) {

                // get reply which is inside label
                let key = $(questionReply).children("label").html();

                // see if user checked reply or not
                let value = $(questionReply).children("input").prop('checked');

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

        let testWithResults = localStorage.getItem('examQuestionsAndReplies'); // get JSON formatted string from local storage

        testWithResults = JSON.parse(testWithResults); // convert JSON format string to JavaScript object

        //console.log(testWithResults);

        // now we need to run a function that will compare results

        let errors = compareTestResults(testResults, testWithResults);
        console.log(errors);

        // now we should show modal window with results to the user
        showModal(errors);

        // after we compare resuts - remove correct from memory
        localStorage.removeItem('examQuestionsAndReplies');
    }

    function compareTestResults(userResults, validResults) {

        // we count errors and also send questions where there was wrong reply
        let errors = {
            numberOfErrors: 0,
            errorsList: []
        };

        // this code we use in html document as a template
        let keys = Object.keys(userResults);

        let validKeys = Object.keys(validResults);

        // must use this type of *for* because we check values of two arrays of same length
        for (let i = 0; i < keys.length; i++) {
            //console.log(keys[i]);

            let replies = userResults[keys[i]];

            let validReplies = validResults[validKeys[i]];

            let keys_replies = Object.keys(replies);

            let valid_keys_replies = Object.keys(validReplies);

            for (let j = 0; j < keys_replies.length; j++) {

                // manualy convert 'true' or 'false' to true or false 
                if (validReplies[valid_keys_replies[j]] === 'true') {
                    validReplies[valid_keys_replies[j]] = true;
                }

                if (validReplies[valid_keys_replies[j]] === 'false') {
                    validReplies[valid_keys_replies[j]] = false;
                }

                if (validReplies[valid_keys_replies[j]] !== replies[keys_replies[j]]) {
                    errors.numberOfErrors++;
                    

                    if (hasDuplicateValue(errors.errorsList, keys[i]) === false) {
                        errors.errorsList.push(keys[i]);
                    }
                    
                    //console.log(keys[i] + ':' + keys_replies[j] + ':' + replies[keys_replies[j]]);
                }

            }
        }


        return errors;
    }

    function clearCheckBoxes(){
        $("input").prop('checked', false);
    }

    function hasDuplicateValue(array, value) {

        for(let arrayElement of array){
            if (arrayElement === value) {
                return true;
            }
        }

        return false;
    }


    function showModal(errors) {

        let messageToDisplay = '';
        let messageTittle;

        if (errors.numberOfErrors === 0) {
            messageTittle = "Congratulations! You didn't make any mistake in the test!";
        } else {
            // if there are errors we need to say how many and give a list of questions
            messageTittle = `<a class='modal-tittle'>You made ${errors.numberOfErrors} mistakes in the test! Below are questions where you gave wrong answer</a>`;

            for(let errorsList of errors.errorsList){
                messageToDisplay += `<p class='modal-list'>${errorsList}</p>`;
            }
        }

        overlay = $('<div class="modal-window-overlay"></div>');

        modal = $(`<div class="modal-window">${messageTittle} ${messageToDisplay}</div>`);

        overlay.one('click', hideModal); // add on click event to run 1 time only

        body.append(overlay);
        body.append(modal);
    }

    function hideModal() {
        modal.remove();
        overlay.remove();

        clearCheckBoxes();
    }

});