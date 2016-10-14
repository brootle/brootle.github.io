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
            'src/images/1.jpg',
            'src/images/2.jpg',
            'src/images/3.jpg',
            'src/images/4.jpg',
            'src/images/5.jpg',
            'src/images/6.jpg']; 

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
            'src/images/4.jpg',
            'src/images/5.jpg',
            'src/images/6.jpg'
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
            'src/images/2.jpg'
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
