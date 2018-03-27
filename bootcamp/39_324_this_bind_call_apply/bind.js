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

var elieCalc = colt.addNumbers.bind(elie,1,2,3,4);
console.log(elieCalc());

//////////////////////////////////////////////

// we don't need to pass all arguments
var elieCalc2 = colt.addNumbers.bind(elie,1,2);
// we can pass more arguments later
console.log(elieCalc(3,4));

///////////////////////////////////////////////
///////////////////////////////////////////////

var jack = {
    firstName: "Jack",
    sayHi: function(){
        setTimeout(function() {
            console.log ("Hi " + this.firstName);
        }.bind(this),5000) // here we bind the context of our jack object otherwise it will get 'this'
                           // from window object
    }
}

jack.sayHi();

