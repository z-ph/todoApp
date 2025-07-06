export interface Todo {
  id: number;
  content: string;
  completed: boolean;
  removed: boolean;
}
import api from "./api";
const PORT = 1234;
const IP = "10.21.22.30";
const todoApi = api.create({
  baseUrl: "http://" + IP + ":" + PORT + "/api",
  headers: {
    "Content-Type": "application/json",
  },
});
async function asyncLocalTodo(setTodo: any) {
  const todo = await todoApi.get("/todo");
  setTodo(todo.reverse());
}
async function addTodo(input: string) {
  return await todoApi.post("/todo", {
    data: {
      content: input,
    },
  });
}
async function modifyTodo(todo: Todo) {
  const id = todo.id;
  return await todoApi.patch(`/todo/${id}`, {
    data: {
      content: todo.content,
    },
  });
}
async function deleteTodo(todo: Todo) {
  const id = todo.id;
  return await todoApi.delete(`/todo/${id}`);
}
async function toggleComplete(todo: Todo) {
  return await todoApi.patch(`/todo/${todo.id}`, {
    data: {
      completed: !todo.completed,
    },
  });
}
async function clearDeleted() {
  return await todoApi.delete("/todo/clearDeleted");
}

async function getDeleted() {
  return await todoApi.get("/todo/removed");
}
async function restoreTodo(todo: Todo) {
  return await todoApi.patch(`/todo/${todo.id}`, {
    data: {
      removed: false,
    },
  });
}
const todoService = {
  asyncLocalTodo,
  addTodo,
  modifyTodo,
  deleteTodo,
  toggleComplete,
  todoApi,
  getDeleted,
  clearDeleted,
  restoreTodo,
};
export default todoService;
