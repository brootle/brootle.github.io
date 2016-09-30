'use strict';

// here we use babel, they file in ECMAScript will be transformed to JavaScript
// JavaScript file will be in dist folder
// see gulpfile.js for folder name and file name of the result file

var a = 5;

var b = 8;

console.log(a + ' + ' + b + ' = ' + (a + b));

// define default values of arguments
function showText() {
    var tittle = arguments.length <= 0 || arguments[0] === undefined ? 'John' : arguments[0];
    var a = arguments.length <= 1 || arguments[1] === undefined ? 'X' : arguments[1];
    var b = arguments.length <= 2 || arguments[2] === undefined ? 'Y' : arguments[2];

    console.log(tittle + ' ' + a + ' ' + b);
}

showText('Alex', 'A', 'B');

showText();

// short way to write a function that returns x+1
var myFunc = function myFunc(x) {
    return x + 1;
};

// cycle
var myArray = [5, 6, 2, 9, 1];

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
    for (var _iterator = myArray[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var myElement = _step.value;

        console.log(myElement);
    }
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