// function declaration - classic way
// we just declare it like 
// function myFunction(){ //some code };
// myFunction();


// function expression
// we assign anonymous function to variable
// var myVariable = function(){ //some code };
// myVariable();


// anonymous function

var element = document.querySelector('.test');

element.addEventListener('click', function () {
    alert('got it');
});


// function via constructor
// just write code of a function as String

var myVariable = new Function('parameter', 'console.log(parameter)');

myVariable('hello world');


// lexical enviroment

function createCounter() {
    var count = 1;

    return function () {
        return count++;
    }
}

var newCounter01 = createCounter(); // here we create not just a pointer to a function
                                    // but we create new copy of a function!
var newCounter02 = createCounter();

newCounter01();
newCounter01();
var result01 = newCounter01();
console.log(result01);

newCounter02();
newCounter02();
newCounter02();
var result02 = newCounter02();
console.log(result02);


//////////////////////////////////////////////

// here we hide everything inside function from global scope

// we define anonymous function, put it inside () and immidiatelly call it with () at the end
(function () {
    console.log('test function');
})();

(function (number) {
    console.log(number);
})(100);


// here we create JavaScript module

var shop = (function () {

    applesAmount = 100;

    function getTotalApplesAmount() {
        return applesAmount;
    }

    function sellApples(amount) {
        applesAmount = applesAmount - amount;
    }

    function buyApples(amount) {
        applesAmount = applesAmount + amount;
    }

    function setApples(amount) {
        applesAmount = amount;
    }

    function getApples() {
        return applesAmount;
    }

    // let's return result as Object
    return {
        setApples: setApples,
        getApples: getApples,
        sellApples: sellApples,
        buyApples: buyApples,
        getTotalApplesAmount: getTotalApplesAmount
    }
})();

shop.buyApples(10);
console.log(shop.getTotalApplesAmount());

shop.setApples(34);
console.log(shop.getApples());