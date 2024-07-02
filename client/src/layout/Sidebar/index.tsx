import type { FC, ReactNode } from "react";
import classNames from "classnames";
import Base from "@/layout/Base";

/** Sidebar布局所需类型*/
export interface propsType {
  children: ReactNode;
  Aside: ReactNode;
  className?: string;
}

/** 顶部Header，侧边携带Aside*/
const Sidebar: FC<propsType> = (props) => {
  return (
    <Base className={classNames(["pb-16", props.className])}>
      {/* 1160-16(margin right)-240(aside width) */}
      <div className="mr-4 w-full max-w-[904px] sm:mr-0">{props.children}</div>
      <aside className="w-60 sm:hidden">
        <div className="w-60">{/* 占位用的防止左侧内容偏移 */}</div>
        {props.Aside}
      </aside>
    </Base>
  );
};
export default Sidebar;
