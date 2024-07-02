import type { CSSProperties, FC, ReactNode } from "react";
import className from "classnames";

interface propsType {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}
/** 大屏的数据展示框（携带图片边框）*/
const Container: FC<propsType> = (props) => {
  return (
    <div
      className={className([
        "relative inline-block border-2 border-solid border-statistics-cyan-border-color px-[0.75vw] py-[1.25vw]",
        props.className,
      ])}
      style={props.style}
    >
      <div
        style={{
          backgroundImage: `url('${process.env.CDN}/image/admin/statistics/title_left_bg.png')`,
        }}
        className="w-5[vw] h-0.5[vw] absolute -left-[0.15vw] -top-[0.6vw] bg-cover bg-no-repeat"
      ></div>
      <img
        src={`${process.env.CDN}/image/admin/statistics/border_bg.jpg`}
        alt="borderBg"
        className="statistics-border-bg_left absolute -bottom-[0.15vw] -left-[0.15vw] w-[1.25vw] select-none"
      />
      <img
        src={`${process.env.CDN}/image/admin/statistics/border_bg.jpg`}
        alt="borderBg"
        className="statistics-border-bg_right absolute -right-[0.15vw] -top-[0.15vw] w-[1.25vw] select-none"
      />
      <img
        src={`${process.env.CDN}/image/admin/statistics/title_right_bg.png`}
        alt="titleRightBg"
        className="statistics-title-right-bg absolute -bottom-[0.15vw] -right-[0.15vw] w-[1vw] select-none"
      />
      {props.children}
    </div>
  );
};
export default Container;
