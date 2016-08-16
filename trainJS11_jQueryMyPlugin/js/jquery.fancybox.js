// this is https://en.wikipedia.org/wiki/Immediately-invoked_function_expression

(function ($) {

    // jQuery.fn has all jQuery functions
    // we can give object that will have a list of parameters to our function-plugin
    $.fn.fancybox = function (options) {

        // set default option in an object
        var defaults = {
            overlayColor:'black'
        }

        var settings = $.extend(defaults, options); // extend combines two obects
        
        var link = this; // get element that called the function
        var body = $('body');
        var overlay;
        var modal;

        function showModal(e) {
            e.preventDefault();

            overlay = $('<div class="fancybox-overlay"></div>');

            overlay.css({
                backgroundColor: settings.overlayColor
            });

            var href = link.attr('href');
            modal = $('<div class="fancybox-modal"><img src="' + href + '"></div>');

            overlay.one('click', hideModal); // add on click event to run 1 time only

            body.append(overlay);
            body.append(modal);
        }

        function hideModal() {
            modal.remove();
            overlay.remove();
        }

        link.on('click', showModal); // add on click event

        return this;
    }

})(jQuery);