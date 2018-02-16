$(function () {
  
    // VIDEOS USED IN THE GALLERY
    // this array MUST have at least 5 items, items can repeat
    var videos = [
        {
            title: "video 1",
            url: "img/gallery/screenshot1.png",
            videoId: "XvoW-bwIeyY"
        },
        {   
            title: "video 2",
            url: "img/gallery/screenshot2.png",
            videoId: "6byRchYizJY"
        },
        {   
            title: "video 1",
            url: "img/gallery/screenshot1.png",
            videoId: "XvoW-bwIeyY"
        },
        {   
            title: "video 2",
            url: "img/gallery/screenshot2.png",
            videoId: "6byRchYizJY"
        },
        {   
            title: "video 1",
            url: "img/gallery/screenshot1.png",
            videoId: "XvoW-bwIeyY"
        },
        {   
            title: "video 2",
            url: "img/gallery/screenshot2.png",
            videoId: "6byRchYizJY"
        },
        {   
            title: "video 1",
            url: "img/gallery/screenshot1.png",
            videoId: "6byRchYizJY"
        },
        {   
            title: "video 2",
            url: "img/gallery/screenshot2.png",
            videoId: "XvoW-bwIeyY"
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
    // positions.forEach(position => {
    //     console.log(videos[position].title);
    // });  

    updateGalleryView();


///////////////////////////////////////////////////////////////////////

    $("#button-forward").click(function() {
        console.log("button forward clicked");

        hideGalleryMediaControlButtons();

        // glide gallery forward
        glideGalleryBackwards();             

        // IMPORTANT
        // after animation finished we must reset everything   
        // this will return transition when we click next button again  
        resetGallery();

        // make a move in a model layer
        moveBack();       
    });


    $("#button-back").click(function() {
        console.log("button back clicked");

        hideGalleryMediaControlButtons();

        // glide gallery forward
        glideGalleryForward();      

        // IMPORTANT
        // after animation finished we must reset everything    
        // return trnasition that was removed after animation finished
        resetGallery();

        // make a move in a model layer   
        moveNext();
    });    

    function glideGalleryBackwards(){
        // get gallery
        var gallery = $('#gallery');   

        // get blocks that will be transformed ==> 1 | 2 < 3 > 4 | 5
        var centralBlock = $('#video-position-3');
        var nextBlock = $('#video-position-4');

        // 340 + 22.5 + 22.5 = 385
        // deltaX

        var deltaX = parseFloat($(nextBlock).width()) + parseFloat($(nextBlock).css('marginLeft')) + parseFloat($(nextBlock).css('marginRight'));
        $(gallery).css('transform', `translate(${-deltaX}px, 0px)`);

        // apply central block styles to next block
        $(nextBlock).removeClass("gallery__side-block").addClass("gallery__central-block");

        // apply side block styles to center block which moves
        $(centralBlock).removeClass("gallery__central-block").addClass("gallery__side-block");   
    }

    
    function glideGalleryForward(){
        // get gallery
        var gallery = $('#gallery');          

        // get blocks that will be transformed ==> 1 | 2 < 3 > 4 | 5
        var centralBlock = $('#video-position-3');
        var previousBlock = $('#video-position-2');        

        // 340 + 22.5 + 22.5 = 385
        // deltaX

        var deltaX = parseFloat($(previousBlock).width()) + parseFloat($(previousBlock).css('marginLeft')) + parseFloat($(previousBlock).css('marginRight'));
        $(gallery).css('transform', `translate(${deltaX}px, 0px)`);
        
        // apply central block styles to next block
        $(previousBlock).removeClass("gallery__side-block").addClass("gallery__central-block");

        // apply side block styles to center block which moves
        $(centralBlock).removeClass("gallery__central-block").addClass("gallery__side-block");   
    }

    function resetGallery(){
        // IMPORTANT
        // after animation finished we must reset everything    
        // return trnasition that was removed after animation finished
        $(gallery).css('transition', "all 0.8s ease 0s");      

        var visibleGalleryBlocks = $('.visible-block');
        $.each(visibleGalleryBlocks, function(index, visibleBlock) {
            $(visibleBlock).css('transition', "all 0.8s ease 0s");
        });        

        var navigationButtons = $('.navigation-button');
        $.each(navigationButtons, function(index, button) {
            $(button).css('pointer-events', "none");
        });            
    }

    // when animation finished we put gallery into default position and update it according to model
    var gallery = document.querySelector('#gallery');
    gallery.addEventListener("transitionend", (e)=>{
        // make sure we catch even only from gallery, because children also can trigger this event
        if(e.target === gallery){
            console.log("transition finished");

            // set transition time to 0
            $(gallery).css('transition', "all 0.0s ease 0s");  
            // return gallery back to it's position
            $(gallery).css('transform', "translate(0px, 0px)");  
                   

            // set transition of elements to 0
            // set defaul styles to gallery elements ==> 1 | 2 < 3 > 4 | 5
            var visibleGalleryBlocks = $('.visible-block');
            $.each(visibleGalleryBlocks, function(index, visibleBlock) {
                $(visibleBlock).css('transition', "all 0.0s ease 0s");
                $(visibleBlock).removeClass("gallery__central-block").addClass("gallery__side-block");   
            });      

            var centralBlock = $('#video-position-3');
            $(centralBlock).removeClass("gallery__side-block").addClass("gallery__central-block"); 

            // ALL TRANSITIONS will be returned to elements on next button click

            // enable navigation buttons
            var navigationButtons = $('.navigation-button');
            $.each(navigationButtons, function(index, button) {
                $(button).css('pointer-events', "all");  
            });                      

            // now we must update VIEW based on new MODEL data
            updateGalleryView();
        }
    });       
  

    function updateGalleryView(){
        console.log("Updating VIEW.....");

        var galleryBlocks = $('.gallery-block');
        $.each(galleryBlocks, function(index, galleryBlock) {
            $(galleryBlock).css('background', `linear-gradient(rgba(20,55,113,.5), rgba(20,55,113,.5)), url(${videos[positions[index]].url}) no-repeat center`);  
            $(galleryBlock).css('background-size', "cover");  
        });   
     

        // update video src based on data, it should be associated with central element 
        // with index 2
        $("#gallery-player").attr("src",`https://www.youtube.com/embed/${videos[positions[2]].videoId}?rel=0&showinfo=0&enablejsapi=1`);  
        $("#gallery-loading-indicator").css('display', "flex");    
    }

    function hideGalleryMediaControlButtons(){
        $("#gallery-loading-indicator").css('display', "none");  
        $("#gallery-play-button").css('display', "none");  
        $("#gallery-player").css('display', "none");  
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