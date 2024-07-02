import { type FC, type ReactNode, Suspense } from "react";
import classNames from "classnames";
import Sidebar from "@/layout/Sidebar";
import ImagePreview from "@/components/page/article/ImagePreview";
import HightLight from "./HightLight";

export interface propsType {
  children: ReactNode;
  ToolBar?: ReactNode;
  Aside?: ReactNode;
  language?: string[] | null;
  className?: string;
}

/** 内容页面(文章、问答)布局*/
const Layout: FC<propsType> = (props) => {
  return (
    <>
      {props.language && <HightLight language={props.language} />}
      <Sidebar
        className={classNames(["pb-16", props.className])}
        Aside={props.Aside}
      >
        {props.ToolBar}
        {props.children}
        <Suspense>
          <ImagePreview />
        </Suspense>
      </Sidebar>
    </>
  );
};
export default Layout;
