define(
    'view',
    ['jquery', 'js-template'],  // dependency on jquery module and js-template
    function(){

        function init(data){

            var list = tmpl($('#list-template').html(), {data: data});

            var todoForm = tmpl($('#todo-template').html());
            $('main').html(todoForm);

            var elements = {
                todoList: $('.todo-list'),
                input: $('.controlls__value'),
                addBtn: $('.controlls__add')
            }            
            

            elements.todoList.html(list);         
        }                

        return {
            RenderList: function(data){
                init(data);
            },
            sayView: function(){
                console.log('View')
            }
        }
    }
);