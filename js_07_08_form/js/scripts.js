$(function () {
    console.log('DOM loaded with jQuery - short version');

    // on hover over the input field get it's tittle

    // get all inputs in a form
    var inputsList = $('fieldset input');

    console.log(inputsList);

    var tooltip;

    $(inputsList).hover(
    function () {
        
        tooltip = $(this).attr('title');
        console.log(tooltip);

        // remove tittle attribute
        $(this).removeAttr('title');

        // now let's show tooltip on the right from the input
        $('<a class=' + 'tooltip'+ '>' + tooltip + '</a>').insertAfter(this);
        
    },
    function () {
        // restore tittle attribute
        $(this).attr('title', tooltip);

        // remove tooltip
        $('.tooltip').remove();
    }
);
});