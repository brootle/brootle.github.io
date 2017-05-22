
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded with JavaScript');

    var headerCard = document.querySelector(".header-card");
    // var headerCard = document.querySelector(".main-card.pink");
    var headerCardHeight = headerCard.clientHeight; // 180

    console.log(document.querySelector(".header-card").clientHeight);

    // get initial Y values
    var initialY = initialYPositions();

    var navMenuFlaf = false;
  
    window.addEventListener('scroll', function(){
        console.log(window.scrollY);
   
        changeNavBackground();
        moveBackgrounds();
    });

    
    function changeNavBackground(){
        // get menu
        var menu = document.querySelector('.header-menu');  
        var menuHeight = menu.clientHeight;

        // change transparency relative to scroll
        var transformIndex = window.scrollY/menuHeight/3;
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


