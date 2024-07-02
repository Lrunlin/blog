import type { FC, ReactNode } from "react";
import Container from "../../Container";

interface propsType {
  title: string | ReactNode;
  data: string | ReactNode;
}
/** 大屏页面顶部的数据展示框*/
const HeaderItem: FC<propsType> = ({ title, data }) => {
  return (
    <Container>
      <div className="header-item h-[5vw] w-[14vw]">
        <div className="text-lg font-bold text-white">{title}</div>
        <div className="text-lg font-bold text-statistics-cyan-color">
          {data}
        </div>
      </div>
    </Container>
  );
};
export default HeaderItem;
