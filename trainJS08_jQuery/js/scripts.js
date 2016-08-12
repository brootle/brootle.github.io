// using JavaScript

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded with JavaScript');
});


// using jQuery
// Sizzle

// short version
$(function () {
    console.log('DOM loaded with jQuery - short version');
});

// classic verion
$(document).ready(function () {
    console.log('DOM loaded with jQuery - classic version');

    var element = $('.wrapper');
    //var element = $('.wrapper').parent();
    console.log(element);


    var elementOnly = $('.wrapper')[0];
    console.log(elementOnly);

    var paragraph = element.find('p');
    console.log(paragraph);

    $('p').addClass('red'); // .removeClass to remove class

    $('p').css('color', 'yellow'); // set style

    // set styles giving an object
    $('p').css({
        color: 'white',
        background: 'black'
    });

    $('p').attr('href', 'google.com') // we can add attributes


    // chaining - access different methods via dot .

    $('p')
        .css({
            color: 'pink',
            background: 'blue'
        })
        .attr('href', 'yahoo.com');

    var paragraphElements = $('p'); // assing all p elements to variable

    $('p').remove(); // removes elements

    // append elements
    $('body').append('<div>we just added this divs</div>');

    $('body').append(paragraphElements[0]); // here we add 1st paragraph

    // add event on element
    paragraphElements.on('click', function () {
        alert('paragraph clicked');
    });

    // paragraphElements.off - removes event listener

    // add event on element to work only ONE time
    paragraphElements.one('click', function () {
        alert('paragraph clicked ONE time only');
    });

    // on hover - two events hover in and hover out
    paragraphElements.hover(
        function () {
            console.log('hovered');
            $(this).hide();
        },
        function () {
            console.log('un-hovered');
        });
});
