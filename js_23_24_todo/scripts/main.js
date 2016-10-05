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

        var data = ['Wake up', 'Drink some coffee', 'Check email', 'Finish last JS module'];

        var model = new Model;
        model.Init(data);       // initialize model with some data

        var view = new View;
        view.Init(model.data);  // initialize view with data that we get from model

        var controller = new Controller(model, view);
    }
);
