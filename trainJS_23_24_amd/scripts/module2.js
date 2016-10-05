define(
    'module2',
    ['jquery'],  // dependency on jquery module
    function(){

        var abc = 123;

        return {
            sayGoodbye: function(){
                console.log('Goodby')
            }
        }
    }
);