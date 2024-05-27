import { NextPage } from "next";
import type { AppProps, AppContext } from "next/app";
import { UserDataStoreProvider, UserInfoDataType } from "@/store/user/user-data";

import "@/styles/reset.css";
import "@/styles/globals.scss";

import { parse } from "cookie";

import axios from "@axios";

import Antd from "@/plugin/antd";
import SWR from "@/plugin/swr";
import dynamic from "next/dynamic";
const Sign = dynamic(import("@/components/common/Header/Sign"), { ssr: false });

export interface Props extends AppProps {
  userInfo: UserInfoDataType;
}
const APP: NextPage<Props> = ({ Component, pageProps, userInfo }) => {
  return (
    <>
      <Antd>
        <UserDataStoreProvider data={{ data: userInfo }}>
          <SWR>
            <Component {...pageProps} />
          </SWR>
          <Sign />
        </UserDataStoreProvider>
      </Antd>
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
