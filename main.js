const tasksList = document.querySelector("#task-list"); //ul
const newTaskInput = document.querySelector("#new-task-input");
const addTaskButton = document.querySelector("#add-task-button");

const tasks = [];

const app = {
  tasks,
  tasksList,
  newTaskInput,
};

window.onload = () => {
  const savedTask = JSON.parse(localStorage.getItem("tasks")) || [];
  app.tasks = savedTask.map((task) => {
    return createTask(task.title, task.isCompleted);
  });
  app.tasks.forEach((task) => {
    return addTaskToList(task, app.tasksList);
  });
};

function saveTaskToLocalStorage(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createTask(title, isCompleted = false) {
  return {
    id: Date.now(),
    title,
    isCompleted,
  };
}

function addTaskToList(task, tasksList) {
  const taskElement = createTaskElement(task);

  tasksList.appendChild(taskElement);
}

function addTask(app) {
  const newTaskTitle = app.newTaskInput.value;

  const newTask = createTask(newTaskTitle);
  app.tasks.push(newTask);

  addTaskToList(newTask, app.tasksList);
  saveTaskToLocalStorage(app.tasks);
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
    saveTaskToLocalStorage(app.tasks);
  });

  const taskText = document.createElement("span");
  taskText.textContent = task.title;
  taskText.classList.toggle("completed", task.isCompleted);

  const taskDeleteButton = document.createElement("button");
  taskDeleteButton.textContent = "Eliminar";
  taskDeleteButton.className = "delete-button";
  taskDeleteButton.addEventListener("click", () => {
    taskElement.remove(); //Elimina del DOM

    const taskIndex = app.tasks.indexOf(task);

    if (taskIndex > -1) {
      app.tasks.splice(taskIndex, 1); //Elimina del Array
    }
    saveTaskToLocalStorage(app.tasks);
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
