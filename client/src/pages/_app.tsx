import type { AppProps } from "next/app";
import "antd/dist/antd.css";
//部分动画样式在这个css里面
// import "antd/lib/style/index.css";

import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");

import { RecoilRoot } from "recoil";

import "@/styles/globals.css";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  );
}

export default MyApp;
