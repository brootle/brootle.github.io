$(function () {

  // https://en.wikipedia.org/wiki/Reverse_Polish_notation
  // https://en.wikipedia.org/wiki/Finite-state_machine
  // Math functions https://www.w3schools.com/js/js_math.asp

  // STRATEGY
  // use replace function to convert string for eval function

  // source = source.replace(/sin/ig,"Math.sin");

  var x = 2;
  var y = 3;
  var z = 5;
  var a = eval("2+x / y");

  //console.log(a);

  //console.log(eval("sin(2) + 3")); // Math.sin(3)

  console.log(eval("Math.sin(2) + 3")); // Math.sin(3)
  console.log(eval("Math.pow(2,3)")); // Math.sin(3)
  // "x^4".replace(/(.*)\^(.*)/g, "Math.pow($1, $2)")

  console.log(eval("12 % 10")); //

  console.log(eval("1.111111111111111e+40 + 33333333333333333333333333333333333333333333333333333333333333333"));

  console.log(eval("2 + 2")); //
  //console.log(eval("2^2"));

  var resultValue = "";
  var history = "";

  $(".buttons-row div").on("click",function(){
    console.log($(this).text() + "-clicked");

    // it's better to make CASE here to do some actions depending on what was clicked

    // if '=' clicked
    if($(this).text() === '='){

      console.log("EVALUATE!");
      // here we must also catch error

      $("#history").text(resultValue+" =");

      // before we evaluate we need to replace '×' and '÷' with '*' and '/'
      resultValue = resultValue.replace(/×/ig,"*");
      resultValue = resultValue.replace(/÷/ig,"/");

      var calculationsResult = eval(resultValue);
      $("#result").text(calculationsResult);
    

      resultValue = calculationsResult;

    } 

    // if '0-9' clicked
    // console.log(/[0-9]/.test($(this).text()));
    if(/[0-9]/.test($(this).text())){

      resultValue += $(this).text();
      $("#result").text(resultValue);

    }

    // check for + - * / % 
    if(/[+−×÷]/.test($(this).text())){

      // we also need to replace long '−' with standard minus '-'
      resultValue += ' ' + $(this).text().replace(/−/ig,"-") + ' ';
      $("#result").text(resultValue);
      
    }    
    

  });

});