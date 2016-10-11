requirejs.config({
    paths: {
        'jquery' : 'https://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery'
    },
    shim:{
        'jquery' : {
            exports: 'jQuery'
        }
    }
});

require(
    [   
        'model',
        'view',
        'controller',
        'jquery'
    ],
    function(Model,View,Controller,$){

        var images = [
            'images/1.jpg',
            'images/2.jpg',
            'images/3.jpg',
            'images/4.jpg',
            'images/5.jpg',
            'images/6.jpg']; 

        var texts = [
            {
                tittle : "Warm sunny days in Egypt",
                description : "When you first come to this beautiful place you want to stay here forever and we will help you to have a lot of fun here"
            },
            {
                tittle : "Relax at the best beach",
                description : "When you first come to this beautiful place you want to stay here forever and we will help you to have a lot of fun here"
            },
            {
                tittle : "Leave all troubles behind",
                description : "When you first come to this beautiful place you want to stay here forever and we will help you to have a lot of fun here"
            },
            {
                tittle : "Invite your friends",
                description : "When you first come to this beautiful place you want to stay here forever and we will help you to have a lot of fun here"
            },
            {
                tittle : "Take great photos",
                description : "When you first come to this beautiful place you want to stay here forever and we will help you to have a lot of fun here"
            },
            {
                tittle : "Join our training center",
                description : "When you first come to this beautiful place you want to stay here forever and we will help you to have a lot of fun here"
            }                                                           
        ];

        // var images = { 
        //     src: [
        //     'images/1.jpg',
        //     'images/2.jpg',
        //     'images/3.jpg',
        //     'images/4.jpg',
        //     'images/5.jpg',
        //     'images/6.jpg']
        // };           

        var model = new Model;
        model.Init(images, texts);       // initialize model with a list of the images

        var view = new View;
        view.Init('slider1', model);  // initialize view with images that we get from model

        // let's say we want 2nd image to be in the center, so we send 2 to render function
        view.render('slider1', model.images, model.centralImageIndex, model.texts);

        var controller = new Controller('slider1', model, view);

        ////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////

        var images2 = [
            'images/4.jpg',
            'images/5.jpg',
            'images/6.jpg'
            ];   

        var texts2 = [
            {
                tittle : "Fun activities everyday",
                description : "When you first come to this beautiful place you want to stay here forever and we will help you to have a lot of fun here"
            },
            {
                tittle : "Best disco music",
                description : "When you first come to this beautiful place you want to stay here forever and we will help you to have a lot of fun here"
            },
            {
                tittle : "Beutiful women",
                description : "When you first come to this beautiful place you want to stay here forever and we will help you to have a lot of fun here"
            }                                                          
        ];            

        var model2 = new Model;
        model2.Init(images2, texts2);       // initialize model with a list of the images       

        var view2 = new View;
        view2.Init('slider2', model2);  // initialize view with images that we get from model
        view2.render('slider2', model2.images, model2.centralImageIndex, model2.texts);  

        var controller2 = new Controller('slider2', model2, view2);     

        ////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////

        var images3 = [
            'images/2.jpg'
            ];   

        var texts3 = [
            {
                tittle : "Snow and ice forever",
                description : "When you first come to this beautiful place you want to stay here forever and we will help you to have a lot of fun here"
            }                                                         
        ];              

        var model3 = new Model;
        model3.Init(images3, texts3);       // initialize model with a list of the images       

        var view3 = new View;
        view3.Init('slider3', model3);  // initialize view with images that we get from model
        view3.render('slider3', model3.images, model3.centralImageIndex);  

        var controller3 = new Controller('slider3', model3, view3);             


        ////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////

        var images4 = [
            'images/2.jpg',
            'images/3.jpg'                       
            ];   

        var texts4 = [
            {
                tittle : "Snow and ice forever",
                description : "When you first come to this beautiful place you want to stay here forever and we will help you to have a lot of fun here"
            },
            {
                tittle : "Sun, sea and palm trees",
                description : "When you first come to this beautiful place you want to stay here forever and we will help you to have a lot of fun here"
            }                                                                      
        ];              

        var model4 = new Model;
        model4.Init(images4, texts4);       // initialize model with a list of the images       

        var view4 = new View;
        view4.Init('slider4', model4);  // initialize view with images that we get from model
        view4.render('slider4', model4.images, model4.centralImageIndex);  

        var controller4 = new Controller('slider4', model4, view4);           
                    
    }
);
