define(
    'model',
    ['jquery'],  // dependency on jquery module
    function(){

        var data = ['task 1', 'task 2', 'task 3', 'task 4'];

        return {
            data,
            addItem: function(item){
                data.push(item);
            },
            removeItem: function(item){
                data.splice(data.indexOf(item),1);
            },
            sayModel: function(){
                console.log('Model')
            }
        }
    }
);