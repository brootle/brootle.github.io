$(function () {
    console.log('DOM loaded with jQuery - short version');

    var animal = {
        name: 'Jack',
        age: '4',
        color: 'black'
    }

    var str = JSON.stringify(animal); // convert to JSON format

    console.log(str);

    var obj = JSON.parse(str); // convert string in JSON format to Object

    console.log(obj);
});