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

        var model = new Model;
        model.Init(images);       // initialize model with a list of the images

        var view = new View;
        view.Init('slider1', model);  // initialize view with images that we get from model

        // let's say we want 2nd image to be in the center, so we send 2 to render function
        view.render('slider1', model.images, model.centralImageIndex);

        var controller = new Controller('slider1', model, view);

        ////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////

        var images2 = [
            'images/4.jpg',
            'images/5.jpg',
            'images/6.jpg'
            ];   

        var model2 = new Model;
        model2.Init(images2);       // initialize model with a list of the images       

        var view2 = new View;
        view2.Init('slider2', model2);  // initialize view with images that we get from model
        view2.render('slider2', model2.images, model2.centralImageIndex);  

        var controller2 = new Controller('slider2', model2, view2);     

        ////////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////////

        var images3 = [
            'images/2.jpg',
            'images/3.jpg'
            ];   

        var model3 = new Model;
        model3.Init(images3);       // initialize model with a list of the images       

        var view3 = new View;
        view3.Init('slider3', model3);  // initialize view with images that we get from model
        view3.render('slider3', model3.images, model3.centralImageIndex);  

        var controller3 = new Controller('slider3', model3, view3);                       
    }
);
