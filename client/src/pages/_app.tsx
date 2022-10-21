import { NextPage, NextPageContext } from "next";
import type { AppProps } from "next/app";

//部分动画样式在这个css里面
import "antd/lib/style/index.css";
import "@/plugin/axios";

import "@/plugin/dayjs.ts";

import { RecoilRoot, RecoilEnv } from "recoil";

import "@/styles/globals.scss";

import dynamic from "next/dynamic";
const Sign = dynamic(import("@/components/common/Header/Sign"), { ssr: false });

import { SWRConfig } from "swr";

import {parse as cookieParse} from "cookie";

// 服务端禁用key检查
if (typeof window == "undefined") {
  RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;
}

import { userDataContext } from "@/store/user-data";
import type { UserStateAttributes } from "@/store/user-data";
import axios from "axios";
interface Props extends AppProps {
  userInfo: UserStateAttributes | null;
}
const APP: NextPage<Props> = ({ Component, pageProps, userInfo }) => {
  return (
    <>
      <RecoilRoot initializeState={({ set }) => set(userDataContext, userInfo)}>
        <SWRConfig value={{ revalidateOnFocus: false }}>
          <Sign />
          <Component {...pageProps} />
        </SWRConfig>
      </RecoilRoot>
    </>
  );
};

//! APP组件无法使用getServerSideProps
//? 因为是APP组件的原因,ctx并不是顶级的对象参数只是一个属性
APP.getInitialProps = async (params: any) => {
  let { ctx }: { ctx: NextPageContext } = params;

  // ? article页面不请求,防止被redis缓存
  if (ctx.pathname.startsWith("/article/") && ctx.pathname != "/article/editor") {
    return { userInfo: null } as Props;
  }

  let { token } = cookieParse(ctx?.req?.headers?.cookie + "");
  if (!token) {
    return { userInfo: null } as Props;
  }

  let userInfo = await axios
    .get("/user/info", {
      headers: { authorization: token },
    })
    .then(res => {
      return { userInfo: res.data.data || null } as Props;
    })
    .catch(() => ({ userInfo: null } as Props));
  return userInfo;
};
export default APP;
