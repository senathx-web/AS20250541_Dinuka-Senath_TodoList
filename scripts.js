
// Store all tasks in an array

let tasks = [];

let currentFilter = "all";


// Get HTML Elements

const taskInput = document.getElementById("taskInput");

const addTaskBtn = document.getElementById("addTaskBtn");

const taskList = document.getElementById("taskList");

const taskCounter = document.getElementById("taskCounter");

const errorMessage = document.getElementById("errorMessage");

const emptyMessage = document.getElementById("emptyMessage");

const clearCompletedBtn = document.getElementById("clearCompletedBtn");

const filterButtons = document.querySelectorAll(".filter-btn");


// Add New Task

function addTask() {

    const taskText = taskInput.value.trim();

    // Prevent empty tasks

    if (taskText === "") {

        errorMessage.textContent = "Please enter a task!";

        return;
    }

    errorMessage.textContent = "";

    // Create a new task object

    const newTask = {
        text: taskText,
        completed: false
    };

    // Add task to array

    tasks.push(newTask);

    // Clear input field

    taskInput.value = "";

    // Update the display

    displayTasks();

}


// Display Tasks

function displayTasks() {

    taskList.innerHTML = "";

    // Filter tasks according to selected filter

    let filteredTasks = tasks.filter(function(task) {

        if (currentFilter === "active") {
            return !task.completed;
        }

        if (currentFilter === "completed") {
            return task.completed;
        }

        return true;

    });


    // Display each task

    filteredTasks.forEach(function(task) {

        const taskItem = document.createElement("li");

        taskItem.classList.add("task-item");

        // Add completed class if necessary

        if (task.completed) {
            taskItem.classList.add("completed");
        }


        // Create Checkbox

        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.classList.add("task-checkbox");

        checkbox.checked = task.completed;


        // Mark task as completed or active

        checkbox.addEventListener("change", function() {

            task.completed = checkbox.checked;

            displayTasks();

        });


        // Create Task Text

        const taskText = document.createElement("span");

        taskText.classList.add("task-text");

        taskText.textContent = task.text;


        // Create Delete Button

        const deleteBtn = document.createElement("button");

        deleteBtn.textContent = "Delete";

        deleteBtn.classList.add("delete-btn");

        deleteBtn.addEventListener("click", function() {

            tasks = tasks.filter(function(item) {

                return item !== task;

            });

            displayTasks();

        });


        // Add elements to task item

        taskItem.appendChild(checkbox);

        taskItem.appendChild(taskText);

        taskItem.appendChild(deleteBtn);


        // Add task item to task list

        taskList.appendChild(taskItem);

    });


    // Update task counter

    updateTaskCounter();


    // Show empty message when no filtered tasks exist

    if (filteredTasks.length === 0) {

        emptyMessage.style.display = "block";

        if (tasks.length === 0) {
            emptyMessage.textContent = "No tasks yet. Add your first task!";
        } else {
            emptyMessage.textContent = "No tasks found in this filter.";
        }

    } else {

        emptyMessage.style.display = "none";

    }

}


// Update Incomplete Task Counter

function updateTaskCounter() {

    const remainingTasks = tasks.filter(function(task) {

        return !task.completed;

    }).length;


    if (remainingTasks === 1) {

        taskCounter.textContent = "1 task remaining";

    } else {

        taskCounter.textContent = remainingTasks + " tasks remaining";

    }

}


// Filter Tasks

filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        // Remove active styling from all buttons

        filterButtons.forEach(function(btn) {

            btn.classList.remove("active-filter");

        });


        // Highlight selected filter

        button.classList.add("active-filter");


        // Update current filter

        currentFilter = button.dataset.filter;


        // Display filtered tasks

        displayTasks();

    });

});


// Clear Completed Tasks

clearCompletedBtn.addEventListener("click", function() {

    tasks = tasks.filter(function(task) {

        return !task.completed;

    });

    displayTasks();

});


// Add Task Button Event

addTaskBtn.addEventListener("click", addTask);


// Allow Enter Key to Add Tasks

taskInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        addTask();

    }

});


// Clear Error Message When Typing

taskInput.addEventListener("input", function() {

    errorMessage.textContent = "";

});


// Initial Display

displayTasks();
