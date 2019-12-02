// Create todo list manually
const defaultTodos = [
    { text: 'First todo', completed: false },
    { text: 'Second todo', completed: false },
    { text: 'Finished todo', completed: true },
]

const filters = {
    searchText: ''
}

// Get todos from local storage. If none then use created todo list above
const todos = JSON.parse(localStorage.getItem('todos')) || defaultTodos

// Define all elements input + button
const elements = {
    todoList: document.getElementById('todo-list'),
    todoInput: document.getElementById('text'),
    addButton: document.getElementById('btn-add'),
    resetButton: document.getElementById('btn-reset'),
}

const getCompletedTodo = function (todos) {
    return todos.filter(function (todo) {
        return todo.completed
    })
}
// console.log(getCompletedTodo(todos))

// Function to render todo list
function renderTodoList(filters) {
    elements.todoList.innerHTML = null

    if (filters) {
        for (i = 0; i < todos.length; i++) {
            let counter = i
            if (todos[i]['text'].toLocaleLowerCase().includes(filters)) {
                // Create todo list item 
                console.log(todos.indexOf(todos[i]))
                console.log(i)
                const newTodo = document.createElement('li')
                newTodo.className = "list-group-item"
                newTodo.innerText = todos[i]['text']

                // Check if completed true
                if (todos[i]['completed']) {
                    const labelComplete = document.createElement('label')
                    labelComplete.innerText = 'Completed'

                    newTodo.append('  ||  ', labelComplete)
                } else {
                    // If completed false create new btn to mark as complete
                    const completeButton = document.createElement('button')
                    completeButton.className = "btn-sm btn-success btn"
                    completeButton.innerText = 'mark as complete'
                    completeButton.addEventListener('click', () => completeTodo(counter))
                    newTodo.append('  ||  ', completeButton)
                }

                // Create delete button to remove todo list item
                const deleteButton = document.createElement('button')
                deleteButton.className = "btn-sm btn-danger btn"
                deleteButton.innerText = 'delete'
                deleteButton.addEventListener('click', () => deleteTodo(counter))
                newTodo.append('  ||  ', deleteButton)

                elements.todoList.append(newTodo)
            }
        }
    } else {
        // Looping if there's todo list
        todos.forEach((todo, index) => {

            // Create todo list item 
            const newTodo = document.createElement('li')
            newTodo.className = "list-group-item"
            newTodo.innerText = todo.text

            // Check if completed true
            if (todo.completed) {
                const labelComplete = document.createElement('label')
                labelComplete.innerText = 'Completed'

                newTodo.append('  ||  ', labelComplete)
            } else {
                // If completed false create new btn to mark as complete
                const completeButton = document.createElement('button')
                completeButton.className = "btn-sm btn-success btn"
                completeButton.innerText = 'mark as complete'
                completeButton.addEventListener('click', () => completeTodo(index))
                newTodo.append('  ||  ', completeButton)
            }

            // Create delete button to remove todo list item
            const deleteButton = document.createElement('button')
            deleteButton.className = "btn-sm btn-danger btn"
            deleteButton.innerText = 'delete'
            deleteButton.addEventListener('click', () => deleteTodo(index))
            newTodo.append('  ||  ', deleteButton)

            elements.todoList.append(newTodo)
        })
    }


    document.getElementById('total-todo').innerHTML = todos.length
    document.getElementById('total-complete').innerHTML = getCompletedTodo(todos).length
}

// =============================== FUNGSI INSERT, UPDATE, DELETE, CEK INPUTAN ===============================

// Insert to localStorage + render todo list
function storeAndRender() {
    localStorage.setItem('todos', JSON.stringify(todos))
    renderTodoList()
}

// Check if input length > 0 && check if input only contains whitespace
function isInputFilled() {
    let input = elements.todoInput.value
    return input.trim().length > 0
}

// Insert todo function
function addTodo() {
    if (isInputFilled()) {
        const todoText = elements.todoInput.value
        todos.push({ text: todoText, completed: false })
        storeAndRender()
        elements.todoInput.value = ''
        elements.todoInput.focus()
    }
}

// Mark todo as complete function
function completeTodo(index) {
    todos[index].completed = true
    storeAndRender()
}

// Delete todo function
function deleteTodo(index) {
    todos.splice(index, 1)
    storeAndRender()
}

// Insert todo when ENTER is pressed
elements.todoInput.addEventListener('keypress', e =>
    e.keyCode === 13 ? addTodo() : {}
)

// Reset function to clear localStorage + reload current page
elements.resetButton.addEventListener('click', () => {
    localStorage.clear()
    window.location.reload()
})

// Insert new todo when btn add clicked
elements.addButton.addEventListener('click', () => addTodo())
// =============================== FUNGSI INSERT, UPDATE, DELETE, CEK INPUTAN ===============================

storeAndRender()

// Search function on input
document.querySelector('#search').addEventListener('input', function (e) {
    filters.searchText = e.target.value
    renderTodoList(filters.searchText.toLocaleLowerCase())
})
