import type { Todo } from "../utils/todoService";
const className = {
  container: "py-[1rem] relative flex justify-center",
};
import DelBtn from "./DelBtn";
import ToggleCompletedBtn from "./toggleCompletedBtn";
export interface TodoItemPropsType {
  todo: Todo;
  toggleCompleteCb: () => void;
  deleteCb: () => void;
  modifyCb: () => void;
}
export default function TodoItem(props: TodoItemPropsType) {
  const { todo, toggleCompleteCb, deleteCb, modifyCb } = props;
  return (
    <div className={className.container}>
      <div className="todo-item flex justify-around items-center  w-[500px] bg-amber-100 rounded-[30px]">
        <ToggleCompletedBtn
          onClick={toggleCompleteCb}
          state={todo.completed}
        ></ToggleCompletedBtn>
        <span
          onDoubleClick={() => {
            modifyCb();
          }}
        >
          <span className="inline-block w-[400px] bg-amber-50">
            {todo.content}
          </span>
        </span>
        <DelBtn
          onClick={() => {
            deleteCb();
          }}
        ></DelBtn>
      </div>
    </div>
  );
}
