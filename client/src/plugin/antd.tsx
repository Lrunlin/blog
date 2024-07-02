"use client";

import { type FC, type ReactNode, useState } from "react";
import { useServerInsertedHTML } from "next/navigation";
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
  const [cache] = useState(() => createCache());
  let pathname = useGetRawPath();

  // 在服务器插入HTML
  useServerInsertedHTML(async () => {
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
