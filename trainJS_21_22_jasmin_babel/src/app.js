// here we use babel, they file in ECMAScript will be transformed to JavaScript
// JavaScript file will be in dist folder
// see gulpfile.js for folder name and file name of the result file

let a = 5;

const b = 8;

console.log(`${a} + ${b} = ${a+b}`);

// define default values of arguments
function showText(tittle = 'John',a = 'X',b = 'Y'){
    console.log(`${tittle} ${a} ${b}`);
}

showText('Alex','A','B');

showText();

// short way to write a function that returns x+1
let myFunc = x => x+1;

// cycle
let myArray = [5,6,2,9,1];

for(let myElement of myArray){
    console.log(myElement);
}