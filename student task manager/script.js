const taskInput = document.querySelector('input[type="text"]');
const taskList = document.querySelector('ul');
const addButton = document.querySelector('button');

// Load tasks from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach(task => addTaskToDOM(task));
});

// Add task function
function addTaskToDOM(taskText) {
  const li = document.createElement('li');
  li.textContent = taskText;

  // Create close button/icon
  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '✕';
  closeBtn.title = 'Delete task';
  closeBtn.addEventListener('click', () => {
    li.remove();
    saveTasks();
  });

  li.appendChild(closeBtn);
  taskList.appendChild(li);
}

// Save current tasks to localStorage
function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll('li').forEach(li => {
    // Remove the close button text
    const text = li.firstChild.textContent || li.textContent;
    tasks.push(text.trim());
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Handle add button click or Enter key
addButton.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    addTaskToDOM(taskText);
    saveTasks();
    taskInput.value = '';
    taskInput.focus();
  }
});

taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addButton.click();
  }
});
