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
            
            // bind hover events in desktop mode
            $(".q6-top-menu--desktop-mode .q6-menu-item--has-submenu").hover(
                function() {
                  $(this).removeClass("q6-menu-item--submenu-closed");
                }, function() {
                  $(this).addClass("q6-menu-item--submenu-closed");
                }
            );               
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

    // close menu in mobile mode after we click the menu item
    $(".q6-why-qencode-box__block").click(function(e) {
        var mobileMode = $('.hamburger').is(':visible');
        if(mobileMode){
            $(".hamburger").removeClass("is-active");
            $(".q6-top-menu--mobile-mode").addClass("q6-hidden"); 
        }         
    });

});           

