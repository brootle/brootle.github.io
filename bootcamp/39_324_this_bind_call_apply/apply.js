var colt = {
    firstName: "Colt",
    sayHi: function(){
        return "Hi " + this.firstName;
    },
    addNumbers: function(a,b,c,d){
        return this.firstName + " just calculated " + (a+b+c+d);
    }
}

var elie = {
    firstName: "Elie"
}

// use call to pass 'elie' object to function of 'colt' object
console.log(colt.sayHi());
console.log(colt.sayHi.call(elie));


// here it works similar to call
console.log(colt.sayHi());
console.log(colt.sayHi.apply(elie));

// when we use 'call' we pass object as 1st argument
console.log(colt.addNumbers(1,2,3,4));
console.log(colt.addNumbers.call(elie,1,2,3,4));
// when we use 'apply', we send function arguments as an array
console.log(colt.addNumbers.apply(elie,[1,2,3,4]));