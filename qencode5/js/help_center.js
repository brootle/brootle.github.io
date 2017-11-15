$(function () {
    console.log('DOM loaded with jQuery - short version');
    
    // soft scroll inside page clicking nav links
    $(".sidebar-menu__submenu > .q-link").click(function(e) { 
        e.preventDefault(); 

        // use try/catch to handle situation when help section is missing
        try {
            var dest = $(this).attr('href'); 
            // minus hight of top_navbar and some space 
            $('html,body').animate({ scrollTop: $(dest).offset().top - $('#top_navbar').height() - $('#top_navbar').height()/2 }, 'slow'); 

            // find all selected links and remove them -> sidebar-menu__selected-link
            $('.sidebar-menu__submenu > .sidebar-menu__selected-link').each(function() {
                $(this).removeClass('sidebar-menu__selected-link');
                //console.log(this);
            });            

            // add sidebar-menu__selected-link style to clicked link
            $(this).addClass("sidebar-menu__selected-link");
        } catch (error) {
            console.log(error);
            console.log("Looks like help section related to this link was not found");
        }

    });

    // glue menu if scrolled down too much

    // set sidebar height on page loaded
    var sidebarMenu = $('#help_sidebar');
    var topNavHeight = $('#top_navbar').height();
    $(sidebarMenu).height($(window).height() - topNavHeight);
    
    //$(window).scroll(function() {
    $(window).on("resize scroll",function(){        
     
        var sidebarTopPosition = document.getElementById('help_sidebar_container').getBoundingClientRect().top;
        var sidebarBottomPosition = document.getElementById('help_sidebar').getBoundingClientRect().bottom;
        
        var footerHeight = $('footer').height();
        var footerTopPosition = document.querySelector('footer').getBoundingClientRect().top;
        

        // glue menu it it's not already glued and set top position for it
        if(sidebarTopPosition < topNavHeight){
            $(sidebarMenu).addClass("sidebar--glued");
            $(sidebarMenu).css({'top' : topNavHeight + 'px'});
            $(sidebarMenu).height($(window).height() - topNavHeight);
        } else{
            //console.log("detach menu");
            $(sidebarMenu).removeClass("sidebar--glued");
            $(sidebarMenu).css({'top' : '0'});            
        }

        // adapt the height of sidebar menu so it doesn't overlap footer
        if((footerTopPosition -10) < sidebarBottomPosition){
            $(sidebarMenu).height(footerTopPosition - topNavHeight);
        }

     

    });
   


});

 
        //    // see file:///home/alex/brootle.github.io/panel_toggle/index.html
           
        //     // id = top_navbar
        //     // id = help_sidebar
        //     let topNavbarCoordinates;
        //     let helpSidebarContainerCoordinates;

        //     let helpSidebar = document.getElementById('help_sidebar');
        //     let helpSidebarContainer = document.getElementById('help_sidebar_container');
        //     let helpContent = document.getElementById('help_content');

        //     helpSidebarContainer.style.height = window.getComputedStyle(helpContent,null).getPropertyValue('height');

        //     // ==================== SCROLL LISTENER ====================
        //     // https://davidwalsh.name/javascript-debounce-function
        //     function debounce(func, wait, immediate) {
        //         var timeout;
        //         return function() {
        //             var context = this, args = arguments;
        //             var later = function() {
        //                 timeout = null;
        //                 if (!immediate) func.apply(context, args);
        //             };
        //             var callNow = immediate && !timeout;
        //             clearTimeout(timeout);
        //             timeout = setTimeout(later, wait);
        //             if (callNow) func.apply(context, args);
        //         };
        //     };               

        //     var glueNavbar = debounce(function() {
        //         // check if we glue sidebar
        //         // we should also glur footer to sidebar bottom in some cases

        //         topNavbarCoordinates = document.getElementById('top_navbar').getBoundingClientRect();
        //         helpSidebarContainerCoordinates = document.getElementById('help_sidebar_container').getBoundingClientRect();

        //         if(helpSidebarContainerCoordinates.top < topNavbarCoordinates.bottom){

        //             // add glued style and update position
        //             helpSidebar.classList.add('sidebar--glued');
        //             // set top position of sidebar to bottom of top tavbar
        //             helpSidebar.style.top = `${topNavbarCoordinates.bottom}px`;

        //         } else {
        //             // set top position of sidebar to default
        //             helpSidebar.style.top = `${helpSidebarContainerCoordinates.top}px`;                                              
        //         }

        //         // we should also expand container in case scrollbar overflows the bottom
        //         // so the sidebar container will push the footer down
        //         if((helpSidebarContainerCoordinates.bottom - 70) < helpSidebar.getBoundingClientRect().bottom){

        //             let helpSidebarContainerHeight = parseInt(window.getComputedStyle(helpSidebarContainer,null).getPropertyValue('height'), 10);
        //             let helpContentHeight = parseInt(window.getComputedStyle(helpContent,null).getPropertyValue('height'), 10);
        //             //if sidebar container is higher than content height -> don't expand anymore
        //             if(!(helpSidebarContainerHeight > (helpContentHeight+helpSidebarContainerCoordinates.bottom))){
        //                 helpSidebarContainer.style.height = helpSidebarContainerHeight + 70 + (helpSidebar.getBoundingClientRect().bottom - helpSidebarContainerCoordinates.bottom) + 'px';
        //             }
        //         }
   
        //     }, 250);


        //     window.addEventListener('scroll', glueNavbar);   
        //     // ==================== SCROLL LISTENER ====================   