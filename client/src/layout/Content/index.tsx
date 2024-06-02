import { Suspense, type FC, type ReactNode } from "react";
import Sidebar from "@/layout/Sidebar";
import classNames from "classnames";
import HightLight from "./HightLight";
import ImagePreview from "@/components/page/article/ImagePreview";

export interface propsType {
  children: ReactNode;
  ToolBar?: ReactNode;
  Aside?: ReactNode;
  language?: string[] | null;
  className?: string;
}

/** 内容页面(文章、问答)布局*/
const Layout: FC<propsType> = props => {
  return (
    <>
      {props.language && <HightLight language={props.language} />}
      <Sidebar className={classNames(["pb-16", props.className])} Aside={props.Aside}>
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
