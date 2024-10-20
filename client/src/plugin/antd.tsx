"use client";

import { type FC, type ReactNode, useRef, useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { NextResponse } from "next/server";
import { ConfigProvider } from "antd";
import { StyleProvider, createCache } from "@ant-design/cssinjs";
import zhCN from "antd/locale/zh_CN";
import useGetRawPath from "@/common/hooks/useGetRawPath";
import { doExtraStyle } from "@/styles/genAntdCss";

interface propsType {
  children: ReactNode;
}

let antdFileNameMap: { [key: string]: string } = {};

const Antd: FC<propsType> = ({ children }) => {
  let response = new NextResponse();

  const [cache] = useState(() => createCache());
  let pathname = response.status + useGetRawPath();

  const isServerInserted = useRef(false); //是否已经插入
  // 在服务器插入HTML
  useServerInsertedHTML(async () => {
    if (isServerInserted.current) {
      return;
    }

    isServerInserted.current = true;
    let fileName = antdFileNameMap[pathname];

    // 抽离为单个CSS文件
    if (!fileName) {
      fileName = await doExtraStyle({
        cache,
      });

      antdFileNameMap[pathname] = fileName;
    }

    return <link rel="stylesheet" href={`${process.env.CDN}${fileName}`} />;
  });

  return (
    <StyleProvider cache={cache}>
      <ConfigProvider locale={zhCN}>{children}</ConfigProvider>
    </StyleProvider>
  );
};
export default Antd;
