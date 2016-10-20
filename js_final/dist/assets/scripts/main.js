
// requirejs( [
//   //'https://unpkg.com/masonry-layout@4.1.1/dist/masonry.pkgd.js',
//   'https://libraries.cdnhttps.com/ajax/libs/masonry/3.2.2/masonry.pkgd.js',
// ], function(Masonry) {

//     var elem = document.querySelector('.grid');
//     var msnry = new Masonry( elem, {
//         // options
//         itemSelector: '.grid-item',
//         columnWidth: '.grid-sizer',
//         gutter: 10,
//         percentPosition: true
//     });

//     // Add filter to all grid-item elements

//     var items = document.getElementsByClassName("grid-item");
//     //console.log(items);
//     for(var i = 0; i < items.length; i++){
//         items[i].innerHTML = '<div><a></a></div>';
//     }

//     ////////////////////////////////////////////////////////
//     ////////////////////////////////////////////////////////

//     function sendRequest(key){
//         var request;
//         var url = "https://pixabay.com/api/?key=3531240-ec0d55581e7ceac4acc8e28c0&image_type=photo&pretty=true&per_page=7&orientation=horizontal&q=" + key;
        
//         if (window.XMLHttpRequest) {
//             request = new XMLHttpRequest();
//         } else {
//             // code for older browsers
//             request = new ActiveXObject("Microsoft.XMLHTTP");
//         }
//         request.onreadystatechange = function(data) {
//             if (this.readyState == 4 && this.status == 200) {
//                 data = JSON.parse(this.responseText);
//                 updatePhotos(data);
//             }
//         };
//         request.open("GET", url, true);
//         request.send();
//     }


//     function updatePhotos(data){
//         //console.log(data.hits[0].tags);
//         //console.log(data.hits[0].webformatURL);
//         var items = document.getElementsByClassName("grid-item");

//         for(var i = 0; i < data.hits.length; i++){
//             // add photos to masonry layout
//             items[i].style.background = "url('"+ data.hits[i].webformatURL +"') no-repeat center center"; 
//             items[i].style.backgroundSize = "cover";

//             // here we also must add text
//             items[i].childNodes[0].childNodes[0].innerHTML = data.hits[i].tags;
//             // after text added top property must be calculated and set
//             items[i].childNodes[0].childNodes[0].style.top = (items[i].offsetHeight - items[i].childNodes[0].childNodes[0].offsetHeight) / 2 + "px";
//         }

//     }
    
//     // when we load the page we upload random pics out 10 queries
//     var randomKey = ["vacation", "travel", "sea", "beach", "mountains", "new york", "japan", "ukraine","england","france"];
//     var index = Math.floor(Math.random() * 10);
//     sendRequest(randomKey[index]);

//     window.addEventListener("resize", function(){
//         // updating text position on window size changed;
//         var items = document.getElementsByClassName("grid-item");
//         for(var i = 0; i < items.length; i++){
//             items[i].childNodes[0].childNodes[0].style.top = (items[i].offsetHeight - items[i].childNodes[0].childNodes[0].offsetHeight) / 2 + "px";
//         }
//     });      

//     ////////////////////////////////////////////////////////////
//     ////////////////////////////////////////////////////////////

//     // now we should add event listener on seach button click
//     document.getElementById("search-block__button").addEventListener("click", function(){
//         var key = document.getElementById("search-block__query").value;
//         sendRequest(key);
//         document.getElementById("search-block__query").value = "";
//     });

//     // and add listener on Enter in text field
//     document.getElementById("search-block__query").addEventListener("keyup", function (e) {
//         if (e.keyCode == 13) {
//             var key = document.getElementById("search-block__query").value;
//             sendRequest(key);
//             document.getElementById("search-block__query").value = "";
//         }
//     });       
  

// });

requirejs.config({
    paths: {
        'masonry' : 'masonry.pkgd'
    },
    shim:{
        'masonry' : {
            exports: 'Masonry'
        }
    }
});


