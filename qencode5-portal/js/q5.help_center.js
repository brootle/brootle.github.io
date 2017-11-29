$(function () {
    // console.log('DOM loaded with jQuery - short version');
    
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

    // we also need to set width of the menu same as help_sidebar_container
    // $(sidebarMenu).width($('#help_sidebar_container').width() + 'px'); 
    
    $(window).on("resize scroll",function(){        
     
        var sidebarTopPosition = document.getElementById('help_sidebar_container').getBoundingClientRect().top;
        var sidebarBottomPosition = document.getElementById('help_sidebar').getBoundingClientRect().bottom;
        
        var footerHeight = $('footer').height();
        var footerTopPosition = document.querySelector('footer').getBoundingClientRect().top;
        

        // glue menu it it's not already glued and set top position for it
        if(sidebarTopPosition < topNavHeight){
            $(sidebarMenu).addClass("q5-sidebar--glued");
            $(sidebarMenu).css({'top' : topNavHeight + 'px'});
            $(sidebarMenu).height($(window).height() - topNavHeight);
            // we also need to set width of the menu same as help_sidebar_container
            $(sidebarMenu).width($('#help_sidebar_container').width() + 'px');
        } else{
            //console.log("detach menu");
            $(sidebarMenu).removeClass("q5-sidebar--glued");
            $(sidebarMenu).css({'top' : '0'});            
        }

        // adapt the height of sidebar menu so it doesn't overlap footer
        if((footerTopPosition -10) < sidebarBottomPosition){
            $(sidebarMenu).height(footerTopPosition - topNavHeight);
        }

    });
   
});
