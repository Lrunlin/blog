import type { CSSProperties, FC, ReactNode } from "react";
import borderBg from "@/assets/statistics/border_bg.jpg";
import titleTitleBg from "@/assets/statistics/title_left_bg.png";
import titleRightBg from "@/assets/statistics/title_right_bg.png";
import className from "classnames";
import "./index.scss";

interface propsType {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}
/** 大屏的数据展示框（携带图片边框）*/
const Container: FC<propsType> = props => {
  return (
    <div className={className(["statistics-container", props.className])} style={props.style}>
      <div
        style={{ backgroundImage: `url('${titleTitleBg}')` }}
        className="statistics-title-bg"
      ></div>
      <img
        src={borderBg}
        alt="borderBg"
        className="statistics-border-bg statistics-border-bg_left"
      />
      <img
        src={borderBg}
        alt="borderBg"
        className="statistics-border-bg statistics-border-bg_right"
      />
      <img src={titleRightBg} alt="titleRightBg" className="statistics-title-right-bg" />
      {props.children}
    </div>
  );
};
export default Container;