require(
    [   
        'model',
        'view',
        'controller',
        'masonry.pkgd'
    ],
    function(Model,View,Controller,Masonry){

///////////////////////////////////////////////////////////////////////////////////////////////
/// MASONRY BLOCK                                                                           ///
///////////////////////////////////////////////////////////////////////////////////////////////

    var elem = document.querySelector('.grid');
    var msnry = new Masonry( elem, {
        // options
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        gutter: 10,
        percentPosition: true
    });

    // Add filter to all grid-item elements

    var items = document.getElementsByClassName("grid-item");
    //console.log(items);
    for(var i = 0; i < items.length; i++){
        items[i].innerHTML = '<div><a></a></div>';
    }

    ////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////

    function sendRequest(key){
        var request;
        var url = "https://pixabay.com/api/?key=3531240-ec0d55581e7ceac4acc8e28c0&image_type=photo&pretty=true&per_page=7&orientation=horizontal&q=" + key;
        
        if (window.XMLHttpRequest) {
            request = new XMLHttpRequest();
        } else {
            // code for older browsers
            request = new ActiveXObject("Microsoft.XMLHTTP");
        }
        request.onreadystatechange = function(data) {
            if (this.readyState == 4 && this.status == 200) {
                data = JSON.parse(this.responseText);
                updatePhotos(data);
            }
        };
        request.open("GET", url, true);
        request.send();
    }


    function updatePhotos(data){
        //console.log(data.hits[0].tags);
        //console.log(data.hits[0].webformatURL);
        var items = document.getElementsByClassName("grid-item");

        for(var i = 0; i < data.hits.length; i++){
            // add photos to masonry layout
            items[i].style.background = "url('"+ data.hits[i].webformatURL +"') no-repeat center center"; 
            items[i].style.backgroundSize = "cover";

            // here we also must add text
            items[i].childNodes[0].childNodes[0].innerHTML = data.hits[i].tags;
            // after text added top property must be calculated and set
            items[i].childNodes[0].childNodes[0].style.top = (items[i].offsetHeight - items[i].childNodes[0].childNodes[0].offsetHeight) / 2 + "px";
        }

    }
    
    // when we load the page we upload random pics out 10 queries
    var randomKey = ["vacation", "travel", "sea", "beach", "mountains", "new york", "japan", "ukraine","england","france"];
    var index = Math.floor(Math.random() * 10);
    sendRequest(randomKey[index]);

    window.addEventListener("resize", function(){
        // updating text position on window size changed;
        var items = document.getElementsByClassName("grid-item");
        for(var i = 0; i < items.length; i++){
            items[i].childNodes[0].childNodes[0].style.top = (items[i].offsetHeight - items[i].childNodes[0].childNodes[0].offsetHeight) / 2 + "px";
        }
    });      

    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////

    // now we should add event listener on seach button click
    document.getElementById("search-block__button").addEventListener("click", function(){
        var key = document.getElementById("search-block__query").value;
        sendRequest(key);
        document.getElementById("search-block__query").value = "";
    });

    // and add listener on Enter in text field
    document.getElementById("search-block__query").addEventListener("keyup", function (e) {
        if (e.keyCode == 13) {
            var key = document.getElementById("search-block__query").value;
            sendRequest(key);
            document.getElementById("search-block__query").value = "";
        }
    });    

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////
// this is a block for SLIDER                                                                 //
////////////////////////////////////////////////////////////////////////////////////////////////

        var images = [
            'dist/assets/images/1.jpg',
            'dist/assets/images/2.jpg',
            'dist/assets/images/3.jpg',
            'dist/assets/images/4.jpg',
            'dist/assets/images/5.jpg',
            'dist/assets/images/6.jpg']; 

        var texts = [
            {
                tittle : "Warm sunny days in Egypt",
                description : "When you first come to this beautiful place you want to stay here forever and we will help you to have a lot of fun here"
            },
            {
                tittle : "Relax at the best beach",
                description : "White sand, sunny days, palm trees and a lot of fresh fruits will make your vacation fantastic"
            },
            {
                tittle : "Leave all troubles behind",
                description : "Don't worry about problems at work, forget about noisy neighbores, just enjoy life"
            },
            {
                tittle : "Invite your friends",
                description : "Why stay home? Just go to the beach and take your friends with you!"
            },
            {
                tittle : "Take great photos",
                description : "Feel the moment and take best shots that you can share with family later"
            },
            {
                tittle : "Join our training center",
                description : "It's easy to get some weight when the food is so good! So come to our gym"
            }                                                           
        ];        

        var model = new Model;
        model.Init(images, texts);       // initialize model with a list of the images

        var view = new View;
        view.Init('slider1', model);  // initialize view with images that we get from model

        var controller = new Controller('slider1', model, view);

        ////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////

        var images2 = [
            'dist/assets/images/4.jpg',
            'dist/assets/images/5.jpg',
            'dist/assets/images/6.jpg'
            ];   

        var texts2 = [
            {
                tittle : "Fun activities everyday",
                description : "Foodball, baseball, tennis, anything you want is here!"
            },
            {
                tittle : "Best disco music",
                description : "Modern music at our nightclubs will help you to relax at night"
            },
            {
                tittle : "Beutiful women",
                description : "Women at the beach are friendly and pretty, just have fun with them"
            }                                                          
        ];            

        var model2 = new Model;
        model2.Init(images2, texts2);       // initialize model with a list of the images       

        var view2 = new View;
        view2.Init('slider2', model2);  // initialize view with images that we get from model 

        var controller2 = new Controller('slider2', model2, view2);     

        ////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////

        var images3 = [
            'dist/assets/images/2.jpg'
            ];   

        var texts3 = [
            {
                tittle : "Snow and ice forever",
                description : "Don't forget to take some warm clothes with you"
            }                                                         
        ];              

        var model3 = new Model;
        model3.Init(images3, texts3);       // initialize model with a list of the images       

        var view3 = new View;
        view3.Init('slider3', model3);  // initialize view with images that we get from model 

        var controller3 = new Controller('slider3', model3, view3);             
   
    }
);
