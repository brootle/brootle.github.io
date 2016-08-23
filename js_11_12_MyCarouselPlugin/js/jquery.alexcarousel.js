// this is https://en.wikipedia.org/wiki/Immediately-invoked_function_expression

(function ($) {

    // jQuery.fn has all jQuery functions
    // we can give object that will have a list of parameters to our function-plugin
    $.fn.alexcarousel = function (options) {

        // set default option in an object
        var defaults = {
            numberOfImages: '3'
        }

        var settings = $.extend(defaults, options); // extend combines two obects

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

        //var numberOfImages = 3; // number of images to be displayed in carousel can get via parameter
        var numberOfImages = settings.numberOfImages; // number of images to be displayed in carousel can get via parameter
        // must add check if the user tries to display more images that are available and disable RIGHT button
        if (numberOfImages > images.length) {
            numberOfImages = images.length;
        }

        var currentCarouselShift = 0; // use this to track carousel shift
        var selectedImage = 0; // currently selected image

        updateSizes(); // set sizes

        // add navigation arrows LEFT and RIGHT at the bottom

        carouselWrapper.append('<div class=' + 'alexcarousel-navigation--left' + '><i class="fa fa-arrow-left" aria-hidden="true"></i></div>');
        carouselWrapper.append('<div class=' + 'alexcarousel-navigation--right' + '><i class="fa fa-arrow-right" aria-hidden="true"></i></div>');

        // add round navigation buttons block
        carouselWrapper.append("<div class='round-buttons-block'></div>");

        // set a string with all HTML elements for round buttons
        var roundButtonsHTML = '';
        for (var i = 0; i < images.length - numberOfImages + 1; i++) {
            roundButtonsHTML += "<div class='button round-buttons-block__button'></div>"
        }

        // add buttons inside buttons block
        $('.round-buttons-block').html(roundButtonsHTML);


        // $(this).index()
        // we need to put event handler on buttons, we pass index of clicked button
        $('.button').on('click', { direction: '0' }, updateCarouselPosition);

        // we trigger the click to disable RIGHT button
        if (numberOfImages === images.length) {
            $('.button').trigger('click');
        }

        // set 1st button as active by defauls
        $('.button').eq(0).removeClass('round-buttons-block__button').addClass('round-buttons-block__button--active');
        $('.round-buttons-block__button--active').off('click');

        // position buttons block in the center of carousel wrapper
        var buttonsBlockPosition = carouselWrapper.width() / 2 - $('.round-buttons-block').width() / 2 + 'px';
        $('.round-buttons-block').css('left', buttonsBlockPosition);


        // now we need to add even listener of LEFT and RIGHT
        $('.alexcarousel-navigation--right').on('click', { direction: '1' }, updateCarouselPosition);
        $('.alexcarousel-navigation--left').on('click', { direction: '-1' }, updateCarouselPosition);

        //set default state to .alexcarousel-navigation--leftDisabled;
        $('.alexcarousel-navigation--left').removeClass('alexcarousel-navigation--left').addClass('alexcarousel-navigation--leftDisabled').off('click');

        // make our carousel to run itself
        var carouselShiftInterval = setInterval(triggerCarouselShift, 6000);

        // stop carousel when mouse is over it
        // why? because when the user points Carousel it means he wants to take control over it
        $('.alexcarousel-wrapper').hover(
            function () {
                clearInterval(carouselShiftInterval);
            },
            function () {
                carouselShiftInterval = setInterval(triggerCarouselShift, 6000);
            });

        // triggers carousel shift
        function triggerCarouselShift () {
            currentCarouselShift++;
            if (currentCarouselShift > images.length - numberOfImages) {
                currentCarouselShift = 0;
            }
            $('.button').eq(currentCarouselShift).trigger('click');
        }

        $(window).resize(function () {
            // when window is resized we recalculate sizes
            updateSizes();

            // position buttons block in the center of carousel wrapper
            var buttonsBlockPosition = carouselWrapper.width() / 2 - $('.round-buttons-block').width() / 2 + 'px';
            $('.round-buttons-block').css('left', buttonsBlockPosition);

            // update carouselPosition
            $('.alexcarousel ul').css('left', images.outerWidth() * currentCarouselShift * (-1) + 'px');
        });

        function setActiveRoundButton() {
            //console.log(currentCarouselShift);
            // need to add event handler to the button that was ACTIVE
            $('.round-buttons-block__button--active').on('click', { direction: '0' }, updateCarouselPosition).removeClass('round-buttons-block__button--active').addClass('round-buttons-block__button');
            // we also must remove event handler from selected button
            $('.button').eq(currentCarouselShift).off('click').removeClass('round-buttons-block__button').addClass('round-buttons-block__button--active');
        }

        function updateCarouselPosition(event) {
            // here at the end we must also set active button and make previous button inactive

            if (parseInt(event.data.direction) !== 0) {
                currentCarouselShift += parseInt(event.data.direction);
            } else {
                // round button was clicked
                currentCarouselShift = $(this).index();
            }

            $('.alexcarousel ul').css('transition', 'left 1s');
            $('.alexcarousel ul').css('left', images.outerWidth() * currentCarouselShift * (-1) + 'px');

            if (currentCarouselShift === 0) {
                // if 0 image selected we disable LEFT navigation
                $('.alexcarousel-navigation--left').removeClass('alexcarousel-navigation--left').addClass('alexcarousel-navigation--leftDisabled').off('click');
            } else {
                // we enable LEFT navigation
                $('.alexcarousel-navigation--leftDisabled').removeClass('alexcarousel-navigation--leftDisabled').addClass('alexcarousel-navigation--left').on('click', { direction: '-1' }, updateCarouselPosition);
            }

            if (currentCarouselShift === (images.length - numberOfImages)) {
                // if 6-3+1 image selected we disable RIGHT navigation
                $('.alexcarousel-navigation--right').removeClass('alexcarousel-navigation--right').addClass('alexcarousel-navigation--rightDisabled').off('click');
            } else {
                // we enable RIGHT navigation
                $('.alexcarousel-navigation--rightDisabled').removeClass('alexcarousel-navigation--rightDisabled').addClass('alexcarousel-navigation--right').on('click', { direction: '+1' }, updateCarouselPosition);
            }

            setActiveRoundButton();

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
