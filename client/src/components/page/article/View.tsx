import type { FC } from "react";
import axios from "axios";
import Script from "next/script";
import style from "@/styles/article.module.scss";


interface prposType {
  content: string;
  language: string[] | null;
}
/** 文章页面主题内容显示*/
const View: FC<prposType> = props => {

  return (
    <>
      {props.language && (
        <>
          <link
            rel="stylesheet"
            href={`${axios.defaults.baseURL}/high-light/css?languages=${props.language?.join(",")}`}
          />
          <Script
            strategy="afterInteractive"
            src={`${axios.defaults.baseURL}/high-light/js?languages=${props.language?.join(",")}`}
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
      <div
        id="view"
        className={style.article}
        dangerouslySetInnerHTML={{ __html: props.content }}
      ></div>
    </>
  );
};
export default View;
