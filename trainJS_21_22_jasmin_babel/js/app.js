// jasmine installed globally, just type jasmine in terminal to run it
// see spec folder, tests are in spec.js

var app = {
    sayHello: function(name){
        return 'Hello ' + name;
    },
    sum: function(a,b){
        return a + b;
    }
}

try{
    module.exports = app;
} catch(e){}

//module.exports = app;