
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded with JavaScript');   

    ////////////////////////////////////////
    //// SWAP OBJECT VARIABLES /////////////
    ////////////////////////////////////////   

    console.log(`Swapping primitive variables`); 

    var a = 1;
    var b = 2;

    console.log(`a=${a} : b=${b}`);

    swap(a,b)

    console.log(`a=${a} : b=${b}`);

    function swap(a,b){
      var temp = a;
      a = b;
      b = temp;
    }

    ////////////////////////////////////////
    //// SWAP OBJECT VALUES ////////////////
    ////////////////////////////////////////

    console.log(`Swapping Object parameters`); 

    var obj = {
      a:1,
      b:2
    }

    console.log(`a=${obj.a} : b=${obj.b}`);

    swapObjValues(obj); 

    console.log(`a=${obj.a} : b=${obj.b}`);

    function swapObjValues(obj){
      var temp = obj.a;
      obj.a = obj.b;
      obj.b = temp;
    }

});