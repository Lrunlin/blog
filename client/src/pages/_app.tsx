import type { AppProps } from "next/app";
// import "antd/dist/antd.css";
//部分动画样式在这个css里面
import "antd/lib/style/index.css";

import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");

import Store from "@/store";
import Style from "@/style/global";
import "@/utils/axios";



function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Style />
      <Store>
        <Component {...pageProps} />
      </Store>
    </>
  );
}

export default MyApp;
