const fs = require('fs');
const filePath = './tasks.json';

const command = process.argv[2];
const task = process.argv[3];

const loadTasks = () => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    // console.log(JSON.parse(dataBuffer));
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const saveTask = (tasks) => {
  const dataJSON = JSON.stringify(tasks);
  fs.writeFileSync(filePath, dataJSON);
};
const addTask = (task) => {
  const tasks = loadTasks();
  tasks.push({ task });
  saveTask(tasks);
  console.log(`Task added: ${task}`);
};

if (command === 'add') {
  addTask(task);
} else if (command === 'list') {
  const tasks = loadTasks();
  console.log('Tasks:');
  tasks.forEach((task, index) => {
    console.log(`${index + 1}. ${task.task}`);
  });
} else if (command === 'remove') {
  const tasks = loadTasks();
  const index = parseInt(task) - 1;
  if (index >= 0 && index < tasks.length) {
    const removedTask = tasks.splice(index, 1);
    saveTask(tasks);
    console.log(`Task removed: ${removedTask}`);
  } else {
    console.log('Invalid task number.');
  }
} else {
  console.log(
    'Invalid command. Use "add" to add a task or "list" to list tasks.',
  );
}
