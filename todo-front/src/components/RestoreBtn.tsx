import {  RetweetOutlined } from "@ant-design/icons";

export interface RestoreBtnPropsType {
  onClick: () => void;
}
export default function RestoreBtn(props: RestoreBtnPropsType) {
  const { onClick } = props;
  return (
    <span
      className="cursor-pointer text-[green] text-[2rem] transition-all hover:scale-110"
      onClick={onClick}
    >
      <RetweetOutlined />
    </span>
  );
}
