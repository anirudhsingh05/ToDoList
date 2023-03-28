const input = document.querySelector('input[type="text"]');
const addBtn = document.querySelector('.add-task button');
const clearBtn = document.querySelector('.clear-tasks button');
const taskList = document.querySelector('.tasks');
const noTasksMsg = document.querySelector('.no-tasks-message');
const select = document.querySelector('select');

let tasks = [];
let index = -1;

function addTask() {
  const task = input.value.trim();
  if (task === '') return;
  const priority = select.value;
  tasks.push({ task, priority });
  renderTasks();
  input.value = '';
  select.value = 'low';
  index = tasks.length - 1;
}

function renderTasks() {
  taskList.innerHTML = '';
  if (tasks.length === 0) {
    noTasksMsg.style.display = 'block';
  } else {
    noTasksMsg.style.display = 'none';
    tasks.forEach((task, i) => {
      const li = document.createElement('li');
      li.className = 'task';
      if (i === index) {
        li.classList.add('selected');
      }
      li.innerHTML = `
        <span class="${task.priority}-priority">${task.task}</span>
        <button class="delete-task">Delete</button>
      `;
      li.querySelector('span').addEventListener('click', () => {
        index = i;
        renderTasks();
      });
      li.querySelector('.delete-task').addEventListener('click', () => {
        tasks.splice(i, 1);
        if (index === i) {
          index = -1;
        } else if (index > i) {
          index--;
        }
        renderTasks();
      });
      taskList.appendChild(li);
    });
  }
}

function clearTasks() {
  tasks = [];
  index = -1;
  renderTasks();
}

function undo() {
  index--;
  if (index < 0) {
    index = -1;
  }
  renderTasks();
}

function redo() {
  index++;
  if (index >= tasks.length) {
    index = tasks.length - 1;
  }
  renderTasks();
}

addBtn.addEventListener('click', addTask);
input.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    addTask();
  }
});
clearBtn.addEventListener('click', clearTasks);
document.addEventListener('keydown', e => {
  if (e.ctrlKey && e.key === 'z') {
    undo();
  } else if (e.ctrlKey && e.key === 'y') {
    redo();
  }
});

renderTasks();
