function outer(){
    var data = "closures are ";
    return function(){
        var innerData = "awesome";
        return data + innerData;
    }
}

console.log(outer());

console.log(outer()());

/////////////////////////////////

function outerMath(a){
    return function innerMath(b){
        return a + b;
    }
}

console.log(outerMath(2)(3));

var storeOuterMath = outerMath(10);
console.log(storeOuterMath(3));

////////////////////////////////////////////////////
// WE CAN USE CLOSURES FOR PRIVATE VARIABLES

console.log("............................");

function counter (){
    var count = 0;
    return function(){
        return ++count;
    }
}

var incrementer = counter();

console.log(incrementer());
console.log(incrementer());
console.log(incrementer());
console.log(incrementer());

var incrementer2 = counter();
console.log(incrementer2());

/////////////////////////////////////////////////
console.log("............................");

function ClassRoom(){
    var instructors = ['Alex', 'Jack'];
    return {
        getInstructors: function(){
            return instructors;
        },
        addInstructor: function(name){
            instructors.push(name);
            return instructors;
        }
    }
}

var class1 = ClassRoom();

console.log(class1.getInstructors());
class1.addInstructor('Ella');
console.log(class1.getInstructors());

var class2 = ClassRoom();
console.log(class2.getInstructors());