import type { AppProps } from "next/app";
import "antd/dist/antd.css";
//部分动画样式在这个css里面
// import "antd/lib/style/index.css";
import "@/plugin/axios";

import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");

import { RecoilRoot } from "recoil";

import "@/styles/globals.scss";

import dynamic from "next/dynamic";
const Sign = dynamic(import("@/components/common/Header/Sign"), { ssr: false });

function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <>
      <RecoilRoot>
        <Sign/>
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  );
}

export default MyApp;
