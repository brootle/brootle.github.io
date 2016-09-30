// type jasmine in terminal to run it
// see spec folder, tests are in spec.js

var app = {
    myPow : function (a, b) {

        if (b > 0) {

            var result = a;

            for (var i = 1; i < b; i++) {
                result = result * a;
            }

            return result;
        }
        else if (b < 0) {

            var result = a;

            b = b * (-1);
            result = 1 / this.myPow(a, b);
            return result;
        }

        else {
            return 1;
        }

    }
}

module.exports = app;

// use method below if you want to run the code in the browser
// try{
//     module.exports = app;
// } catch(e){}
