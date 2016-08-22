$(function () {
    console.log('DOM loaded with jQuery - short version');

    var dog = {
        name: 'Jack',
        age: '4',
        color: 'black'
    }

    localStorage.setItem('animal', JSON.stringify(dog));    // this will be in memory even if we leave the page
                                                            // and we can access it by a key later

    var str = localStorage.getItem('animal'); // get JSON formatted string base on a key 'animal'

    console.log(str);

    str = JSON.parse(str); // convert JSON format string to JavaScript object

    console.log(str);

    localStorage.clear(); // clear localStorage for current website

});