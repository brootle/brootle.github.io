document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded with JavaScript');

    // https://www.codecademy.com/en/courses/javascript-intermediate-en-NJ7Lr/1/4#

    var text = document.getElementById("text").innerText;
    console.log(text);

    console.log(getDomainsOfEmails(text));

    function getDomainsOfEmails(text) {
        //complete the function to return an array containing 
        //all the domains of the emails inside "text" parameter
        var regDomain = /[a-z0-9._%+-]+@([a-z0-9.-]+\.[a-z]{2,4})/;
        var result;
        var domains = [];

        do{
            result = text.match(regDomain);
            if(result){
                text = text.substr(result.index+result[0].length, text.length);
                domains.push(result[1]);
            }
        } while (result)
        
        return domains;
               
    }    

    // takes a string and returns true if it starts with a consonant and false otherwise. 
    // (For our purposes, a consonant is any letter other than A, E, I, O, U.)
});
