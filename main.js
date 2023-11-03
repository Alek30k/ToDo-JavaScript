const taskList = document.querySelector("#task-list"); //ul
const newTaskInput = document.querySelector("#new-task-input");
const addTaskButton = document.querySelector("#add-task-button");

const tasks = [];

const app = {
  tasks,
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
  app.tasks.push(newTask);

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
    taskText.classList.toggle("completed", task.isCompleted);
  });

  const taskText = document.createElement("span");
  taskText.textContent = task.title;
  taskText.classList.toggle("completed", task.isCompleted);

  const taskDeleteButton = document.createElement("button");
  taskDeleteButton.textContent = "Eliminar";
  taskDeleteButton.className = "delete-button";
  taskDeleteButton.addEventListener("click", () => {
    //Eliminar tarea de la Lista
  });

  taskElement.appendChild(taskCheckbox);
  taskElement.appendChild(taskText);
  taskElement.appendChild(taskDeleteButton);

  return taskElement;
}

addTaskButton.addEventListener("click", () => {
  addTask(app);
});

newTaskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask(app);
  }
});
