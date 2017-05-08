$(function () {
    console.log('DOM loaded with jQuery - short version');

    $('.quickstats').on('click', function(){
        // var statBar = $(this).closest('.extra').closest('.item').closest('.segment').closest('container').find('.stats');
        var statBar = $(this).closest('.container').find( ".stats" );
        

        console.log("button clicked");
        console.log(statBar);
        if (statBar.hasClass('hidden')){
            statBar.removeClass('hidden');
            statBar.addClass('visible');
        } else {
            statBar.removeClass('visible');
            statBar.addClass('hidden');   
        }
    });

});

// http://stackoverflow.com/questions/43569019/update-visibility-of-an-element-on-button-click/43569477#43569477