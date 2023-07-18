import type { ReactNode, FC } from "react";
import Container from "../../Container";

interface propsType {
  title: string | ReactNode;
  data: string | ReactNode;
}
/** 大屏页面顶部的数据展示框*/
const HeaderItem: FC<propsType> = ({ title, data }) => {
  return (
    <Container>
      <div className="header-item w-14vw h-5vw">
        <div className="text-lg font-bold text-white">{title}</div>
        <div className="text-statistics-cyan-color text-lg font-bold">{data}</div>
      </div>
    </Container>
  );
};
export default HeaderItem;
