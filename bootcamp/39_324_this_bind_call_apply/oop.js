function Dog(name, age){
    this.name = name;
    this.age = age;
    this.bark = function(){
        console.log(`${this.name} says: Bark-bark`);
    }
}

let rusty = new Dog('Rusty',3);
rusty.bark();

let fido = new Dog("Fido",5);
fido.bark();

//////////////////////////////////
//////////////////////////////////

function Car(make, model, year){
    this.make = make;
    this.model = model;
    this.year = year;

    this.numWheels = 4;
}

console.log(new Car('Volvo','SUV', 1978));

//

function Motorcycle(make, model, year){
    Car.call(this,make, model, year);
    this.numWheels = 2;
}

console.log(new Motorcycle('Suzuki','Sprort', 1997));

//

function MotorcycleNext(make, model, year){
    Car.apply(this,[make, model, year]);
    this.numWheels = 2;
}

console.log(new MotorcycleNext('Harley','Big', 2016));

//

function MotorcycleNextArguments(make, model, year){
    Car.apply(this, arguments);
    this.numWheels = 2;
}

console.log(new MotorcycleNextArguments('Honda','Casual', 2018));

// PROTOTYPES

function Person(name){
    this.name = name;
}

let ellie = new Person("Ellie");
let mike = new Person("Mike");

// console.log(ellie.__proto__);
// console.log(Person.prototype);

Person.prototype.isInstructor = true;

console.log(ellie.isInstructor);

////////////////////////////////////////////////
////////////////////////////////////////////////

console.log('.......................................');

function Vehicle(make, model, year){
    this.make = make;
    this.model = model;
    this.year = year;
    this.isRunning = false;    
}

Vehicle.prototype.turnOn = function(){
    this.isRunning = true;
}

Vehicle.prototype.turnOff = function(){
    this.isRunning = false;
}   

Vehicle.prototype.honk = function(){
    if(this.isRunning){
        return 'beep';
    }
}        

let myCar = new Vehicle ("Volvo", "Sedan", "2018");

console.log(myCar);
console.log(myCar.honk());

myCar.turnOn();
console.log(myCar);
console.log(myCar.honk());