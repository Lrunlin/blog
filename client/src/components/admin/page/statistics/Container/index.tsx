import type { CSSProperties, FC, ReactNode } from "react";
import className from "classnames";

interface propsType {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}
/** 大屏的数据展示框（携带图片边框）*/
const Container: FC<propsType> = props => {
  return (
    <div
      className={className([
        "inline-block relative border-2 border-solid border-statistics-cyan-border-color py-1.25vw px-0.75vw",
        props.className,
      ])}
      style={props.style}
    >
      <div
        style={{
          backgroundImage: `url('${process.env.CDN}/image/admin/statistics/title_left_bg.png')`,
        }}
        className="w-5vw h-0.5vw absolute -top-[0.6vw] -left-[0.15vw] bg-cover bg-no-repeat"
      ></div>
      <img
        src={`${process.env.CDN}/image/admin/statistics/border_bg.jpg`}
        alt="borderBg"
        className="absolute -left-[0.15vw] -bottom-[0.15vw] w-1.25vw statistics-border-bg_left select-none"
      />
      <img
        src={`${process.env.CDN}/image/admin/statistics/border_bg.jpg`}
        alt="borderBg"
        className="absolute w-1.25vw -right-[0.15vw] -top-[0.15vw] statistics-border-bg_right select-none"
      />
      <img
        src={`${process.env.CDN}/image/admin/statistics/title_right_bg.png`}
        alt="titleRightBg"
        className="statistics-title-right-bg absolute w-1vw -right-[0.15vw] -bottom-[0.15vw] select-none"
      />
      {props.children}
    </div>
  );
};
export default Container;
