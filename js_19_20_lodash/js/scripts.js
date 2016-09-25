$(function () {

    function RequestData() {

        $.getJSON("../data.json")
        .done(function (data, textStatus, jqXHR) {

            // read more about parameters at https://webhose.io/documentation

            // here we analyze data and add search results to the page
            console.log(data);

        })
         .fail(function (jqXHR, textStatus, errorThrown) {

             // log error to browser's console
             console.log(errorThrown.toString());
         });
    }

    RequestData();
    
});