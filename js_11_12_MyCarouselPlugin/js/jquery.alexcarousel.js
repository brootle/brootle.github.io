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
        //var borderWidth = '15px';

        var borderWidth;

        updateSizes();

        $(window).resize(function () {
            updateSizes();
        });


        // add navigation at the bottom

        carouselWrapper.append('<div class=' + 'alexcarousel-navigation--left' + '>LEFT</div>');
        carouselWrapper.append('<div class=' + 'alexcarousel-navigation--right' + '>RIGHT</div>');


        function updateSizes() {
            borderWidth = carouselWrapper.width() / 100 * 1.5 + 'px';

            // here we set the border width for images
            images.css("borderWidth", borderWidth);

            console.log(carouselWrapper.width());

            // set width that includes the borders
            images.outerWidth(carouselWrapper.width() / 3);

            console.log(images.outerWidth());

            if ($('body').get(0).scrollHeight !== $('body').get(0).clientHeight) {
                console.log('No scrollbar');
                // if there is no scrollbar we need to recalculate image width 
                // because real width of carousel container is bigger

                images.outerWidth(carouselWrapper.width() / 3);

                console.log(images.outerWidth());
            }
            else {
                console.log('Scrollbar is there');
            }
        }

        return this;
    }

})(jQuery);