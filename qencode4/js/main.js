
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded with JavaScript');

    var headerCard = document.querySelector(".header-card");
    // var headerCard = document.querySelector(".main-card.pink");
    var headerCardHeight = headerCard.clientHeight; // 180

    console.log(document.querySelector(".header-card").clientHeight);

    // get initial Y values
    var initialY = initialYPositions();

    var navMenuFlaf = false;

    // get menu
    var menu = document.querySelector('.header-menu');  
    var menuHeight = menu.clientHeight;  

    var menuCoordinates = menu.getBoundingClientRect(); 


    var background;
    var linerGradient;
    // get initial background on page loaded
    //background = window.getComputedStyle(menu, null).getPropertyValue("background");
    background = window.getComputedStyle(menu, null).getPropertyValue("background-image");
    // => linear-gradient(45deg, rgba(126, 47, 182, 0) 0%, rgba(126, 47, 182, 0) 25%, rgba(249, 71, 157, 0) 80%, rgba(249, 71, 157, 0) 100%)
    // bug -> returns NULL in firefox
    // padding-bottom
    console.log(background);
    //linerGradient = background.match(/linear-gradient\([^(]*(\([^)]*\)[^(]*)*[^)]*\)/g)[0]; 
    linerGradient = background; 
    //console.log(linerGradient); 
  

    // set background in case user refresh page when it's already scrolled down a lot

    // make sure if user refresh page in the middle we make color solid
    menuCoordinates = menu.getBoundingClientRect(); 
    headerCoordinates = headerCard.getBoundingClientRect();

    // console.log(headerCoordinates.bottom);
    // console.log(menuCoordinates.bottom);

    if(headerCoordinates.bottom <= menuCoordinates.bottom){
        
        //menu.style.background = "linear-gradient(45deg, rgba(126,47,182,0.99) 0%, rgba(126,47,182,0.99) 25%, rgba(249,71,157,0.99) 80%, rgba(249,71,157,0.99) 100%)"
        // THERE IS A BUG - when scrolled to bottom      
        // headerCoordinates.bottom is > menuCoordinates.bottom
        menu.style.background = linerGradient.replace(/[^,]+(?=\))/g, 0.99);
        //menu.style.background = `linear-gradient(to right, rgba(4, 42, 146, 1) 0%, rgba(56, 167, 192, 1) 100%)`;
    }        
         

    window.addEventListener("resize", function(){
        if(window.innerWidth <= 480){
            // just make sure we set background menu solid color
            // menu.style.background = `linear-gradient(to right, rgba(4, 42, 146, 1) 0%, rgba(56, 167, 192, 1) 100%)`;
            menuCoordinates = menu.getBoundingClientRect(); 
            headerCoordinates = headerCard.getBoundingClientRect();

            // console.log(headerCoordinates.bottom);
            // console.log(menuCoordinates.bottom);

            if(headerCoordinates.bottom <= menuCoordinates.bottom){
                
                //menu.style.background = "linear-gradient(45deg, rgba(126,47,182,0.99) 0%, rgba(126,47,182,0.99) 25%, rgba(249,71,157,0.99) 80%, rgba(249,71,157,0.99) 100%)"
                // THERE IS A BUG - when scrolled to bottom      
                // headerCoordinates.bottom is > menuCoordinates.bottom
                menu.style.background = linerGradient.replace(/[^,]+(?=\))/g, 0.99);
                //menu.style.background = `linear-gradient(to right, rgba(4, 42, 146, 1) 0%, rgba(56, 167, 192, 1) 100%)`;
            }             
        } 
 
        // we need to recalculate background for header
        if(window.innerWidth >= 780){
            changeNavBackground();
            moveBackgrounds();            
        }

        toggleMenuShadow();

    });    
  
    window.addEventListener('scroll', function(){
        //console.log(window.scrollY);
        // make sure we do effects only if screen size more than 480
        // only recalculate in the visible area
        menuCoordinates = menu.getBoundingClientRect(); 
        headerCoordinates = headerCard.getBoundingClientRect();
        //if(window.innerWidth > 480 && headerCoordinates.bottom >= menuCoordinates.bottom){
        if(headerCoordinates.bottom >= menuCoordinates.bottom){
            changeNavBackground();
            moveBackgrounds();
        } else {
            // just make sure we make background solid when scroll bellow header
             menu.style.background = linerGradient.replace(/[^,]+(?=\))/g, 0.99);  
            //console.log(linerGradient.replace(/[^,]+(?=\))/g, 0.99));
            //var solidGradient = linerGradient.replace(/[^,]+(?=\))/g, 0.99);   
            //solidGradient = "red";

            //menu.setAttribute('style', `background: ${solidGradient} none repeat scroll 0% 0%;`);        
        }

        toggleMenuShadow();

    });

    var showMenuButton = document.querySelector("#menu-button");
    var closeMenuButton = document.querySelector("#сlose-button");
    var subMenu = document.querySelector(".menu-nav-items");

    showMenuButton.addEventListener('click', function(){

        menu.style.background = linerGradient.replace(/[^,]+(?=\))/g, 0.99);
        //menu.style.background = `linear-gradient(to right, rgba(4, 42, 146, 1) 0%, rgba(56, 167, 192, 1) 100%)`;  
        this.style.display = "none";
        closeMenuButton.style.display = "inline-block";
        subMenu.classList.toggle("hide-menu");
        // subMenu.style.display = "flex";
        // menu-nav-items
        toggleMenuShadow();

    });

    closeMenuButton.addEventListener('click', function(){
        this.style.display = "none";
        showMenuButton.style.display = "inline-block";
        subMenu.classList.toggle("hide-menu"); 

        toggleMenuShadow();       

        menuCoordinates = menu.getBoundingClientRect(); 
        headerCoordinates = headerCard.getBoundingClientRect();

        // console.log(headerCoordinates.bottom);
        // console.log(menuCoordinates.bottom);

        if(headerCoordinates.bottom <= menuCoordinates.bottom){
            
            //menu.style.background = "linear-gradient(45deg, rgba(126,47,182,0.99) 0%, rgba(126,47,182,0.99) 25%, rgba(249,71,157,0.99) 80%, rgba(249,71,157,0.99) 100%)"
            // THERE IS A BUG - when scrolled to bottom      
            // headerCoordinates.bottom is > menuCoordinates.bottom
            menu.style.background = linerGradient.replace(/[^,]+(?=\))/g, 0.99);
            //menu.style.background = `linear-gradient(to right, rgba(4, 42, 146, 1) 0%, rgba(56, 167, 192, 1) 100%)`;
        } else {
            // change transparency relative to scroll
        
            //menu.style.background = linerGradient.replace(/[^,]+(?=\))/g, 0.01);

            // change transparency relative to scroll
            var transformIndex = Math.round(window.scrollY/menuHeight/1.5*100)/100;
            if(transformIndex <= 0){
                transformIndex = 0.01;
            }            
            // /[\d\.]+\)$/g
            var updatedBackground;
            // if the transparency index is > 1 we set it to 0.99
            // because if it gets to 1 and more it transforms from rgba to rgb
            if(transformIndex < 1){
                updatedBackground = linerGradient.replace(/[^,]+(?=\))/g, transformIndex);
                //console.log(updatedBackground);

                //menu.style.background = `linear-gradient(to right, rgba(4, 42, 146, ${transformIndex}) 0%, rgba(56, 167, 192, ${transformIndex}) 100%)`;  
                menu.style.background = updatedBackground; 
                //menu.style.background = `linear-gradient(45deg, rgba(126, 47, 182, 1) 0%, rgba(126, 47, 182, 1) 25%, rgba(249, 71, 157, 1) 80%, rgba(249, 71, 157, 1) 100%)`; 
                // rgba(0, 0, 0,1.5934959349593496) linear-gradient(to right, rgb(4, 42,1.5934959349593496) 0%, rgb(56, 167,1.5934959349593496) repeat scroll 0% 0% / auto padding-box border-box
            } else{
                updatedBackground = linerGradient.replace(/[^,]+(?=\))/g, 0.99);
                menu.style.background = updatedBackground;             
            }

        }     


    
        // subMenu.style.display = "none";


    });    

    function toggleMenuShadow(){
        var menuCoordinates = menu.getBoundingClientRect();         

        // get coordinates of the header card
        headerCoordinates = headerCard.getBoundingClientRect();
        // console.log(headerCoordinates.bottom);

        // add shadow
        if(headerCoordinates.bottom <= menuCoordinates.bottom){
            menu.style.boxShadow = "0px 0px 23px 4px rgba(22,14,84,0.6)";
        }

        // remove shadow
        if(headerCoordinates.bottom >= menuCoordinates.bottom){
            menu.style.boxShadow = "";
        }   
    }

    
    function changeNavBackground(){

        // You got the string, replace whatever
        // 'rgba(1,1,1,0.3)'.replace(/[^,]+(?=\))/, '0.5')
    
        // get current background and change it's transparency
        // if background is null we get computed background
        // var background;
        // var linerGradient;
        // only get computed value if there is no background set


        // if(menu.style.background == false){
        //     // background = window.getComputedStyle(menu, null).getPropertyValue("background");
        //     background = window.getComputedStyle(menu, null).getPropertyValue("background-image");
        //     linerGradient = background.match(/linear-gradient\([^(]*(\([^)]*\)[^(]*)*[^)]*\)/g)[0];
        // }else{
        //     //console.log("ELSE");
        //     linerGradient = menu.style.background;
        // }
        linerGradient = window.getComputedStyle(menu, null).getPropertyValue("background-image");


        // console.log(computedBackground);
        // => rgba(0, 0, 0, 0) linear-gradient(45deg, rgba(126, 47, 182, 0) 0%, rgba(126, 47, 182, 0) 25%, rgba(249, 71, 157, 0) 80%, rgba(249, 71, 157, 0) 100%) repeat scroll 0% 0% / auto padding-box border-box
        // now we should only change transparency

        // => linear-gradient\([^(]*(\([^)]*\)[^(]*)*[^)]*\)
        // var linerGradient = background.match(/linear-gradient\([^(]*(\([^)]*\)[^(]*)*[^)]*\)/g)[0];
        //console.log(linerGradient);

        // change transparency relative to scroll
        var transformIndex = Math.round(window.scrollY/menuHeight/1.5*100)/100;
        // always keep transformIndex !=0
        // otherwise in Mozilla 'rgba(126, 47, 182, 0.00)' will be 'transparent'
        if(transformIndex <= 0){
            transformIndex = 0.01;
        }
        // /[\d\.]+\)$/g
        //console.log(transformIndex);
        var updatedBackground;
        // if the transparency index is > 1 we set it to 0.99
        // because if it gets to 1 and more it transforms from rgba to rgb
        if(transformIndex < 1){
            updatedBackground = linerGradient.replace(/[^,]+(?=\))/g, transformIndex);
            //console.log(updatedBackground);

            //console.log(linerGradient);

            //menu.style.background = `linear-gradient(to right, rgba(4, 42, 146, ${transformIndex}) 0%, rgba(56, 167, 192, ${transformIndex}) 100%)`;  
            menu.style.background = updatedBackground; 
            //menu.style.background = `linear-gradient(45deg, rgba(126, 47, 182, 1) 0%, rgba(126, 47, 182, 1) 25%, rgba(249, 71, 157, 1) 80%, rgba(249, 71, 157, 1) 100%)`; 
            // rgba(0, 0, 0,1.5934959349593496) linear-gradient(to right, rgb(4, 42,1.5934959349593496) 0%, rgb(56, 167,1.5934959349593496) repeat scroll 0% 0% / auto padding-box border-box
        } else{
            //console.log(updatedBackground);
            updatedBackground = linerGradient.replace(/[^,]+(?=\))/g, 0.99);
            menu.style.background = updatedBackground;     

             //menu.style.background = "linear-gradient(45deg, rgba(126, 47, 182, 0.5) 0%, rgba(126, 47, 182, 0.5) 25%, rgba(249, 71, 157, 0.5) 80%, rgba(249, 71, 157, 0.5) 100%) 0% 0%";        
        }

    }


    // returns initial Y positions of backgrounds
    function initialYPositions(){
        var backgroundPosition = window.getComputedStyle(headerCard,null).backgroundPosition;
        var positions = backgroundPosition.replace(/\%/g, "").split(', ');
        // => ["5 78", "31 1", "0 0"]   
        // convert % to pixels
        var pixelPositionsY = [];
        for(var i = 0; i < positions.length - 1; i++){
            var positionsXY = positions[i].split(' ').map(parseFloat);
            // var posY = initialY[i];
            var posY = positionsXY[1];
            pixelPositionsY.push(posY);
        }
        pixelPositionsY.push(0);  
        console.log(pixelPositionsY) 
        // => [78, 1, 0]         
        return pixelPositionsY;
    }

    function moveBackgrounds(){

        var newY = window.scrollY * 100 / headerCardHeight;
        // console.log(newY);

        var backgroundPosition = window.getComputedStyle(headerCard,null).backgroundPosition;
        // => 5% 78%, 31% 0%, 0% 0%   

        // split background positions into array and save all except last one
        // as the last one is gradient background
        // here we remove % and split positions into array
        var positions = backgroundPosition.replace(/\%/g, "").split(', ');
        // => ["5 78", "31 1", "0 0"]   

        // convert % to pixels
        var pixelPositions = [];
        for(var i = 0; i < positions.length - 1; i++){
            var positionsXY = positions[i].split(' ').map(parseFloat);
            // => ["5", "78"]
            var posY = initialY[i] + newY;
            pixelPositions.push(`${positionsXY[0]}% ${posY}%`);
        }
        pixelPositions.push(positions[positions.length-1]);   
        // => ["5% 78.25188916876574%", "31% 1.251889168765743%", "0 0"]    

        // convert pixelPositions array into string
        pixelPositions = pixelPositions.join(", ");
        // => 5% 78.25188916876574%, 31% 1.251889168765743%, 0 0

        // set new backgroundPosition
        headerCard.style.backgroundPosition = pixelPositions;  
    }
   
    

});


