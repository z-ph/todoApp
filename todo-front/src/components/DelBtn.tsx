import { DeleteOutlined } from "@ant-design/icons";

export interface DelBtnPropsType {
  onClick: () => void;
}
export default function DelBtn(props: DelBtnPropsType) {
  const { onClick } = props;
  return (
    <span className="cursor-pointer text-[red] text-[2rem]" onClick={onClick}>
      <DeleteOutlined />
    </span>
  );
}
