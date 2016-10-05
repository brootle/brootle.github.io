define(
    'controller',
    ['jquery', 'model', 'view'],
    function() {

        function Controller(model, view) {

            view.elements.addBtn.bind("click", function() {

                // when we clicked we need to check value of the input
                var newItem = view.elements.input.val();
                
                if(newItem !==''){
                    model.addItem(newItem);
                    view.renderData(model.data);

                    view.elements.input.val('');
                }

            });
            
            view.elements.todoList.bind("click", function(event){

                var item = $(event.target).attr('data-value');

                if(item !== undefined && $(event.target).hasClass('todo-list__delete') === true){
                    model.removeItem(item);
                    view.renderData(model.data);
                }

                if(item !== undefined && $(event.target).hasClass('todo-list__edit') === true){
                    var editedItem = prompt("Edit item in the list", item);
                    if(editedItem !== null && editedItem !== ''){
                        model.editItem(item,editedItem);
                        view.renderData(model.data);
                    }
                }                
            });

        }
        
        return Controller;
    }
);











// define(
//     'controller',
//     ['jquery'],  // dependency on jquery module
//     function(){


//         function addOnClickEvent(elements){

           

//             elements.addBtn.bind("click", function() {

//                 // when we clicked we need to check value of the input

//                 var newItem = $(elements.input['selector']).val();

//                 //console.log($);
//                 //model.addItem(newItem);

//                 console.log(newItem);
//             });

//         }

//         return {
//             init: function(elements){
//                 addOnClickEvent(elements);
//             },
//             sayController: function(){
//                 console.log('Controller')
//             }
//         }
//     }
// );
