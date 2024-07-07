document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const pendingTasksList = document.getElementById('pending-tasks');
    const completedTasksList = document.getElementById('completed-tasks');

    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const taskDescription = taskInput.value.trim();
        if (taskDescription !== '') {
            addTask(taskDescription);
            taskInput.value = '';
        }
    });

    function addTask(description) {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <span>${description}</span>
            <div class="actions">
                <button class="complete-btn">Complete</button>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
        pendingTasksList.appendChild(taskItem);

        // Add event listeners for actions
        const completeButton = taskItem.querySelector('.complete-btn');
        const editButton = taskItem.querySelector('.edit-btn');
        const deleteButton = taskItem.querySelector('.delete-btn');

        completeButton.addEventListener('click', function() {
            completeTask(taskItem);
        });

        editButton.addEventListener('click', function() {
            editTask(taskItem);
        });

        deleteButton.addEventListener('click', function() {
            deleteTask(taskItem);
        });
    }

    function completeTask(taskItem) {
        const taskDescription = taskItem.querySelector('span');
        taskItem.classList.add('completed');
        const actions = taskItem.querySelector('.actions');
        actions.innerHTML = '<button class="pending-btn">Pending</button>';

        completedTasksList.appendChild(taskItem);

        const pendingButton = taskItem.querySelector('.pending-btn');
        pendingButton.addEventListener('click', function() {
            taskItem.classList.remove('completed');
            actions.innerHTML = `
                <button class="complete-btn">Complete</button>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            `;
            pendingTasksList.appendChild(taskItem);
        });
    }

    function editTask(taskItem) {
        const taskDescription = taskItem.querySelector('span').textContent;
        const newDescription = prompt('Edit task:', taskDescription);
        if (newDescription !== null && newDescription !== '') {
            taskItem.querySelector('span').textContent = newDescription;
        }
    }

    function deleteTask(taskItem) {
        if (confirm('Are you sure you want to delete this task?')) {
            taskItem.remove();
        }
    }
});
