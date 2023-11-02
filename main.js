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

function addTaskList(task, taskList) {
  const taskElement = createTaskElement(task);

  taskList.appendChild(taskElement);
}
