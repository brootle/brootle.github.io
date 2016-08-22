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

    $.getJSON("test.json", function (data) {
        var items = [];
        $.each(data, function (key, val) {
            items.push("<li id='" + key + "'>" + val + "</li>");
        });

        $("<ul/>", {
            "class": "my-new-list",
            html: items.join("")
        }).appendTo("body");
    });

});