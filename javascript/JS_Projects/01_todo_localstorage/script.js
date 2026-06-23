const todoInput = document.querySelector('#todo-input');
const addTaskButton = document.querySelector('#add-task-btn');
const todoList = document.querySelector('#todo-list');

let tasks = [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    renderTasks();
  }
}

function toggleTaskCompletion(taskId) {
  const task = tasks.find((t) => t.id === taskId);
  if (task) {
    task.completed = !task.completed;
    renderTasks();
    saveTasks();
  }
}

function renderTasks() {
  todoList.innerHTML = '';
  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.textContent = task.text;
    li.className = task.completed ? 'completed' : '';
    li.addEventListener('click', () => toggleTaskCompletion(task.id));
    // delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent toggling completion when deleting
      tasks = tasks.filter((t) => t.id !== task.id);
      renderTasks();
      saveTasks();
    });
    li.appendChild(deleteButton);
    todoList.appendChild(li);
  });
}
function addTask() {
  const taskText = todoInput.value.trim();
  if (taskText !== '') {
    const task = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    tasks.push(task);
    saveTasks();
    renderTasks();
    todoInput.value = '';
  }
}
document.addEventListener('DOMContentLoaded', () => {
  addTaskButton.addEventListener('click', addTask);
  todoInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  });
  loadTasks();
});
