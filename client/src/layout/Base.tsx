import type { FunctionComponent, CSSProperties } from "react";
import Header from "@/components/common/Header";
import { BackTop } from "antd";
import cl from "classnames";

interface baseTypes {
  /** 为main标签设置行内style*/
  style?: CSSProperties;
  /** 传递styled-jsx到本组件 要求 css.resolve*/
  styleJsx?: {
    className: string;
    styles: JSX.Element;
  };
}

/** 布局顶部添加Header 添加滚动到顶部按钮 自带container、main标签包裹*/
const Base: FunctionComponent<baseTypes> = props => {

  return (
    <>
      <Header />
      {props.styleJsx && props.styleJsx.styles}
      <main
        className={cl(["container", props.styleJsx&&props.styleJsx.className])}
        style={props.style}
      >
        {props.children}
      </main>
      <BackTop duration={300} />
    </>
  );
};
export default Base;
