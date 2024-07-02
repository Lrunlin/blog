"use client";

import type { FC } from "react";

interface propsType {
  language: string[];
}
const HightLight: FC<propsType> = ({ language }) => {
  if (typeof window != "undefined" && language) {
    document.getElementById("highLightScript")?.remove();
    let script = document.createElement("script");
    script.id = "highLightScript";
    script.src = `${process.env.CDN}/static/high-light/js?languages=${language?.join(",")}`;
    document.head.append(script);
  }

  return (
    <>
      {
        <>
          <script
            src={`${process.env.CDN}/static/high-light/js?languages=${language?.join(",")}`}
          />
          <link
            rel="stylesheet"
            href={`${process.env.CDN}/static/high-light/css?languages=${language.join(",")}`}
          />
        </>
      }
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
