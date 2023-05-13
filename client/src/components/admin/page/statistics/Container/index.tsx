import type { CSSProperties, FC, ReactNode } from "react";
import className from "classnames";
import Style from "./Style";

interface propsType {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}
/** 大屏的数据展示框（携带图片边框）*/
const Container: FC<propsType> = props => {
  return (
    <div className={className(["statistics-container", props.className])} style={props.style}>
      <style jsx>{Style}</style>
      <div
        style={{ backgroundImage: `url('/image/admin/statistics/title_left_bg.png')` }}
        className="statistics-title-bg"
      ></div>
      <img
        src="/image/admin/statistics/border_bg.jpg"
        alt="borderBg"
        className="statistics-border-bg statistics-border-bg_left"
      />
      <img
        src="/image/admin/statistics/border_bg.jpg"
        alt="borderBg"
        className="statistics-border-bg statistics-border-bg_right"
      />
      <img
        src="/image/admin/statistics/title_right_bg.png"
        alt="titleRightBg"
        className="statistics-title-right-bg"
      />
      {props.children}
    </div>
  );
};
export default Container;
