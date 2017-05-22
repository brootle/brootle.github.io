
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded with JavaScript');

    var headerCard = document.querySelector(".header-card");
    // var headerCard = document.querySelector(".pink");
    var headerCardHeight = headerCard.clientHeight; // 180

    console.log(document.querySelector(".header-card").clientHeight);
  
    window.addEventListener('scroll', function(){

        console.log(window.scrollY);
        moveBackgrounds();

    });

    var initialY = [78,1];
    //var initialY = [47,70];

    moveBackgrounds();

    function moveBackgrounds(){

        var newY = window.scrollY * 100 / headerCardHeight;
        console.log(newY);

        var backgroundPosition = window.getComputedStyle(headerCard,null).backgroundPosition;
        console.log(backgroundPosition);
        // => 5% 78%, 31% 0%, 0% 0%   

        // split background positions into array and save all except last one
        // as the last one is gradient background
        // here we remove % and split positions into array
        var positions = backgroundPosition.replace(/\%/g, "").split(', ');
        // console.log(positions);
        // => ["5 78", "31 1", "0 0"]   

        // convert % to pixels
        var pixelPositions = [];
        for(var i = 0; i < positions.length - 1; i++){
            var positionsXY = positions[i].split(' ').map(parseFloat);
            console.log(positionsXY); // => ["5", "78"]
            var posY = initialY[i] + newY;
            pixelPositions.push(`${positionsXY[0]}% ${posY}%`);
        }
        pixelPositions.push(positions[positions.length-1]);   
        console.log(pixelPositions);
        // => ["5% 78.25188916876574%", "31% 1.251889168765743%", "0 0"]    

        // convert pixelPositions array into string
        pixelPositions = pixelPositions.join(", ");
        console.log(pixelPositions);
        // => 5% 78.25188916876574%, 31% 1.251889168765743%, 0 0

        // set new backgroundPosition
        headerCard.style.backgroundPosition = pixelPositions;  
    }
   
    

});


