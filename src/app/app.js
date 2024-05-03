const tasksList = [];

// Grab tasks from HTML
const taskInput = document.getElementById('task_name');

// Function to add tasks to task display
function addTask() {
  const task = {
    name: taskInput.value,
    checked: false
  };
  tasksList.push(task);
  saveTasksToLocalStorage();
  displayTasks();
  taskInput.value = '';
}

// Function to toggle task completion
function toggleTask(index) {
  tasksList[index].checked = !tasksList[index].checked;
  saveTasksToLocalStorage();
  displayTasks();
}

// Function to delete a task
function deleteTask(index) {
  tasksList.splice(index, 1);
  saveTasksToLocalStorage();
  displayTasks();
}

// Function to display tasks on the page
function displayTasks() {
  const taskDiv = document.getElementById('task_div');
  taskDiv.innerHTML = '';

  tasksList.forEach((task, index) => {
    const taskElement = document.createElement('div');
    taskElement.className = 'task';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.checked;
    checkbox.addEventListener('change', () => toggleTask(index));

    const taskLabel = document.createElement('label');
    taskLabel.textContent = task.name;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTask(index));

    taskElement.appendChild(checkbox);
    taskElement.appendChild(taskLabel);
    taskElement.appendChild(deleteButton);
    taskDiv.appendChild(taskElement);
  });
}

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasksList));
}

// Function to load tasks from local storage
function loadTasksFromLocalStorage() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    tasksList.push(...JSON.parse(savedTasks));
    displayTasks();
  }
}

// Load tasks from local storage on page load
loadTasksFromLocalStorage();