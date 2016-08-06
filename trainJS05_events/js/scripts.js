function calculateSomething(a, b) {
    // this will be defined if a function is called via call with context (object) parameter
    console.log(this.firstName + ' ' + this.lastName + ' : ' + (a + b));
}

calculateSomething(4, 3);

var context = {
    firstName: 'Oleg',
    lastName: 'Oblomov'
}

calculateSomething.call(context, 4, 3); // we call a function giving object as parameter

calculateSomething.apply(context, [4, 3]); // contecx is 'this' argument

var arguments = [4, 3];
calculateSomething.apply(context, arguments);

// we can have access to the list of arguments that function gets
function printArguments() {
    var args = [].slice.call(arguments); // get list of arguments
    console.log(args);
}

printArguments(1, 2, 3);

// constructor function to create object
// we should declare class starting with Capital letter
function Animal(newName, newColor) {
    // var self = this; // we can save a pointer to this and use it
    // self.name = newName;
    // var _privateParameter = 5; // use _ to declare private parameters of methods(functions)
    this.name = newName;
    this.color = newColor;
    this.speech = function () {
        console.log('My name is ' + this.name);
    }
}

var dog = new Animal('Bobik', 'white'); //creating new object
console.log(dog);

dog.speech();


var newObject = new Object();
var newArray = new Array();

var counter = 0;

function someFunction() {
    console.log('hello world: ', counter);
    counter++;
    if (counter === 5) {
        clearInterval(interfalFunctionPointer); // stops repeating function
    }
}

//setTimeout(someFunction, 2000);

var interfalFunctionPointer = setInterval(someFunction, 2000);




var myElement = document.querySelector('a');

var myLiElement = document.querySelector('li');

//console.log(myElement);

// some function
function handler(collingEvent) {
    //alert('yes');
    console.log('called by a: ',collingEvent.target); //shows where event was called from
    collingEvent.preventDefault(); // stops default event
}

// some function
function liHandler(collingEvent) {
    //alert('yes');
    console.log('called by li: ',collingEvent.target); //shows where event was called from
    collingEvent.preventDefault(); // stops default event
}

// we call this function when element clicked
myElement.addEventListener('click', handler, true);
myLiElement.addEventListener('click', liHandler, true);

// buble principle works... the last child calles event handler first
// if we add TRUE to addEventListener - events trigger from parent to child downwards

// remove event that we added to element
//myElement.removeEventListener('click', handler);

// collingEvent is the object sent by even to handler-function
function keyDownHandler(collingEvent) {
    console.log(collingEvent);
    console.log(this); // here we can see what object made a call to even

    console.log(collingEvent.key); // will show they key that was pressed
}

window.addEventListener('keydown', keyDownHandler);