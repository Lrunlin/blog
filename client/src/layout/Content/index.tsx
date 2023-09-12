import type { FC, ReactNode } from "react";
import Sidebar from "@/layout/Sidebar";
import classNames from "classnames";
import dynamic from "next/dynamic";
import HightLight from "./HightLight";

const ImagePreview = dynamic(() => import("@/components/page/article/ImagePreview"), {
  ssr: false,
});

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
        <ImagePreview />
        <style jsx global>
          {`
            .content-body img {
              cursor: zoom-in !important;
              max-width: 100%;
            }
          `}
        </style>
      </Sidebar>
    </>
  );
};
export default Layout;
