import { useEffect, useState } from "react";
import type { Todo } from "./utils/todoService";
import todoService from "./utils/todoService";
import { Button, Input, Radio } from "antd";

import TodoItem from "./components/TodoItem";

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [filteredType, setFilteredType] = useState("all");
  useEffect(() => {
    async function fetchData() {
      const todo = await todoService.todoApi.get("/todo");
      setTodos(todo);
      setFilteredTodos(todo);
    }
    fetchData();
  }, []);
  useEffect(() => {
    const notDeleted = todos.filter((todo) => !todo.removed);
    if (filteredType === "all") {
      setFilteredTodos(notDeleted);
    }
    if (filteredType === "uncompleted") {
      setFilteredTodos(notDeleted.filter((todo) => !todo.completed));
    }
    if (filteredType === "completed") {
      setFilteredTodos(notDeleted.filter((todo) => todo.completed));
    }
    if (filteredType === "deleted") {
      setFilteredTodos(todos.filter((todo) => todo.removed));
    }
  }, [todos, filteredType]);
  return (
    <div className=" min-w-[100%] flex flex-col justify-center items-center min-h-[100vh] bg-gray-300">
      <header>todoApp</header>
      <div className="app w-[100%] text-center">
        <div className="input">
          <Input
            type="text"
            placeholder="Enter to add a todo, double click to modify"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            onKeyDown={async (e) => {
              if (e.key === "Enter") {
                if (!input) return;
                await todoService.addTodo(input);
                await todoService.asyncLocalTodo(setTodos);
                setInput("");
              }
            }}
            style={{ maxWidth: "500px", width: "100%" }}
          />
        </div>
        <div className="filter-options">
          <div className="flex justify-center items-center gap-[10px]">
            <Radio.Group
              value={filteredType}
              onChange={(e) => {
                setFilteredType(e.target.value);
              }}
            >
              <Radio.Button value="all">全部</Radio.Button>
              <Radio.Button value="uncompleted">未完成</Radio.Button>
              <Radio.Button value="completed">已完成</Radio.Button>
              <Radio.Button value="deleted">回收站</Radio.Button>
            </Radio.Group>
            {filteredType === "deleted" && (
              <Button
                onClick={async () => {
                  await todoService.clearDeleted();
                  await todoService.asyncLocalTodo(setTodos);
                  setFilteredTodos([]);
                }}
              >
                清空回收站
              </Button>
            )}
          </div>
        </div>

        <div className="todo-list flex flex-col gap-[10px] ">
          {filteredTodos.map((todo: Todo) => (
            <div className="todo-item  " key={todo.id}>
              <TodoItem
                todo={todo}
                toggleCompleteCb={async () => {
                  await todoService.toggleComplete(todo);
                  await todoService.asyncLocalTodo(setTodos);
                }}
                deleteCb={async () => {
                  await todoService.deleteTodo(todo);
                  await todoService.asyncLocalTodo(setTodos);
                }}
                modifyCb={async () => {
                  const content = prompt("请输入新内容");
                  if (content) {
                    todo.content = content;
                    await todoService.modifyTodo(todo);
                    await todoService.asyncLocalTodo(setTodos);
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
