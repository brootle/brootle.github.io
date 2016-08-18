// this is https://en.wikipedia.org/wiki/Immediately-invoked_function_expression

(function ($) {

    // jQuery.fn has all jQuery functions
    // we can give object that will have a list of parameters to our function-plugin
    $.fn.alexcarousel = function (options) {

        // get width of wrapper and make each image 33% of it's width

        var carouselWrapper = $('.alexcarousel-wrapper');

        var carouselBlock = $('.alexcarousel');

        // get all images in the list
        var images = $('.alexcarousel img');

        // set width to all images to be 33% of the alexcarousel-wrapper and width of
        // image left border and minus width of right border

        // we must calculate the border width bases on .alexcarousel-wrapper width
        var borderWidth = '15px';

        // here we set the border width for images
        images.css("borderWidth", borderWidth);

        console.log(carouselWrapper.width());
        console.log(carouselWrapper.outerWidth());

        // set width that includes the borders
        images.outerWidth(carouselWrapper.width() / 3);

        console.log(images.outerWidth());

        // add navigation at the bottom

        carouselWrapper.append('<div class=' + 'alexcarousel-navigation--left' + '>LEFT</div>');
        carouselWrapper.append('<div class=' + 'alexcarousel-navigation--right' + '>RIGHT</div>');

        // set width of the UL 

        //// set default option in an object
        //var defaults = {
        //    overlayColor:'black'
        //}

        //var settings = $.extend(defaults, options); // extend combines two obects
        
        //var link = this; // get element that called the function
        //var body = $('body');
        //var overlay;
        //var modal;

        //function showModal(e) {
        //    e.preventDefault();

        //    overlay = $('<div class="fancybox-overlay"></div>');

        //    overlay.css({
        //        backgroundColor: settings.overlayColor
        //    });

        //    var href = link.attr('href');
        //    modal = $('<div class="fancybox-modal"><img src="' + href + '"></div>');

        //    overlay.one('click', hideModal); // add on click event to run 1 time only

        //    body.append(overlay);
        //    body.append(modal);
        //}

        //function hideModal() {
        //    modal.remove();
        //    overlay.remove();
        //}

        //link.on('click', showModal); // add on click event

        return this;
    }

})(jQuery);