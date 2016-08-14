$(function () {
    console.log('DOM loaded with jQuery - short version');

    // pure JavaScript
    var box = document.querySelector('.js-box');

    function slideLeft(element, duration, slideDistance) {

        var leftPosition = parseInt(element.style.left) || 0; // if element.style.left exists we use it, otherwise we use 0
        var opacity = element.style.opacity || '1';
        var time = 0;
        var fps = 50;

        var interval = setInterval(function () {

            // stop calling functuon after certain amount of time
            if (time > duration) {
                clearInterval(interval);
            }

            time += (duration / fps);
            opacity -= 0.0048;
            element.style.opacity = opacity;
            console.log(opacity);
            leftPosition += (slideDistance / (duration / fps)); // move few px each itteration
            element.style.left = leftPosition + 'px';
        }, duration / fps);
    }
    
    box.addEventListener('click', function () {
        slideLeft(box, 1000, 200);
    });

    // jQuery Animation
    $('.jquery-box').on('click', function () {
        $(this).animate({
            left: '+=520', // we use += to increase on 520 px each time we click'
            opacity: '-=0.25' // we can give different properties for animation
        }, 1000, 'easeInBack');   // here we can used jquery-easing plugin for 3rd parameter
                    // see more at http://easings.net/
    });

    // CSS Animation
    $('.css-box').on('click', function () {
        $(this).addClass('css-box--animated');
    });
});
