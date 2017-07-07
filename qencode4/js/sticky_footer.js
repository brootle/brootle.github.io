document.addEventListener('DOMContentLoaded', function () {
    console.log('Sticky footer loaded with JavaScript');

    var footer = document.querySelector("footer");
    var body = document.querySelector("body");
    
    toogleStickyFooter();

    window.addEventListener("resize", toogleStickyFooter);

    function toogleStickyFooter(){

        var hasVScroll = body.scrollHeight > (screen.height - footer.scrollHeight);


        //var hasVScroll = window.innerWidth > document.documentElement.clientWidth;

        if(hasVScroll){
            // remove Sticky footer
            footer.classList.remove("sticky-footer");
        } else {
            // add sticky footer
            footer.classList.add("sticky-footer");
        }
    }   

});