
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded with JavaScript');   

    // https://davidwalsh.name/javascript-debounce-function
    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.
    function debounce(func, wait = 20, immediate = true) {
      var timeout;
      return function() {
        var context = this, args = arguments;
        var later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    };    

    const sliderImages = document.querySelectorAll('.slide-in');

    function checkSlide(e){
      sliderImages.forEach(sliderImage =>{
        // find when we scroll to the middle of the image, so we can show it
        const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height/2;

        // check when we get to the bottom of the image so we can remove it
        const imageBottom = sliderImage.offsetTop + sliderImage.height;

        // variable to monitor where we are relatively to the image
        const isHalfShown = slideInAt > sliderImage.offsetTop;
        const isNotScrolledPast = window.scrollY < imageBottom;

        if(isHalfShown && isNotScrolledPast){
          sliderImage.classList.add('active');
        } else{
          sliderImage.classList.remove('active');
        }

      });
      //console.count(e);
    }

    window.addEventListener('scroll', debounce(checkSlide));    


});