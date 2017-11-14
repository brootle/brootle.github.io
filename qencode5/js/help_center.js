           // see file:///home/alex/brootle.github.io/panel_toggle/index.html
           
            // id = top_navbar
            // id = help_sidebar
            let topNavbarCoordinates;
            let helpSidebarContainerCoordinates;

            let helpSidebar = document.getElementById('help_sidebar');
            let helpSidebarContainer = document.getElementById('help_sidebar_container');
            let helpContent = document.getElementById('help_content');

            helpSidebarContainer.style.height = window.getComputedStyle(helpContent,null).getPropertyValue('height');

            // ==================== SCROLL LISTENER ====================
            // https://davidwalsh.name/javascript-debounce-function
            function debounce(func, wait, immediate) {
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

            var glueNavbar = debounce(function() {
                // check if we glue sidebar
                // we should also glur footer to sidebar bottom in some cases

                topNavbarCoordinates = document.getElementById('top_navbar').getBoundingClientRect();
                helpSidebarContainerCoordinates = document.getElementById('help_sidebar_container').getBoundingClientRect();

                if(helpSidebarContainerCoordinates.top < topNavbarCoordinates.bottom){

                    // add glued style and update position
                    helpSidebar.classList.add('sidebar--glued');
                    // set top position of sidebar to bottom of top tavbar
                    helpSidebar.style.top = `${topNavbarCoordinates.bottom}px`;

                } else {
                    // set top position of sidebar to default
                    helpSidebar.style.top = `${helpSidebarContainerCoordinates.top}px`;                                              
                }

                // we should also expand container in case scrollbar overflows the bottom
                // so the sidebar container will push the footer down
                if((helpSidebarContainerCoordinates.bottom - 70) < helpSidebar.getBoundingClientRect().bottom){

                    let helpSidebarContainerHeight = parseInt(window.getComputedStyle(helpSidebarContainer,null).getPropertyValue('height'), 10);
                    let helpContentHeight = parseInt(window.getComputedStyle(helpContent,null).getPropertyValue('height'), 10);
                    //if sidebar container is higher than content height -> don't expand anymore
                    if(!(helpSidebarContainerHeight > (helpContentHeight+helpSidebarContainerCoordinates.bottom))){
                        helpSidebarContainer.style.height = helpSidebarContainerHeight + 70 + (helpSidebar.getBoundingClientRect().bottom - helpSidebarContainerCoordinates.bottom) + 'px';
                    }
                }
   
            }, 250);


            window.addEventListener('scroll', glueNavbar);   
            // ==================== SCROLL LISTENER ====================   