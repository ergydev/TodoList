// Selectors 
let todoInput = document.getElementById('formValue');
let todoButton = document.getElementById('submitButton');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event Listeners

document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// Functions

function addTodo(event){
    event.preventDefault();
    
    // Todo DIV 
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    
    // ADD TODO TO LOCALSTORAGE 

    saveLocalTodos(todoInput.value);

    // CHECK MARK BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    
    // TRASH MARK BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fa-solid fa-minus"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    // APPEND TO LIST

    todoList.appendChild(todoDiv);

    // CLEAR Todo INPUT VALUE 

    todoInput.value = "";

};


function deleteCheck(e){
    e.preventDefault();

    const item = e.target;

    // DELETE 
    if (item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        // Create an animation before removing the element
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
        
    }

    // CHECK MARK 
    if (item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes; // Take all the todos
    todos.forEach(function(todo){
        const mStyle = todo.style
        if(mStyle != undefined && mStyle != null){
            switch(e.target.value){
                case "all":
                    todo.style.display= "flex";
                    break;
                case "completed":
                    if(todo.classList.contains("completed")){
                        todo.style.display = 'flex';
                    }else{
                        todo.style.display= 'none';
                    }
                    break;
                case "uncompleted":
                    if(todo.classList.contains('completed')){
                        mStyle.display="none";
                    }
                    else{
                        mStyle.display='flex';
                    }
                    break;
            }
            
        }
    });
}


function saveLocalTodos(todo){
    // CHECK IF I HAVE SOMETHING STORE HERE

    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo);
    localStorage.setItem('todos' , JSON.stringify(todos));
}

function getTodos (){
        // CHECK IF I HAVE SOMETHING STORE HERE

        let todos;
        if(localStorage.getItem('todos') === null){
            todos = [];
        }else{
            todos = JSON.parse(localStorage.getItem('todos'))
        }
        todos.forEach(function(todo){
                // Todo DIV 
                const todoDiv = document.createElement('div');
                todoDiv.classList.add('todo');

                // Create LI
                const newTodo = document.createElement('li');
                newTodo.innerText = todo;
                newTodo.classList.add('todo-item');
                todoDiv.appendChild(newTodo);
                

                // CHECK MARK BUTTON
                const completedButton = document.createElement('button');
                completedButton.innerHTML = '<i class="fa-solid fa-check"></i>';
                completedButton.classList.add('complete-btn');
                todoDiv.appendChild(completedButton);
                
                // TRASH MARK BUTTON
                const trashButton = document.createElement('button');
                trashButton.innerHTML = '<i class="fa-solid fa-minus"></i>';
                trashButton.classList.add('trash-btn');
                todoDiv.appendChild(trashButton);

                // APPEND TO LIST

                todoList.appendChild(todoDiv);


                
        })
}

function removeLocalTodos(todo){
        // CHECK IF I HAVE SOMETHING STORE HERE

        let todos;
        if(localStorage.getItem('todos') === null){
            todos = [];
        }else{
            todos = JSON.parse(localStorage.getItem('todos'))
        }
        const todoIndex = todo.children[0].innerText;
        todos.splice(todos.indexOf(todoIndex), 1);
        localStorage.setItem("todos", JSON.stringify(todos));
}