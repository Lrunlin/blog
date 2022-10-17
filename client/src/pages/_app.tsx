import type { AppProps } from "next/app";
import "antd/dist/antd.css";
//部分动画样式在这个css里面
// import "antd/lib/style/index.css";
import "@/plugin/axios";

import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");

import { RecoilRoot, RecoilEnv } from "recoil";

import "@/styles/globals.scss";

import dynamic from "next/dynamic";
const Sign = dynamic(import("@/components/common/Header/Sign"), { ssr: false });

import { SWRConfig } from "swr";
import { NextPage } from "next";

// 服务端禁用key检查
if (typeof window == "undefined") {
  RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;
}
const APP: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <RecoilRoot>
        <SWRConfig value={{ revalidateOnFocus: false }}>
          <Sign />
          <Component {...pageProps} />
        </SWRConfig>
      </RecoilRoot>
    </>
  );
};

//! APP组件无法使用getServerSideProps
// APP.getInitialProps = async ctx => {
//   const res = await fetch("https://api.github.com/repos/vercel/next.js");
//   const json = await res.json();
//   return { stars: json.stargazers_count };
//   return {} as AppProps;
// };
export default APP;
