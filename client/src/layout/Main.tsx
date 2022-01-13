import type { FunctionComponent, CSSProperties } from "react";
import Header from "@/components/common/Header";
import { BackTop } from "antd";
import cl from "classnames";
import Aside from "@/components/common/Action";

interface baseTypes {
  /** 为main标签设置行内style*/
  style?: CSSProperties;
  /** 传递styled-jsx到本组件 要求 css.resolve*/
  styleJsx?: {
    className: string;
    styles: JSX.Element;
  };
}

/** 布局顶部添加Header Action 添加滚动到顶部按钮 自带container、main标签包裹 */
const Base: FunctionComponent<baseTypes> = props => {
  return (
    <>
      <Header />
      {props.styleJsx && props.styleJsx.styles}
      <style jsx>{`
        .container {
          display: flex;
          justify-content: space-between;
        }
      `}</style>
      <main
        className={cl(["container", props.styleJsx && props.styleJsx.className])}
        style={props.style}
      >
        <div style={{ flexGrow: 1, width: "200px", margin: " 0px 10px" }} /*铺满*/>
          {props.children}
        </div>
        <Aside />
      </main>
      <BackTop duration={300} />
    </>
  );
};
export default Base;
