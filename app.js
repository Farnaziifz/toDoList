// Define UI vars

const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput = document.querySelector('#task')

//Load All Event Listener 
loadEventListners()

function loadEventListners () {
    // DOM load event
    document.addEventListener('DOMContentLoaded', getTask)
    // Add task event
    form.addEventListener('submit', addTask)
    // Remove task event
    taskList.addEventListener('click', removeTask)
    // Clear all task 
    clearBtn.addEventListener('click', clearTask)
    // Filter task event
    filter.addEventListener('keyup', filterTask)
}

// Add task function

function addTask (e) {
    if(taskInput.value === '') {
        alert('Add a task')
    }
    // Create li element
    const li = document.createElement('li')
    // Add class
    li.className = 'collection-item'
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value))
    // Create new link element
    const link = document.createElement('a')
    // Add Class
    link.className = 'delete-item secondary-content'
    // Add remove icon
    link.innerHTML = '<i class="fa fa-remove"></i>'
    // Appned link to li 
    li.appendChild(link)
    // Appned li to ul
    taskList.appendChild(li)
    // Store task in LS
    StoreTaskInLocalStorage(taskInput.value)

    // Clear input
    taskInput.value = ''

e.preventDefault()
}

// Remove task function
function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove()

            // Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement)
        }

    }
}


// Clear all task function

function clearTask(){
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
    }

    clearTaskFromLocalStorage()
}

// Filter tasks
function filterTask(e) {
    const text = e.target.value.toLowerCase()
    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent
        if(item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block'
        } else {
            task.style.display = 'none'
        }
    })
}

// Store task function
function StoreTaskInLocalStorage(task) {
    let tasks
    if(localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))

}

// get task from LS function 
function getTask () {
    let tasks
    if(localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach(function(task){
        // Create li element
        const li = document.createElement('li')
        // Add class
        li.className = 'collection-item'
        // Create text node and append to li
        li.appendChild(document.createTextNode(task))
        // Create new link element
        const link = document.createElement('a')
        // Add Class
        link.className = 'delete-item secondary-content'
        // Add remove icon
        link.innerHTML = '<i class="fa fa-remove"></i>'
        // Appned link to li 
        li.appendChild(link)
        // Appned li to ul
        taskList.appendChild(li)
    })
}

// Remove task from LS function
function removeTaskFromLocalStorage(taskItem) {
    let tasks
    if(localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.forEach(function(task, index) {
        if(taskItem.textContent === task) {
            tasks.splice(index, 1)
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Clear tasks from LS function

function clearTaskFromLocalStorage() {
    localStorage.clear()
}