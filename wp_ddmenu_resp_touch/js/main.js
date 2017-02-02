$(function () {
    console.log('DOM loaded with jQuery - short version');

    // we initiate the plugin

    $( '#nav li:has(ul)' ).doubleTapToGo();

});