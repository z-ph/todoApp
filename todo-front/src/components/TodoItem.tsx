import {  useRef, useState } from "react";
import type { Todo } from "../utils/todoService";
import type { InputRef } from "antd";
import DelBtn from "./DelBtn";
import ToggleCompletedBtn from "./ToggleCompletedBtn";
import { Input } from "antd";
import RestoreBtn from "./RestoreBtn";
export interface TodoItemPropsType {
  todo: Todo;
  toggleCompleteCb: () => void;
  deleteCb: () => void;
  modifyCb: (userInput:string) => void;
  restoreCb: () => void;      
}
export default function TodoItem(props: TodoItemPropsType) {
  const { todo, toggleCompleteCb, deleteCb, modifyCb,restoreCb } = props;
  const [editOpen,setEditOpen]=useState(false);
  const [inputValue,setInputValue]=useState(todo.content);
  const inputRef=useRef<InputRef>(null);
  return (
    <div className={"relative flex justify-center"}>
      <div className="todo-item flex justify-between items-center  w-[400px] bg-amber-100 rounded-[30px] px-[1rem] py-[8px] gap-[1px]">
        <ToggleCompletedBtn
          onClick={toggleCompleteCb}
          state={todo.completed}
        ></ToggleCompletedBtn>
        <span
        className="flex-grow-[1] flex justify-center"
          onDoubleClick={() => {
            setEditOpen(true);
            setTimeout(() => {
              inputRef.current?.focus();
            }, 0);
          }}
        >
          <span
            className="py-[4px] w-[80%] transition-all hover:scale-105 hover:shadow-md  rounded-[4px] select-none bg-[#fff]"
            style={{
              display: editOpen ? "none" : "block",
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            {todo.content}
          </span>
          <Input
            ref={inputRef}
            autoFocus
            className="transition-all hover:scale-105 hover:shadow-md "
            style={{ display: editOpen ? "block" : "none", width: "300px", }}
            value={inputValue}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                modifyCb(inputValue);
                setEditOpen(false);
              }
            }}
            onBlur={() => {
              modifyCb(inputValue);
              setEditOpen(false);
            }}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
        </span>
        {
        !todo.removed 
        ? (
          <DelBtn
            onClick={() => {
              deleteCb();
            }}
          />
        ) 
        : (
          <RestoreBtn
            onClick={() => {
              restoreCb();
            }}
          />
        )}
      </div>
    </div>
  );
}
