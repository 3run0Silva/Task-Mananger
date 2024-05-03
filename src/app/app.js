import { initializeServices } from "../JS/providers/database/config"


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
  saveTasksToFirestore();
  displayTasks();
  taskInput.value = '';
}

// Function to verify "Enter" was pressed
function checkEnter(event) {
  if (event.key === "Enter") {
    addTask();
  }
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
// function loadTasksFromLocalStorage() {
//   const savedTasks = localStorage.getItem('tasks');
//   if (savedTasks) {
//     tasksList.push(...JSON.parse(savedTasks));
//     displayTasks();
//   }
// }

const saveTasksToFirestore = async (tasksList) => {

  const {db} = initializeServices()
  const taskCollection = collection(db, 'tasks')

  try {
    for (let task of tasksList) {
      await addDoc(taskCollection, { task })
    }
    console.log('Task saved to Firestore');
  } catch (error) {
    console.log('Error adding document to Firebase');
  }

}

// Function to load tasks from local storage
const loadTasksFromFirestore = async () => {
  const {db} = initializeServices()
  const taskCollection = collection(db, 'tasks')

  try {
    const querySnapshot = await getDocs(taskCollection)
    tasksList = querySnapshot.docs.map(doc => doc.data().task)
    displayTasks(tasksList)
  } catch (error) {
    console.error("Error getting documents: ", error)
  }
}

// Load tasks from local storage on page load
// loadTasksFromLocalStorage();

// Load tasks from firebase db on page load
loadTasksFromFirestore()
