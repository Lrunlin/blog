import { useEffect } from "react";
import type { FC, ReactNode } from "react";
import Sidebar from "@/layout/Sidebar";
import axios from "axios";
import classNames from "classnames";
import dynamic from "next/dynamic";
import Script from 'next/script'
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
  useEffect(() => {
    if (props.language) {
      let script = document.createElement("script");
      script.src = `${axios.defaults.baseURL}/high-light/js?languages=${props.language?.join(",")}`;
      document.head.append(script);
    }
  }, [props.language]);

  return (
    <Sidebar className={classNames(["pb-16", props.className])} Aside={props.Aside}>
      {props.ToolBar}
      {props.children}
      <ImagePreview />
      <Script src={`${axios.defaults.baseURL}/high-light/js?languages=${props.language?.join(",")}`} />
      {props.language && (
        <>
          <link
            rel="stylesheet"
            href={`${axios.defaults.baseURL}/high-light/css?languages=${props.language?.join(",")}`}
          />
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
            `}
          </style>
        </>
      )}
    </Sidebar>
  );
};
export default Layout;
