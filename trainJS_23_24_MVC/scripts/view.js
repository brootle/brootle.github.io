define(
    'view',
    ['jquery', 'js-template'],  // dependency on jquery module and js-template
    function(){
        
        var elements = {
            todoList: '',
            input: '',
            addBtn: ''
        }          

        var templates = {
            listTemplate: $('#list-template').html(),
            todoTemplate: $('#todo-template').html()
        }

        function addData(data){
            
            var list = tmpl(templates.listTemplate, {data: data});
            var todoForm = tmpl(templates.todoTemplate);
            
            $('main').html(todoForm);

            elements.todoList = $('.todo-list');
            elements.input = $('.controlls__value');
            elements.addBtn = $('.controlls__add');

            elements.todoList.html(list);
        }            

        function renderData(data){
            var list = tmpl(templates.listTemplate, {data: data});
            elements.todoList.html(list);
        }

        return {
            elements: elements,
            init: function(data){
                addData(data);
            },
            render: function(data){
                renderData(data);
            },
            sayView: function(){
                console.log('View')
            }
        }
    }
);