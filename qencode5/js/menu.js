$(function () {
    

    $(window).resize(updateMenuEvents); 
    updateMenuEvents(); // disable or enable on hover event for menu on page load
    
    // make mobile menu hidden on initial page load
    $(".q6-top-menu--mobile-mode").addClass("q6-hidden");  

    function updateMenuEvents(){
        var mobileMode = $('.hamburger').is(':visible');

        if(mobileMode){
            // disable on hover for menu
            $(".q6-top-menu").removeClass("q6-top-menu--desktop-mode");
            $(".q6-top-menu").addClass("q6-top-menu--mobile-mode");
            $(".q6-top-menu--mobile-mode").addClass("q6-hidden"); 
            $(".hamburger").removeClass("is-active");

            // close all open submenu
            $(".q6-menu-item--has-submenu").addClass("q6-menu-item--submenu-closed");
        } else{                
            // enable on hover for menu   
            $(".q6-top-menu").addClass("q6-top-menu--desktop-mode");   
            $(".q6-top-menu").removeClass("q6-top-menu--mobile-mode");                                                 
        }
    }                   

    $('.hamburger').click(function() {
        $(this).toggleClass('is-active');    
        
        if($(this).hasClass('is-active')){
            $("#top-menu").removeClass("q6-hidden")
        } else {
            $("#top-menu").addClass("q6-hidden");
        }                  
    });
    
    // this will open and close submenu in mobile mode
    $('.q6-menu-item--has-submenu').click(function(e) {
        e.preventDefault();
        $(this).toggleClass('q6-menu-item--submenu-closed');     
    });

});           

