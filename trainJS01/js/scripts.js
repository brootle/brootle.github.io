// JavaScript source code


var arr = [1, 2, 3];

arr[arr.length] = 4;

// add element to the end of array
arr.push(5);

console.log(arr);

console.log('out of array: ', arr[4]);

// revome element from the end of array and save it to variable
var removedElement = arr.pop();

console.log("removed last element of array: ", removedElement);

console.log("our array: ", arr);

// remove first element from array
arr.shift();
console.log("our array after 1st element was removed is this: ", arr);

// add element to the begging of array
arr.unshift('zero');
console.log("now we added element to the beginning of array: ", arr);

// activate debagger
// debugger;

// add element at certain position
arr[10] = "element with index 10";
console.log("we added element at index 10: ", arr);

var someVariable;

console.log(someVariable);

someVariable = typeof arr;

console.log(someVariable);

var num = 5;

someVariable = typeof num;

console.log(someVariable);

var a = '2';
var b = 3;

// +a converts string to number

var result = +a + b;

console.log(result);

var student = {
    age: 18,
    sex:'male',
    address: 'Poltava',
    'first name': 'John'
}

console.log(student.age);

console.log(student['first name']);

var key = 'first name';

console.log(student[key]);

// go through the object

for (var key in student) {
    console.log(key +':', student[key]);
}

var keysList = Object.keys(student);
console.log(keysList);

// Object window
// global variables become window property
var abs = 5;
console.log(window.abs);

// working with strings
var myString = 'abracadabra'

console.log(myString.indexOf('ca'));

myString = myString.replace('a', 'E');
console.log(myString);

myString = myString.toLocaleLowerCase();
console.log(myString);

myString = myString.replace('a', 'E');
console.log(myString);

console.log(myString.substring(3, 6));
// if we don't provide last index, we will get everything to the end
console.log(myString.substring(3));

// get N number of chars starting from certain index
console.log(myString.substr(2,5));

// convert String to Number

var digitString = '12';
var digitNumber = +digitString;
console.log(digitNumber);

var num;
num = new Number('12');
console.log(typeof num);
num = parseInt('12');
console.log(typeof num);
num = +'12';
console.log(typeof num);
num = Number('12');
console.log(typeof num);

// check if String converted to Number, we get NaN when convertion fails
// isNaN function returns true if variable is not a Number;
var someString = '12px3';
var someDigit = +someString;
if (isNaN(someDigit)) {
    console.log('convertion to Number failed');
} else {
    console.log('convertion to Number succesful');
}

// get Number from String till the 1st char, String must start with a digit
someDigit = parseInt(someString);
console.log(someDigit);

// convert Number to String
var myNumber = 42;
var myString = myNumber.toString();
console.log(myString);

// we can also add empty string to Number and this way it will be converted
myString = myNumber + '';
console.log(myString);

// working with Math
var myFloat = 12.7;
myFloat = Math.floor(myFloat); // removes all after the point
console.log(myFloat);

myFloat = 12.3;
myFloat = Math.ceil(myFloat); // incriments to the next integer
console.log(myFloat);

myFloat = 12.3;
myFloat = Math.round(myFloat); // real mathematic Round function
console.log(myFloat);

myFloat = 12.5;
myFloat = Math.round(myFloat); // real mathematic Round function
console.log(myFloat);

// let's convert tabulated String to Array
var arrString = "1.2.test.3.last";
var myArray = arrString.split('.'); // splits elements in a string devided by ',' and puts them in array
console.log(myArray);

// now let's conert Array into a String
var newString = myArray.join();
console.log(newString);

// now let's conert Array into a String
var newString = myArray.join(':'); //we can define any delimeter in parameter, default delimeter is ','
console.log(newString);

// if we put empty string as delimeter, every char will be added as separate element to array
myArray = arrString.split('');
console.log(myArray);

// sort array
myArray = myArray.sort();
console.log(myArray);

////////////////////////////////////////////////////////
// FUNCTIONS
////////////////////////////////////////////////////////

function myFunction(){
    console.log('my function was just called!');
}

myFunction();

function myPlusFunction(a, b) {
    console.log(arguments); // here we print all arguments sent to a function
    console.log(arguments[0]); // we can access arguments as array
    console.log(arguments.length); // get number of parameters sent to a function
    var result = a + b;
    console.log(result);

    return result;
}

myPlusFunction(3, 2);

// now we put more arguments that declared in a function
myPlusFunction(3, 2, 1);

var funcResult = myPlusFunction(8, 9);

console.log(funcResult);