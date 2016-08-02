var dog = {
    name: 'Jack',
    age: 3,
    food:50,
    woof: function(){
        console.log('woof, woof, woof!');
    },
    eat: function(){
        this.food--; // in this case it means dog.food--, 'this' is used instead of 'dog'
    }
}

dog.woof();

dog.eat();
dog.eat();
dog.eat();

console.log(dog);

var num = 123;

function updateNum(a) {
    a = 5;
    return a;
}

num = updateNum(num);

console.log(num);

var obj = {
    test:123
}

function updateObj(a) {
    a.test = 5;
}


updateObj(obj);

console.log(obj);

function calculate(a) {
    console.log(a);
    var b = a || 6; // if a is false or underfined b = 6, default value
    console.log(b);
}

calculate();

var aString = { value: 'I’m a string!!!' };

console.log(typeof aString);

var result = 5 + '5' - 0;   // 5 + '5' calculated as string
                            // string - number calculated as number if string is digit

console.log(result);

console.log(typeof result);

result = true + ''; // calculated as string

console.log(result);

console.log(typeof result);

result = true + true; // calculated as number where not false is 1

console.log(result);

console.log('//////////////////////////////////////////////////////////');

console.log(+true); // true converts to number

result = 5 + {}; // number and object get converted to string

console.log(result);

result = 5 - '5s'; // tries to convert to number, but fails

console.log(result);

console.log(1 == '1');

console.log(1 === '1');

var a = 1;

var increment = function (a) { a++ }

increment(a);

console.log(a);

var obj = { a: 1 };

var increment = function (obj) { obj.a++ }

increment(obj);

console.log(obj.a);

var obj = { a: 1 };

var increment = function (obj) { obj = { a: 2 } }

increment(obj);

console.log(obj.a);


var vasya = {name: 'Vasya',

    greetings: function() {

        console.log('My name is ' + this.name);

    }

};        

vasya.greetings();