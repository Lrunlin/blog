import type { ReactNode, FC } from "react";
import Container from "../../Container";
import Style from "./Style";

interface propsType {
  title: string | ReactNode;
  data: string | ReactNode;
  footer?: string | ReactNode;
}
/** 大屏页面顶部的数据展示框*/
const HeaderItem: FC<propsType> = ({ title, data, footer }) => {
  return (
    <Container>
      <style jsx>{Style}</style>
      <div className="header-item">
        <div className="title">{title}</div>
        <div className="data">{data}</div>
        <div className="footer">{footer}</div>
      </div>
    </Container>
  );
};
export default HeaderItem;
