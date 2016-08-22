$(function () {

    var user = '{"name": "Alex"}'; // string in correct JSON format

    try {
        var userJSObject = JSON.parse(user);
        console.log('JSON was parsed succesfully!', userJSObject);
    } catch (e) {
        console.log('error parsing JSON');
    } finally {
        console.log('end of try');
    }

    $.getJSON("https://brootle.github.io/trainJS14_TryCatch/test.json", function (data) {

        console.log(data);      // data is an Object we get from JSON file

        var items = [];
        $.each(data, function (key, val) {
            items.push("<li id='" + key + "'>" + val + "</li>");    // here we get key and value from Object
        });

        $("<ul/>", {
            "class": "my-new-list",
            html: items.join("")
        }).appendTo("body");
    });

});