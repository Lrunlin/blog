import { NextPage } from "next";
import type { AppProps, AppContext } from "next/app";

import "@/plugin/axios";

import "@/plugin/dayjs.ts";

import "@/styles/globals.scss";

import { parse as cookieParse } from "cookie";

import axios from "axios";

import Recoil, { userInfo } from "@/plugin/recoil";
export interface Props extends AppProps {
  userInfo: userInfo;
}
import SWR from "@/plugin/swr";
import Antd from "@/plugin/antd";

const APP: NextPage<Props> = ({ Component, pageProps, userInfo }) => {
  return (
    <>
      <Recoil userInfo={userInfo}>
        <SWR>
          <Antd>
            <Component {...pageProps} />
          </Antd>
        </SWR>
      </Recoil>
    </>
  );
};

//! APP组件无法使用getServerSideProps
//? 因为是APP组件的原因,ctx并不是顶级的对象参数只是一个属性
APP.getInitialProps = async (params): Promise<any> => {
  let { ctx } = params as unknown as AppContext;
  // ? article页面不请求,防止被redis缓存
  if (ctx.pathname.startsWith("/article/") && ctx.pathname != "/article/editor/[id]") {
    return { userInfo: null };
  }
  let { token } = cookieParse(ctx?.req?.headers?.cookie + "");
  if (!token) {
    return { userInfo: null };
  }
  return await axios
    .get("/user/info", {
      headers: { authorization: token },
    })
    .then(res => {
      return { userInfo: res.data.data || null };
    })
    .catch(() => ({ userInfo: null }));
};
export default APP;
