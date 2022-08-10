import classNames from "classnames";
import Header from "@/components/common/Header";
import type { FC, ReactNode } from "react";

export interface propsType {
  children: ReactNode;
  className?: string;
  brow?: ReactNode;
  containerClassName?: string;
}

/**
 * 基本布局文件，只提供Header组件，使用main报错children
 */
const Base: FC<propsType> = props => {
  return (
    <>
      <Header />
      {props.brow}
      <div
        id="blogweb.cn"
        className={classNames(["bg-[#f4f5f5]", "pt-2", props.containerClassName])}
      >
        <main
          className={classNames([
            "max-w-[1160px]",
            "mx-auto",
            "flex",
            "justify-between",
            "min-h-screen",
            props.className,
          ])}
        >
          {props.children}
        </main>
      </div>
    </>
  );
};
export default Base;
