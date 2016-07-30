// JavaScript source code

var a, b;

// ask the user to input data till it's an integer
do {
    a = prompt("Give me a base number", '');
} while ((a % 1) || isNaN(a));

do {
    b = prompt("Give me an exponent number", '');
} while ((b % 1) || isNaN(b));
    

var result = myPow(a, b);

console.log(result);

function myPow(a, b) {

    var result = 1;

    if (b >= 0) {
        for (var i = 0; i < b; i++) {
            result = result * a;
        }

        return result;
    }
    else {
        b = b * (-1);
        result = 1 / myPow(a, b);
        return result;
    }

}

showResult();

function showResult() {
    document.getElementById("powerResult").innerHTML = 'Our result is: ' + a + '<sup>' + b + '</sup>' + '=' + result;
}