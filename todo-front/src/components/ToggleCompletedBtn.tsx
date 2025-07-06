// import type { Todo } from "../utils/todoService";

import { CheckOutlined } from "@ant-design/icons";

export interface finishBtnPropsType {
  onClick: () => void;
  state: boolean;
}
const finishClass = " text-[green]";
const unFinishClass = " text-[red]";
export default function ToggleCompletedBtn(props: finishBtnPropsType) {
  const { onClick, state } = props;

  return (
    <span
      className={`inline-block w-[30px] h-[30px] rounded-full border-[1px] text-[1.2rem] border-[var(--black)] ${
        state ? finishClass : unFinishClass
      }`}
      onClick={onClick}
    >
      {state ? <CheckOutlined /> : ""}
    </span>
  );
}
