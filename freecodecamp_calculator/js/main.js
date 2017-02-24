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

});