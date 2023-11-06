const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const ul = document.querySelector("#todo-list");

class Todo {
  constructor(task) {
    this.id = Date.now();
    this.task = task;
    this.completed = false;
  }
}

class TodoList {
  constructor() {
    this.items = [];
  }

  initializeWithCachedTodos(todos) {
    this.items = todos;
  }

  addTodo(todo) {
    this.items.push(todo);
  }

  toggleTodoStatus(todoId) {
    const newTodoList = this.items.map((item) => {
      if (item.id === todoId) {
        return {
          ...item,
          completed: !item.completed,
        };
      }
      return item;
    });

    this.items = newTodoList;
  }

  renderToPage() {
    ul.innerHTML = "";

    this.items.forEach((item) => {
      const li = document.createElement("li");

      li.innerText = item.task;

      const button = document.createElement("button");
      button.innerText = item.completed ? "COMPLETED" : "TO-DO";
      button.id = item.id;
      button.classList.add("toggle-btn");
      if (item.completed) {
        button.classList.add("complete");
      }
      button.addEventListener("click", handleStatusChange);

      li.appendChild(button);
      ul.appendChild(li);
    });
  }
}

const TODO_LIST = new TodoList();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (input.value === "") return;

  const newTask = new Todo(input.value);

  TODO_LIST.addTodo(newTask);
  TODO_LIST.renderToPage();

  input.value = "";
});

function handleStatusChange(event) {
  TODO_LIST.toggleTodoStatus(+event.target.id);
  TODO_LIST.renderToPage();
}
