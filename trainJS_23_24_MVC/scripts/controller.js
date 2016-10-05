// define(
//     'controller',
//     ['model', 'view'],
//     function() {

//         function Controller(model, view) {

//             var self = this;
//             //code
//         }
        
//         return Controller;
//     }
// );

define(
    'controller',
    ['jquery'],  // dependency on jquery module
    function(){


        function addOnClickEvent(elements){

           

            elements.addBtn.bind("click", function() {

                // when we clicked we need to check value of the input

                var newItem = $(elements.input['selector']).val();

                //console.log($);
                //model.addItem(newItem);

                console.log(newItem);
            });

        }

        return {
            init: function(elements){
                addOnClickEvent(elements);
            },
            sayController: function(){
                console.log('Controller')
            }
        }
    }
);