console.log("Using THIS and BIND");

var person = {
    firstName: "Colt",
    sayHi: function(){
        return "Hi " + this.firstName;
    },
    determineContext: function(){
        return this === person;
    },
    dog: {
        sayHello: function(){
            return "Hello " + this.firstName;
        },
        determineContext: function(){
            return this === person;
        }
    }
}

console.log(person.sayHi());
console.log(person.determineContext());

// this is refered to dog in this context it doesn't have firstName of person
console.log(person.dog.sayHello());
console.log(person.dog.determineContext());

// now we use 'call' method and assign the context of 'person' to 'dog'
console.log(person.dog.sayHello.call(person));
console.log(person.dog.determineContext.call(person));


/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

var colt = {
    firstName: "Colt",
    sayHi: function(){
        return "Hi " + this.firstName;
    }
}

var elie = {
    firstName: "Elie"
}

// here is example how we give 'elie' object to function 'sayHi'
// of 'colt' object
console.log(colt.sayHi());
console.log(colt.sayHi.call(elie));
