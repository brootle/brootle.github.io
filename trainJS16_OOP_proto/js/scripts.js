$(function () {

    'use strict'

    var animal = {
        name: 'Jack',
        age: 5
    };

    var cat = {
        age: 3
    };

    cat.__proto__ = animal;

    console.log(cat.name);

    function World() {
        this.sky = 'blue';
    }

    //var newWorld = new World();

    function Company() {
        this.name = 'Google';
        this.stuff = 10000;
        this.message = function () {
            console.log('hello from ' + this.name);
        }
    }

    //Company.prototype = newWorld;
    Company.prototype = new World;

    Company.prototype.copyright = function () {
        console.log('copyright 2015');
    }

    var newCompany = new Company();

    newCompany.message();

    console.log(newCompany.sky);

    newCompany.copyright();

    var ConstructorFunction = function () {
        this.name = 'Google';
        this.stuff = 10000;
    };
    var myobject = new ConstructorFunction();
    //console.log(myobject.__proto__);
    //console.log(ConstructorFunction);
    console.log(myobject.__proto__ === ConstructorFunction);
    console.log(myobject.__proto__ === ConstructorFunction.prototype);
    console.log(myobject.__proto__ === ConstructorFunction.__proto__);

    //var ConstructorFunction2 = function () {
    //    this.a = 1;
    //    this.b = 2;
    //}

    //var myobject2 = ConstructorFunction2();

    //console.log(myobject2);

});