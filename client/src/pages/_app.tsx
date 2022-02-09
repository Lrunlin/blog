import type { AppProps } from "next/app";
import Script from "next/script";
// import "antd/dist/antd.css";
//部分动画样式在这个css里面
import "antd/lib/style/index.css";

import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");
import { memo } from "react";

import Store from "@/store";
import Style from "@/style/global";
import "@/utils/axios";

/**
 * 在页面加载完毕时创建一个js统计访问量，打印log
 */
let MemoScript = memo(() => {
  let scriptSrc =
    process.env.NEXT_PUBLIC_ENV == "development"
      ? "http://localhost:3000/"
      : "https://blog-api.blogweb.cn/";
  return <Script src={`${scriptSrc}statistics?v${+new Date()}`} strategy="lazyOnload" />;
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Style />
      <Store>
        <Component {...pageProps} />
      </Store>
      <MemoScript />
    </>
  );
}

export default MyApp;
