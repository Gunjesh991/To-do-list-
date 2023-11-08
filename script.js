import { Todo, TodoList } from "./list.js";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const input = document.querySelector("input");
  const ul = document.getElementById("todo-list");
  const removeTasksButton = document.querySelector(".remove-task-button");

  const TODO_LIST = new TodoList();
  TODO_LIST.initializeWithCachedTodos();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (input.value.trim() === "") {
      return;
    }

    const newId = Date.now();
    const newTask = new Todo(input.value, newId);

    TODO_LIST.addTodo(newTask);

    input.value = "";
  });

  removeTasksButton.addEventListener("click", removeAllTasks);

  function removeAllTasks() {
    TODO_LIST.items = [];
    TODO_LIST.saveTodoToLocalStorage();
    TODO_LIST.renderToPage();
  }
});
