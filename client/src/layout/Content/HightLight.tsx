"use client";

import { type FC, useRef } from "react";
import { useServerInsertedHTML } from "next/navigation";
import Script from "next/script";

interface propsType {
  language: string[];
}
const HightLight: FC<propsType> = ({ language }) => {
  // 在挂载结束后执行高亮，防止切换CSR页面后高亮效果丢失
  if (typeof window != "undefined" && language) {
    setTimeout(() => {
      // 不组合UI渲染等待栈清空后执行
      (window as any)?.Prism?.highlightAll();
    }, 0);
  }

  const isServerInserted = useRef(false); //是否已经插入
  useServerInsertedHTML(async () => {
    if (isServerInserted.current) {
      return;
    }
    isServerInserted.current = true;

    return (
      <link
        rel="stylesheet"
        href={`${process.env.CDN}/static/high-light/css`}
      />
    );
  });

  return (
    <>
      <Script
        id="highLightScript"
        src={`${process.env.CDN}/static/high-light/js?languages=${language?.join(",")}`}
      />
      {/* <link
        rel="stylesheet"
        href={`/static/high-light/css?languages=${language.join(",")}`}
      /> */}
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
  );
};
export default HightLight;
