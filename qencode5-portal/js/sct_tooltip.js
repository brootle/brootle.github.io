$(function () {
  
    console.log("Tooltips activated")

    $("[data-sct_tooltip='tooltip-button']").click(function(e) { 
        console.log("show tooltip");

        // https://stackoverflow.com/a/26230989/6261255
        function getCoords(elem) {
            var box = elem.getBoundingClientRect();
        
            var body = document.body;
            var docEl = document.documentElement;
        
            var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
            var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
        
            var clientTop = docEl.clientTop || body.clientTop || 0;
            var clientLeft = docEl.clientLeft || body.clientLeft || 0;
        
            var top  = box.top +  scrollTop - clientTop;
            var left = box.left + scrollLeft - clientLeft;
        
            return { top: Math.round(top), left: Math.round(left) };
        }        

        // var tooltip_btn = this;
        // var tooltip_window = tooltip_btn.nextElementSibling;

        // check if current is opened
        if($(this).hasClass('sct__tooltip--active')){
            $(this).removeClass('sct__tooltip--active');
        } else{
            // hide all opened
            $('.sct__tooltip--active').removeClass('sct__tooltip--active');
            // show current 
            $(this).addClass('sct__tooltip--active');

            var position = getCoords(this);
            console.log(position);
        }        

    }); 

    // hide when clicked outside
    // $(window).click(function(e){
    //     if (!event.target.matches('.sct__tooltip')) {
    //         $('.sct__tooltip--active').removeClass('sct__tooltip--active')
    //     }
    // });           
 
                                                                                                                                                                       
});


                 
