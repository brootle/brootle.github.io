define(
    'view',
    ['jquery', 'js-template'],  // dependency on jquery module and js-template
    function() {

        function View() {

            this.elements = {
                todoList: '',
                input: '',
                addBtn: ''
            }           

            this.templates = {
                listTemplate: $('#list-template').html(),
                todoTemplate: $('#todo-template').html()
            }                

            this.Init = function(data){
                
                var list = tmpl(this.templates.listTemplate, {data: data});
                var todoForm = tmpl(this.templates.todoTemplate);
                
                $('main').html(todoForm);

                this.elements.todoList = $('.todo-list');
                this.elements.input = $('.controlls__value');
                this.elements.addBtn = $('.controlls__add');

                this.elements.todoList.html(list);
            }   

            this.renderData = function (data){
                var list = tmpl(this.templates.listTemplate, {data: data});
                this.elements.todoList.html(list);
            }            


        }
        
        return View;
    }
);