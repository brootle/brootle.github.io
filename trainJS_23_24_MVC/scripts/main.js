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
    function(model,view,controller,$){
        // model.sayModel();
        // view.sayView();
        // controller.sayController();

        // console.log(model.data);
        // model.addItem('task 5');
        // console.log(model.data);
        // model.removeItem('task 1');
        // console.log(model.data);

        view.init(model.data);

        //console.log(view.elements);

        model.addItem('task 5');
        
        view.render(model.data);

        model.removeItem('task 1');
        view.render(model.data);


        controller.init(view.elements);

        //view.init(model.data);
    }
);
