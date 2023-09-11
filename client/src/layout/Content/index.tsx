import type { FC, ReactNode } from "react";
import Sidebar from "@/layout/Sidebar";
import classNames from "classnames";
import dynamic from "next/dynamic";

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
  if (typeof window != "undefined" && props.language) {
    document.getElementById("highLightScript")?.remove();
    let script = document.createElement("script");
    script.id = "highLightScript";
    script.src = `${process.env.CDN}/static/high-light/js?languages=${props.language?.join(",")}`;
    document.head.append(script);
  }

  return (
    <Sidebar className={classNames(["pb-16", props.className])} Aside={props.Aside}>
      {props.ToolBar}
      {props.children}
      <ImagePreview />

      <style jsx global>
        {`
          .toolbar-item {
            margin-right: 6px;
          }
          .toolbar-item > a,
          .toolbar-item > button,
          .toolbar-item > span {
            border: 1px solid #bbb !important;
            border-radius: 3px !important;
            cursor: pointer;
          }

          .content-body img {
            cursor: zoom-in !important;
            max-width: 100%;
          }
        `}
      </style>
      {props.language && (
        <>
          <script
            src={`${process.env.CDN}/static/high-light/js?languages=${props.language?.join(",")}`}
          />
          <link
            rel="stylesheet"
            href={`${process.env.CDN}/static/high-light/css?languages=${props.language.join(",")}`}
          />
        </>
      )}
    </Sidebar>
  );
};
export default Layout;
