'use strict';

// here we use babel, they file in ECMAScript will be transformed to JavaScript
// JavaScript file will be in dist folder
// see gulpfile.js for folder name and file name of the result file

$(function () {

    console.log('DOM loaded with jQuery - short version');

    var body = $('body');
    var overlay = void 0;
    var modal = void 0;

    // we get test questions with reply options and save to localStorage, but correct replies are not defined
    $.getJSON("https://brootle.github.io/js_13_14_Test_localStorage/test.json", function (data) {
        // get JSON data from a file as an object and save it to local storage as JSON
        localStorage.setItem('examQuestions', JSON.stringify(data));
    });

    var softwareTest = localStorage.getItem('examQuestions'); // get JSON formatted string from local storage

    softwareTest = JSON.parse(softwareTest); // convert JSON format string to JavaScript object


    var html = $('#exam').html();

    // using template to put data in our page
    var content = tmpl(html, {
        data: softwareTest
    });

    $('main').append(content);

    // add event listener on submit button

    $('.submit-button').on('click', creatResultsObject);

    function creatResultsObject(e) {
        var testResults = new Object();
        e.preventDefault();
        console.log('check results');

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = $('.question')[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var myQuestion = _step.value;

                // here we get questions

                var testResultsKey = $(myQuestion).children(".question__tittle").html();

                var valueObject = new Object();

                // now we get replies 
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = $(myQuestion).children(".question__reply")[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var questionReply = _step2.value;


                        // get reply which is inside label
                        var key = $(questionReply).children("label").html();

                        // see if user checked reply or not
                        var value = $(questionReply).children("input").prop('checked');

                        // add key and value to our Object that has asnwers
                        valueObject[key] = value;
                    }

                    // add object with reply and its status to the object that keeps all results of the test
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                testResults[testResultsKey] = valueObject;
            }
            //console.log(testResults);

            // now we get questions and defined correct replies
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

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
        showModal(errors);

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

        // must use this type of *for* because we check values of two arrays of same length
        for (var i = 0; i < keys.length; i++) {
            //console.log(keys[i]);

            var replies = userResults[keys[i]];

            var validReplies = validResults[validKeys[i]];

            var keys_replies = Object.keys(replies);

            var valid_keys_replies = Object.keys(validReplies);

            for (var j = 0; j < keys_replies.length; j++) {

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

    function clearCheckBoxes() {
        $("input").prop('checked', false);
    }

    function hasDuplicateValue(array, value) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {

            for (var _iterator3 = array[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var arrayElement = _step3.value;

                if (arrayElement === value) {
                    return true;
                }
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }

        return false;
    }

    function showModal(errors) {

        var messageToDisplay = '';
        var messageTittle = void 0;

        if (errors.numberOfErrors === 0) {
            messageTittle = "Congratulations! You didn't make any mistake in the test!";
        } else {
            // if there are errors we need to say how many and give a list of questions
            messageTittle = '<a class=\'modal-tittle\'>You made ' + errors.numberOfErrors + ' mistakes in the test! Below are questions where you gave wrong answer</a>';

            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = errors.errorsList[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var errorsList = _step4.value;

                    messageToDisplay += '<p class=\'modal-list\'>' + errorsList + '</p>';
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }
        }

        overlay = $('<div class="modal-window-overlay"></div>');

        modal = $('<div class="modal-window">' + messageTittle + ' ' + messageToDisplay + '</div>');

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