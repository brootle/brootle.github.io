$(function () {

  // https://en.wikipedia.org/wiki/Reverse_Polish_notation
  // https://en.wikipedia.org/wiki/Finite-state_machine
  // Math functions https://www.w3schools.com/js/js_math.asp

  // STRATEGY
  // use replace function to convert string for eval function

  // source = source.replace(/sin/ig,"Math.sin");

  //console.log(a);

  //console.log(eval("sin(2) + 3")); // Math.sin(3)

  // console.log(eval("Math.sin(2) + 3")); // Math.sin(3)
  // console.log(eval("Math.pow(2,3)")); // Math.sin(3)
  // // "x^4".replace(/(.*)\^(.*)/g, "Math.pow($1, $2)")

  // console.log(eval("12 % 10")); //

  // console.log(eval("1.111111111111111e+40 + 33333333333333333333333333333333333333333333333333333333333333333"));

  //console.log(eval("2 + .4")); //
  //console.log(eval("2^2"));

  var resultValue = "0";
  var history = "";

  $(".buttons-row div").on("click",function(){
    console.log($(this).text() + "-clicked");

    if($("#result").text() === "Error" || $("#result").text() === "Infinity"){
      console.log($("#result").text());
      resultValue = "0";
      $("#result").text(resultValue);
    }

    if($(this).text() === '.'){
      var lastSymbol = resultValue[resultValue.length-1];
      //console.log(lastSymbol);
      if(lastSymbol == '.'){
        // do nothing
      }else{
        resultValue += '.';
        $("#result").text(resultValue);
        $("#reset").text("CE");
      }      

    }    

    // remove last symbols
    if($(this).text() === 'CE'){

      if(resultValue.length === 1){
        resultValue = "0";
        $("#result").text(resultValue);
      }else{

        var lastSymbol = resultValue[resultValue.length-1];

        if(lastSymbol == ' '){
          resultValue = resultValue.substring(0, resultValue.length - 3);
        }else{
          resultValue = resultValue.substring(0, resultValue.length - 1);
        }

        // resultValue = "0";
        $("#result").text(resultValue);
        // $("#reset").text("CE");
      }

    }    

    if($(this).text() === 'AC'){
      resultValue = "0";
      $("#result").text(resultValue);
      $("#reset").text("CE");
    }

    // if '=' clicked
    if($(this).text() === '='){

      console.log(resultValue);

      $("#reset").text("AC");

      console.log("EVALUATE!");
      // here we must also catch error

      $("#history").text(resultValue+" =");

      // before we evaluate we need to replace '×' and '÷' with '*' and '/'
      resultValue = resultValue.replace(/×/ig,"*");
      resultValue = resultValue.replace(/÷/ig,"/");

      //var calculationsResult = eval(resultValue);
      var calculationsResult = "Error";

      try {
          calculationsResult = eval(resultValue);
      }
      catch(err) {
          
      }      


      $("#result").text(calculationsResult);
    

      resultValue = calculationsResult.toString();

    } 

    // if '0-9' clicked
    // console.log(/[0-9]/.test($(this).text()));
    if(/[0-9]/.test($(this).text())){

      console.log(resultValue);

      if($("#reset").text() ==  "AC"){
        resultValue = '';
      }

      if(resultValue === "0"){
        resultValue = '';
      }

      resultValue += $(this).text();
      $("#result").text(resultValue);

      $("#reset").text("CE");

    }

    // check for + - * / % 
    if(/[+−×÷]/.test($(this).text())){

      // make operator that we are going to add to result string
      // we also need to replace long '−' with standard minus '-'
      var addOperator = $(this).text().replace(/−/ig,"-");

      // if last char is not equal to symbol that we enter we add symbol
      // better idea, if the end of string match operator, replace it with entered operator
      var regex = new RegExp("[ ][" + addOperator + "][ ]$");
      if(regex.test(resultValue) === false){
        // so we don't add duplicate operatos
        var lastOperator = resultValue[resultValue.length-2];
        // if lastOperator is  [ + - × ÷ ] we must delete last 3 symbols from the string
        if(lastOperator === '-' || lastOperator === '+' || lastOperator === '×' || lastOperator === '÷'){
          resultValue = resultValue.substring(0, resultValue.length - 3);
        }
        resultValue += ' ' + addOperator + ' ';
        $("#result").text(resultValue);

        $("#reset").text("CE");
      }

      
    }    
    

  });

});