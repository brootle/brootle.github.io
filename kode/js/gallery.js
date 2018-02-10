document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded with JavaScript');


    var buttonForward = document.getElementById("button-forward");
    buttonForward.addEventListener("click", ()=> {
        console.log("button forward clicked");

        // get gallery
        var gallery = document.querySelector('#gallery');        

        // get blocks that will be transformed ==> 1 | 2 < 3 > 4 | 5
        var centralBlock = document.querySelector('#video-position-3');
        var nextBlock = document.querySelector('#video-position-4');

        // 340 + 22.5 + 22.5 = 385
        // deltaX
        var nextBlockStyle = nextBlock.currentStyle || window.getComputedStyle(nextBlock);

        var deltaX = parseFloat(nextBlockStyle.width) + parseFloat(nextBlockStyle.marginLeft) + parseFloat(nextBlockStyle.marginRight);
        gallery.style["transform"] = `translate(${-deltaX}px, 0px)`;

        // apply central block styles to next block
        nextBlock.classList.remove('gallery__side-block');
        nextBlock.classList.add('gallery__central-block');

        // apply side block styles to center block which moves
        centralBlock.classList.remove('gallery__central-block');
        centralBlock.classList.add('gallery__side-block');        

        // IMPORTANT
        // after animation finished we must reset everything   
        // this will return transition when we click next button again  
        gallery.style.transition = "all 0.8s ease 0s";  

        var visibleGalleryBlocks = document.querySelectorAll('.visible-block');
        visibleGalleryBlocks.forEach(visibleBlock => {
            visibleBlock.style.transition = "all 0.8s ease 0s";  
        });              
    });

    var buttonBack = document.getElementById("button-back");
    buttonBack.addEventListener("click", ()=> {
        console.log("button back clicked");

        // get gallery
        var gallery = document.querySelector('#gallery');        

        // get blocks that will be transformed ==> 1 | 2 < 3 > 4 | 5
        var centralBlock = document.querySelector('#video-position-3');
        var sideBlock = document.querySelector('#video-position-2');

        // 340 + 22.5 + 22.5 = 385
        // deltaX
        var sideBlockStyle = sideBlock.currentStyle || window.getComputedStyle(sideBlock);

        var deltaX = parseFloat(sideBlockStyle.width) + parseFloat(sideBlockStyle.marginLeft) + parseFloat(sideBlockStyle.marginRight);
        gallery.style["transform"] = `translate(${deltaX}px, 0px)`;

        // apply central block styles to next block
        sideBlock.classList.remove('gallery__side-block');
        sideBlock.classList.add('gallery__central-block');

        // apply side block styles to center block which moves
        centralBlock.classList.remove('gallery__central-block');
        centralBlock.classList.add('gallery__side-block');        

        // IMPORTANT
        // after animation finished we must reset everything    
        // return trnasition that was removed after animation finished
        gallery.style.transition = "all 0.8s ease 0s";  

        var visibleGalleryBlocks = document.querySelectorAll('.visible-block');
        visibleGalleryBlocks.forEach(visibleBlock => {
            visibleBlock.style.transition = "all 0.8s ease 0s";  
        });        
    });    


    gallery.addEventListener("transitionend", (e)=>{
        // make sure we catch even only from gallery, because children also can trigger this event
        if(e.target === gallery){
            console.log("transition finished");

            // set transition time to 0
            gallery.style.transition = "all 0.0s ease 0s";  
            // return gallery back to it's position
            gallery.style.transform = "translate(0px, 0px)"; 
                   

            // set transition of elements to 0
            // set defaul styles to gallery elements ==> 1 | 2 < 3 > 4 | 5
            var visibleGalleryBlocks = document.querySelectorAll('.visible-block');
            visibleGalleryBlocks.forEach(visibleBlock => {
                visibleBlock.style.transition = "all 0.0s ease 0s";  
                visibleBlock.classList.remove('gallery__central-block');
                visibleBlock.classList.add('gallery__side-block');  
            });

            var centralBlock = document.querySelector('#video-position-3');
            centralBlock.classList.remove('gallery__side-block');  
            centralBlock.classList.add('gallery__central-block');
            // ALL TRANSITIONS will be returned to elements on next button click
        }
    });       


});




// this is working example of moving gallery

// $(function () {

//     console.log('Gallery script loaded');

//     // button-back
//     // button-forward
//     // gallery-blocks-container

//     $("#button-forward").click(function () {
//         console.log("forward button clicked");

//         console.log($('#gallery').offset().left);

//         // check current position of gallery -403.5px
//         var currentLeft = ($('#gallery').offset().left); 

//         // calculate new position, we shift based on the width of sideblock - gallery__side-block 
//         var distanceBetweenBlocks = $('#video-position-4').offset().left - $('#video-position-3').offset().left - $('#video-position-3').width();
//         var newPosition = currentLeft -  $('.gallery__side-block').width() - distanceBetweenBlocks; 

//         var animationSpeed = 600;
//         // animated move
//         $('#gallery').css({ 'right': '', 'left': `${currentLeft}px` }).animate({'left' : `${newPosition}px`}, animationSpeed);  

//         $("#video-position-3").animate({height:"220px", width:"340px"}, animationSpeed);
//         $("#video-position-4").animate({height:"290px", width:"520px"}, animationSpeed);


//     });    




// });