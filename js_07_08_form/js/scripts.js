$(function () {
    console.log('DOM loaded with jQuery - short version');

    // on hover over the input field get it's tittle

    // get all inputs in a form
    var inputsList = $('fieldset input');

    var tooltip;

    $(inputsList).hover(
        function () {

            // we call remove in case some tooltip was added by other function
            $('.tooltip').remove();
        
            tooltip = $(this).attr('title');

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
    });

    $('.help-button').on('click', function () {
        console.log('clicked');
        // make a loop
        // in the loop we add tooltip
        inputsList.each(function () {
            tooltip = $(this).attr('title');
            $('<a class=' + 'tooltip' + '>' + tooltip + '</a>').insertAfter(this);
            //console.log($(this).attr('title'));
        });
    });
});