// this is https://en.wikipedia.org/wiki/Immediately-invoked_function_expression

(function ($) {

    // jQuery.fn has all jQuery functions
    // we can give object that will have a list of parameters to our function-plugin
    $.fn.alexcarousel = function (options) {

        // get width of wrapper and make each image 33% of it's width
        $(this).wrap("<div class='alexcarousel-wrapper'></div>");

        var carouselWrapper = $('.alexcarousel-wrapper');

        var carouselBlock = $('.alexcarousel');

        // get all images in the list
        var images = $('.alexcarousel img');

        // set width to all images to be 33% of the alexcarousel-wrapper and width of
        // image left border and minus width of right border

        // we must calculate the border width bases on .alexcarousel-wrapper width

        var carouselWrapperBorderWidth;
        var borderWidth; // border of the images
        var carouselWidth; // width of all images that are in the carousel
        var numberOfImages = 3; // number of images to be displayed in carousel
        var currentCarouselShift = 0; // use this to track carousel shift

        updateSizes(); // set sizes

        $(window).resize(function () {
            // when window is resized we recalculate sizes
            updateSizes();
        });


        // add navigation at the bottom

        carouselWrapper.append('<div class=' + 'alexcarousel-navigation--left' + '><i class="fa fa-arrow-left" aria-hidden="true"></i></div>');
        carouselWrapper.append('<div class=' + 'alexcarousel-navigation--right' + '><i class="fa fa-arrow-right" aria-hidden="true"></i></div>');

        // now we need to add even listener of LEFT and RIGHT

        $('.alexcarousel-navigation--right').on('click',{direction: 'right'}, moveCarousel);
        $('.alexcarousel-navigation--left').on('click', { direction: 'left' }, moveCarousel);

        //set default state to .alexcarousel-navigation--leftDisabled;
        $('.alexcarousel-navigation--left').removeClass('alexcarousel-navigation--left').addClass('alexcarousel-navigation--leftDisabled').off('click');

        function moveCarousel(event)
        {
            $('.alexcarousel ul').css('transition', 'left 1s');
           
            if(event.data.direction === 'right')
            {
                
                // switch on event listener for LEFT and change CLASS
                // basically we activate LEFT navigation when we click RIGHT navigation
                if (currentCarouselShift === 0) {
                    $('.alexcarousel-navigation--leftDisabled').removeClass('alexcarousel-navigation--leftDisabled').addClass('alexcarousel-navigation--left').on('click', { direction: 'left' }, moveCarousel);
                }

                // if we reached the end we must disable RIGHT
                if (currentCarouselShift - numberOfImages + images.length === 1) {
                    $('.alexcarousel-navigation--right').removeClass('alexcarousel-navigation--right').addClass('alexcarousel-navigation--rightDisabled').off('click');
                }

                currentCarouselShift--;
                $('.alexcarousel ul').css('left', images.outerWidth() * currentCarouselShift + 'px');

                
            }

            if (event.data.direction === 'left') {
                
                // enable RIGHT if we start moving back
                // we simply enable RIGHT if it was disabled, that's all
                //if (currentCarouselShift + numberOfImages === 0) {
                //    $('.alexcarousel-navigation--rightDisabled').removeClass('alexcarousel-navigation--rightDisabled').addClass('alexcarousel-navigation--right').on('click', { direction: 'right' }, moveCarousel);
                //}

                if ($('.alexcarousel-navigation--rightDisabled').length === 1) {
                    $('.alexcarousel-navigation--rightDisabled').removeClass('alexcarousel-navigation--rightDisabled').addClass('alexcarousel-navigation--right').on('click', { direction: 'right' }, moveCarousel);
                }

                // here we must disable LEFT when ul left is 0
                if (currentCarouselShift === -1) {
                    $('.alexcarousel-navigation--left').removeClass('alexcarousel-navigation--left').addClass('alexcarousel-navigation--leftDisabled').off('click');
                }

                currentCarouselShift++;
                $('.alexcarousel ul').css('left', images.outerWidth() * currentCarouselShift + 'px');

               
            }
        }

        function updateSizes() {
            // if need size of scrollbar check this https://davidwalsh.name/detect-scrollbar-width

            // set new wrapper border width - carouselWrapper - carouselWrapperBorderWidth
            carouselWrapperBorderWidth = carouselWrapper.width() / 100 * 1 + 'px';
            carouselWrapper.css("borderWidth", carouselWrapperBorderWidth);
            carouselWrapper.css("borderRadius", carouselWrapper.width() / 100 * 1 / 2 + 'px');

            //border-radius: 10px; //borderRadius

            // calculate border width based of carouselWrapper width
            borderWidth = carouselWrapper.width() / 100 * 0.2 + 'px';

            // here we set the border width for images
            images.css("borderWidth", borderWidth);

            // set width that includes the borders
            images.outerWidth(carouselWrapper.width() / numberOfImages);

            // we need to calculate the total width of all images
            carouselWidth = images.length * images.outerWidth();

            // set actual carousel width
            $('.alexcarousel ul').css('width', carouselWidth + 'px');


            // when we resize, we also need to recalculate position of the carousel
            // first set transition to 0
            $('.alexcarousel ul').css('transition', 'left 0s');
            // update left of UL
            $('.alexcarousel ul').css('left', currentCarouselShift * images.outerWidth() + 'px');
            // transition will be set back when we click LEFT or RIGHT
        }

        return this;
    }

})(jQuery);
