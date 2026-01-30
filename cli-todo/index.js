//read file.promises and path

const fs = require("fs").promises;
const path = require("path");

//ensure file always loads correctly  avoids os path issue

const filePath = path.join(__dirname, "todos.json");

//read todos asynchromously

async function readTodos() {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}
async function writeTodos(todos) {
  await fs.writeFile(filePath, JSON.stringify(todos, null, 2));
}
async function addTodo(task) {
  const todos = await readTodos();
  todos.push({ task, done: false });
  await writeTodos(todos);
  console.log("added", task);
}
async function deleteTodo(index) {
  const todos = await readTodos();
  if (index < 0 || index >= todos.length) {
    console.log("invalid index");
    return;
  }
  const removed = todos.splice(index, 1);
  await writeTodos(todos);
  console.log("deleted", removed[0].task);
}
async function markDone(index) {
  const todos = await readTodos();
  if (index < 0 || index >= todos.length) {
    console.log("invalid index");
    return;
  }
  todos[index].done = true;
  await writeTodos(todos);
  console.log("marked done", todos[index].task);
}
async function editTodo(index, newTask) {
  const todos = await readTodos();
  if (index < 0 || index >= todos.length) {
    console.log("Invalid index");
    return;
  }
  todos[index].task = newTask;
  await writeTodos(todos);
  console.log("updated", newTask);
}
async function listTodos() {
  const todos = await readTodos();
  if (!todos.length) {
    console.log("no todos found");
    return;
  }
  todos.forEach((todo, i) => {
    console.log(`${i}.${todo.done ? "✔️" : "❌"} ${todo.task}`);
  });
}
const command = process.argv[2];
const args = process.argv.slice(3);
(async () => {
  switch (command) {
    case "add":
      await addTodo(args.join(" "));
      break;

    case "delete":
      await deleteTodo(parseInt(args[0]));
      break;

    case "done":
      await markDone(parseInt(args[0]));
      break;

    case "edit":
      await editTodo(parseInt(args[0]), args.slice(1).join(" "));
      break;

    case "list":
      await listTodos();
      break;

    default:
      console.log(`
Usage:
node index.js add "task"
node index.js delete <index>
node index.js done <index>
node index.js edit <index> "new task"
node index.js list
`);
  }
})();
