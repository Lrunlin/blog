import { NextPage } from "next";
import type { AppProps, AppContext } from "next/app";

import "@/plugin/axios";

import "@/plugin/dayjs";

import "antd/dist/antd.min.css";
import "@/styles/globals.scss";

import { parse } from "cookie";

import axios from "axios";

import Recoil, { userInfo } from "@/plugin/recoil";
export interface Props extends AppProps {
  userInfo: userInfo;
}
import SWR from "@/plugin/swr";

const APP: NextPage<Props> = ({ Component, pageProps, userInfo }) => {
  return (
    <>
      <Recoil userInfo={userInfo}>
        <SWR>
          <Component {...pageProps} />
        </SWR>
      </Recoil>
    </>
  );
};

//! APP组件无法使用getServerSideProps
//? 因为是APP组件的原因,ctx并不是顶级的对象参数只是一个属性
APP.getInitialProps = async (params): Promise<any> => {
  let { ctx } = params as unknown as AppContext;

  let { token } = parse(ctx?.req?.headers?.cookie + "");
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
