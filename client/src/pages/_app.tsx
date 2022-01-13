import type { AppProps } from "next/app";

// import "antd/dist/antd.css";
import "antd/lib/style/index.css";

import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");
import Script from "next/script";

import Store from "@/store";
import Style from "@/style/global";
import "@/utils/axios";

let scriptSrc =
  process.env.NODE_ENV == "development" ? "http://localhost:3000/" : "https://blog-api.blogweb.cn/";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Style />
        <Store>
          <Component {...pageProps} />
        </Store>
      <Script src={`${scriptSrc}statistics?v${+new Date()}`} strategy="lazyOnload" />
    </>
  );
}

export default MyApp;
