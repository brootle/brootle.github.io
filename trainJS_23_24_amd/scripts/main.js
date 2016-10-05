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
        'module1',
        'module2',
        'jquery'
    ],
    function(module1,module2,$){
        module1.sayHello();
        module2.sayGoodbye();
    }
);
