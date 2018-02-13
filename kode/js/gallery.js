document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded with JavaScript');

    // VIDEOS USED IN THE GALLERY
    // this array MUST have at least 5 items, items can repeat
    var videos = [
        {
            title: "video 0",
            url: "img/gallery/screenshot1.png",
            videoSrc: "https://www.youtube.com/watch?v=L3wKzyIN1yk"
        },
        {   
            title: "video 1",
            url: "img/gallery/screenshot2.png",
            videoSrc: "https://www.youtube.com/watch?v=R_raXzIRgsA"
        },
        {   
            title: "video 2",
            url: "img/gallery/screenshot3.png",
            videoSrc: "https://www.youtube.com/watch?v=u9Dg-g7t2l4"
        },
        {   
            title: "video 3",
            url: "img/gallery/screenshot4.png"
        },
        {   
            title: "video 4",
            url: "img/gallery/screenshot5.png"
        },
        {   
            title: "video 5",
            url: "img/gallery/screenshot6.png"
        },
        {   
            title: "video 6",
            url: "img/gallery/screenshot7.png"
        },
        {   
            title: "video 7",
            url: "img/gallery/screenshot8.png"
        }                                                
    ];

    // everything will be based on what video is central 
    // max is the last video, lenght - 1;
    var centralVideoIndex = 2; // it must be less than videos lengh -1

    // how many items will exist on a page
    var intemsNumber = 5;    

    // we need to fill positions based on videos that we have and based on how many of them we have
    // in total we only have 5 available positions
    // there will be 3 visible blocks

    var positions = new Array();
    fillPositions();
    console.log(positions);    

    // printing VIEW layer based on DATA layer
    positions.forEach(position => {
        console.log(videos[position].title);
    });  

    updateGalleryView();

///////////////////////////////////////////////////////////////////////

    var buttonForward = document.getElementById("button-forward");
    buttonForward.addEventListener("click", ()=> {
        console.log("button forward clicked");

        // update video src based on data
        document.getElementById('gallery-player').src = "https://www.youtube.com/embed/XvoW-bwIeyY?rel=0&showinfo=0&enablejsapi=1";

        hideGalleryMediaControlButtons();

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

        // disable button untill animation is finished
        // pointer-events: none;
        var navigationButtons = document.querySelectorAll('.navigation-button');
        navigationButtons.forEach(button => {
            button.style.pointerEvents = "none";
        });

        // make a move in a model layer
        moveBack();       
    });

    var buttonBack = document.getElementById("button-back");
    buttonBack.addEventListener("click", ()=> {
        console.log("button back clicked");

        // update video src based on data
        document.getElementById('gallery-player').src = "https://www.youtube.com/embed/XvoW-bwIeyY?rel=0&showinfo=0&enablejsapi=1";        

        hideGalleryMediaControlButtons();

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

        var navigationButtons = document.querySelectorAll('.navigation-button');
        navigationButtons.forEach(button => {
            button.style.pointerEvents = "none";
        });        

        // make a move in a model layer   
        moveNext();
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

            // enable navigation buttons
            var navigationButtons = document.querySelectorAll('.navigation-button');
            navigationButtons.forEach(button => {
                button.style.pointerEvents = "all";
            });            

            // now we must update VIEW based on new MODEL data
            updateGalleryView();
        }
    });       
  

    function updateGalleryView(){
        console.log("Updating VIEW.....");

        var galleryBlocks = document.querySelectorAll('.gallery-block');
        galleryBlocks.forEach((galleryBlock, index) =>  {
            //galleryBlock.innerHTML = videos[positions[index]].title; //positions
            galleryBlock.style.background = `linear-gradient(rgba(20,55,113,.5), rgba(20,55,113,.5)), url(${videos[positions[index]].url}) no-repeat center`;
            galleryBlock.style.backgroundSize = "cover";
        }); 
         
        //showGalleryMediaControlButtons();
    }

    function hideGalleryMediaControlButtons(){
        document.getElementById("gallery-loading-indicator").style.display = "none";   

        document.getElementById("gallery-play-button").style.display = "none";     

        // hide video and stop it
        document.getElementById("gallery-player").style.display = "none";
    }  

    function showGalleryMediaControlButtons(){
        document.getElementById("gallery-loading-indicator").style.display = "flex"; 
        //document.getElementById("gallery-play-button").style.display = "block";          
    }        

    ///////////////////////////////////////////////////////////////////////
    ////////////    MODEL LAYER    ////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////


    function fillPositions(){
        console.log("filling positions....");
        // we fill positions array based of index of central video
        // 3-2=1 | 3-1=2 | 3-0=3 | 3+1=4 | 3+2=5
        for (i = -2; i < intemsNumber - 2; i++){
            if((centralVideoIndex+i)<0){
                positions.push(videos.length+i+1);
            } else if((centralVideoIndex+i) > videos.length-1){
                positions.push(centralVideoIndex+i - videos.length);
            } else{
                positions.push(centralVideoIndex+i);
            }
        }
    }

    function moveNext(){
        console.log("move next");

        // when we click next we update positions in the array
        // [1,2,3,4,5] => [2,3,4,5,6]
        
        positions = positions.map(position => {
            position-=1;
            // if position is <0 videos lenght-1 we assign videos.length - 1 to position
            if(position < 0){
                position = videos.length - 1;
            }
            return position;
        });

        console.log(positions);
    }

    function moveBack(){
        console.log("move back");

        // [1,2,3,4,5] => [0,1,2,3,4]

        positions = positions.map(position => {
            position+=1;
            // if position is > videos lenght-1 we assign 0 to position
            if(position > videos.length -1){
                position = 0;
            }          
            return position;
        });

        console.log(positions);      
    }    



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