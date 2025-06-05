let todos = [];
let nextId = 1;

const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const emptyState = document.getElementById("emptyState");
const totalCount = document.getElementById("totalCount");
const completedCount = document.getElementById("completedCount");
const remainingCount = document.getElementById("remainingCount");
const clearCompleted = document.getElementById("clearCompleted");

function addTodo() {
  const text = todoInput.value.trim();
  if (text === "") return;

  const todo = {
    id: nextId++,
    text: text,
    completed: false,
    createdAt: new Date(),
  };

  todos.push(todo);
  todoInput.value = "";
  renderTodos();
  updateStats();
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  renderTodos();
  updateStats();
}

function toggleTodo(id) {
  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    renderTodos();
    updateStats();
  }
}

function clearCompletedTodos() {
  todos = todos.filter((todo) => !todo.completed);
  renderTodos();
  updateStats();
}

function renderTodos() {
  todoList.innerHTML = "";

  if (todos.length === 0) {
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = `todo-item ${todo.completed ? "completed" : ""}`;

    li.innerHTML = `
                    <input type="checkbox" class="todo-checkbox" ${
                      todo.completed ? "checked" : ""
                    } 
                           onchange="toggleTodo(${todo.id})">
                    <span class="todo-text">${escapeHtml(todo.text)}</span>
                    <button class="delete-btn" onclick="deleteTodo(${
                      todo.id
                    })">Delete</button>
                `;

    todoList.appendChild(li);
  });
}

function updateStats() {
  const total = todos.length;
  const completed = todos.filter((todo) => todo.completed).length;
  const remaining = total - completed;

  totalCount.textContent = total;
  completedCount.textContent = completed;
  remainingCount.textContent = remaining;

  clearCompleted.style.display = completed > 0 ? "block" : "none";
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// Event listeners
addBtn.addEventListener("click", addTodo);
clearCompleted.addEventListener("click", clearCompletedTodos);

todoInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTodo();
  }
});

// Initialize
updateStats();
