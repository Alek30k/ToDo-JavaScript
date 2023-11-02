const taskList = document.querySelector("#task-list");
const newTaskInput = document.querySelector("#new-task-input");
const addTaskButton = document.querySelector("#add-task-button");

const task = [];

const app = {
  task,
  taskList,
  newTaskInput,
};

function createTask(title, isCompleted = false) {
  return {
    id: Date.now(),
    title,
    isCompleted,
  };
}

function addTaskToList(task, taskList) {
  const taskElement = createTaskElement(task);

  taskList.appendChild(taskElement);
}

function addTask(app) {
  const newTaskTitle = app.newTaskInput.value;
  const newTask = createTask(newTaskTitle);
  app.task.push(newTask);

  addTaskToList(newTask, app.taskList);
  app.newTaskInput.value = "";
}

function createTaskElement(task) {
  const taskElement = document.createElement("li");
  const taskCheckbox = document.createElement("input");
  taskCheckbox.type = "checkbox";
  taskCheckbox.checked = task.isCompleted;

  taskCheckbox.addEventListener("change", () => {
    task.isCompleted = taskCheckbox.checked;
    taskText.classList.toogle("completed", task.isCompleted);
  });

  const taskText = document.createElement("span");
  taskText.textContent = task.title;
  taskText.classList.toogle("completed", task.isCompleted);
}
