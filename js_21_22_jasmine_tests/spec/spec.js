
var app = require('../js/app.js')

describe("The power of a number:", function(){

  it("3^4=81", function() {

    var result;

    result = app.myPow(3,4);

    expect(result).toBe(81);
  });

  it("3^0=1", function() {

    var result;

    result = app.myPow(3,0);

    expect(result).toBe(1);
  });  

  it("4^(-2)=0.0625", function() {

    var result;

    result = app.myPow(4,-2);

    expect(result).toBe(0.0625);
  });

});

