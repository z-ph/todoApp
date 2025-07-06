import { DeleteOutlined } from "@ant-design/icons";

export interface DelBtnPropsType {
  onClick: () => void;
}
export default function DelBtn(props: DelBtnPropsType) {
  const { onClick } = props;
  return (
    <span
      className="cursor-pointer text-[red] text-[2rem] transition-all hover:scale-110"
      onClick={onClick}
    >
      <DeleteOutlined />
    </span>
  );
}
