document.addEventListener('DOMContentLoaded', function () {
    const taskList = document.getElementById('task-list');
    const addTaskBtn = document.getElementById('add-task-btn');
    const searchTaskBtn = document.getElementById('search-task-btn');
    const searchTaskDiv = document.getElementById('search-task');
    const taskForm = document.getElementById('task-form');
    const submitTaskBtn = document.getElementById('submit-task-btn');
    const noTasksMessage = document.getElementById('no-tasks-message');

    let editMode = false;
    let editTaskId = null;

    // Function to toggle display of task form
    window.toggleTaskForm = function () {
        if (taskForm.style.display === 'none') {
            taskForm.style.display = 'block';
            addTaskBtn.textContent = 'Close Form';
            taskList.style.display = 'none'; // Hide task list when adding task
            searchTaskDiv.style.display = 'none'; // Hide search task div when adding task
        } else {
            taskForm.style.display = 'none';
            addTaskBtn.textContent = 'Add Task';
            taskList.style.display = 'block'; // Show task list when closing task form
        }
    }
// Handle task (Add or Update)
window.handleTask = function () {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('due_date').value;

    if (title.trim() !== '' && description.trim() !== '' && dueDate.trim() !== '') {
        if (editMode) {
            updateTask(); // Call updateTask function if in edit mode
        } else {
            addTask(); // Call addTask function if not in edit mode
        }
    } else {
        alert('Please fill in all fields before submitting.');
    }
}

    // Function to toggle display of search task form
    window.searchTask = function () {
        if (searchTaskDiv.style.display === 'none') {
            searchTaskDiv.style.display = 'block';
            taskList.style.display = 'none'; // Hide task list when searching task
            taskForm.style.display = 'none'; // Hide add task form when searching task
        } else {
            searchTaskDiv.style.display = 'none';
            taskList.style.display = 'block'; // Show task list when closing search task form
        }
    }



   // Fetch and display tasks
function fetchTasks() {
    fetch('../back-end/api.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                noTasksMessage.style.display = 'block';
                noTasksMessage.style.fontWeight = 'bold';
                noTasksMessage.style.textAlign = 'center';            
                taskList.innerHTML = 'No tasks at this moment.';
            } else {
                noTasksMessage.style.display = 'none';
                taskList.innerHTML = '';
                data.forEach(task => {
                    const taskItem = document.createElement('li');
                    taskItem.classList.add('task-item');
                    taskItem.innerHTML = `
                        <div>
                            <h3>ID: ${task.id}</h3>
                            <h3>${task.title}</h3>
                            <p>${task.description}</p>
                            <small>Due: ${task.due_date}</small>
                        </div>
                        <button onclick="editTask(${task.id})">Edit</button>
                        <button onclick="deleteTask(${task.id})">Delete</button>
                    `;
                    taskList.appendChild(taskItem);
                });
            }
        })
        .catch(error => console.error('Error fetching tasks:', error));
}

   // Search task by ID
window.searchTaskById = function () {
    const taskId = document.getElementById('search-id').value;
    fetch(`../back-end/api.php?id=${taskId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(task => {
            const searchResult = document.getElementById('search-result');
            if (task && task.id) {
                searchResult.style.display = 'block';
                searchResult.textContent = `Task found - Title: ${task.title}, Description: ${task.description}, Due Date: ${task.due_date}`;
            } else {
                searchResult.style.display = 'block';
                searchResult.textContent = 'Task not found with this ID.';
            }
        })
        .catch(error => {
            const searchResult = document.getElementById('search-result');
            searchResult.style.display = 'block';
            searchResult.textContent = 'An error occurred while searching for the task.';
            console.error('Error fetching task:', error);
        });
}


    // Add task
    window.addTask = function () {
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const dueDate = document.getElementById('due_date').value;

        if (title.trim() !== '' && description.trim() !== '' && dueDate.trim() !== '') {
            fetch('../back-end/api.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, description, due_date: dueDate })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(() => {
                    fetchTasks();
                    clearForm();
                    toggleTaskForm();
                    console.log('Task added successfully!');
                })
                .catch(error => console.error('Error adding task:', error));
        } else {
            alert('Please fill in all fields before submitting.');
        }
    }

// Edit task
window.editTask = function (id) {
    fetch(`../back-end/api.php?id=${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(task => {
            document.getElementById('title').value = task.title;
            document.getElementById('description').value = task.description;
            document.getElementById('due_date').value = task.due_date;

            editMode = true;
            editTaskId = id; // Make sure editTaskId is set to the correct ID
            addTaskBtn.textContent = 'Update Task';
            taskForm.style.display = 'block'; // Display task form when editing
            taskList.style.display = 'none'; // Hide task list when editing
            searchTaskDiv.style.display = 'none'; // Hide search task div when editing
        })
        .catch(error => console.error('Error fetching task:', error));
}


// Update task
window.updateTask = function () {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('due_date').value;

    if (title.trim() !== '' && description.trim() !== '' && dueDate.trim() !== '') {
        fetch(`../back-end/api.php?id=${editTaskId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: editTaskId, title, description, due_date: dueDate }) // Include the ID
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(() => {
                fetchTasks(); // Fetch tasks to refresh the list after update
                clearForm();
                toggleTaskForm();
                console.log('Task updated successfully!');
                // Display message that task was edited
                const messageElement = document.createElement('div');
                messageElement.textContent = 'Task edited';
                messageElement.classList.add('edited-message');
                document.body.appendChild(messageElement);
                setTimeout(() => {
                    messageElement.remove(); // Remove the message after some time
                }, 3000);
            })
            .catch(error => console.error('Error updating task:', error));
    } else {
        alert('Please fill in all fields before submitting.');
    }
}


    // Delete task
    window.deleteTask = function (id) {
        fetch(`../back-end/api.php?id=${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(() => {
                fetchTasks();
            })
            .catch(error => console.error('Error deleting task:', error));
    }


    // Clear form after adding or updating task
    function clearForm() {
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
        document.getElementById('due_date').value = '';

        editMode = false;
        editTaskId = null;
    }

    fetchTasks();
});
