
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


    // set background in case user refresh page when it's already scrolled down a lot
    // changeNavBackground();  

    if(window.innerWidth <= 480){
        // just make sure we set background menu solid color
        menu.style.background = `linear-gradient(to right, rgba(4, 42, 146, 1) 0%, rgba(56, 167, 192, 1) 100%)`;
    } else{

        // make sure if user refresh page in the middle we make color solid
        menuCoordinates = menu.getBoundingClientRect(); 
        headerCoordinates = headerCard.getBoundingClientRect();

        if(headerCoordinates.bottom <= menuCoordinates.bottom){
            menu.style.background = `linear-gradient(to right, rgba(4, 42, 146, 1) 0%, rgba(56, 167, 192, 1) 100%)`;
        }        

    }

    window.addEventListener("resize", function(){
        if(window.innerWidth <= 480){
            // just make sure we set background menu solid color
            menu.style.background = `linear-gradient(to right, rgba(4, 42, 146, 1) 0%, rgba(56, 167, 192, 1) 100%)`;
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
        if(window.innerWidth > 480 && headerCoordinates.bottom >= menuCoordinates.bottom){
            changeNavBackground();
            moveBackgrounds();
        }

        toggleMenuShadow();

    });

    var showMenuButton = document.querySelector("#menu-button");
    var closeMenuButton = document.querySelector("#сlose-button");
    var subMenu = document.querySelector(".menu-nav-items");

    showMenuButton.addEventListener('click', function(){

        menu.style.background = `linear-gradient(to right, rgba(4, 42, 146, 1) 0%, rgba(56, 167, 192, 1) 100%)`;  
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
        // subMenu.style.display = "none";
        toggleMenuShadow();

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
        // change transparency relative to scroll
        var transformIndex = window.scrollY/menuHeight/1.5;
        menu.style.background = `linear-gradient(to right, rgba(4, 42, 146, ${transformIndex}) 0%, rgba(56, 167, 192, ${transformIndex}) 100%)`;      
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


