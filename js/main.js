$(document).ready(function () {
    // refs
    var newTodoInput = $('#new-todo-input');
    var newTodoBtn = $('#new-todo-btn');
    var todosList = $('.todos');
    // API
    var apiUrl = 'http://157.230.17.132:3002/todos';

    // init handlebars
    var source = $('#todo-template').html();
    var template = Handlebars.compile(source);

    // actions
    // get all todos
    printAllTodos(apiUrl, template, todosList);

    // create a new todo item

    newTodoBtn.click(function () {
        createTodo(apiUrl, newTodoInput, template, todosList);
    });

    // remove todo item
    $(document).on('click', '.remove', function () {
        deleteTodo($(this), apiUrl, template, todosList)
    });


});//<= end doc ready

// function

// create a new todo (Crud)
function createTodo(apiUrl, input, template, todosList){
    var todoValue = input.val().trim();

    $.ajax({
        url: apiUrl,
        method: 'POST',
        data: {
            text: todoValue
        },
        success: function () {
            printAllTodos(apiUrl, template, todosList);
        },
        error: function () {
            console.log('errore creazione nuovo todo');
        }
    });  
}

// get all todos from api (cRud )
function printAllTodos(apiUrl, template, todosList) {
    // clean
    todosList.html('');
    $.ajax({
        url: apiUrl,
        method: 'GET',
        success: function (data) {
            var todos = data;

            for (var i = 0; i < todos.length; i++) {
                var todo = todos[i];

                var context = {
                    todo: todo.text,
                    id: todo.id
                }
                var html = template(context);
                todosList.append(html);
            }

        },
        error: function () {
            console.log('errore richiesta todos');

        }

    });

}

// delete a todo todo by its ID (cruD)
function deleteTodo(self, apiUrl, template, todosList){
    var todoId = self.data('id');
//console.log(todoId);

$.ajax({
    url: apiUrl + '/' + todoId,
    method: 'DELETE',
    success: function(){
        printAllTodos(apiUrl, template, todosList);
    },
    error: function() {
     console.log('errore cancellazione todo');
        
    }
});
}