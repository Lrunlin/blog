import type { FC } from "react";
import type { UserAttributes } from "@type/model-attribute";

import Header from "./Header";
import Main from "./Main";
import Aside from "./Aside";

import Head from "@/components/next/Head";
import { Alert } from "antd";

const UserData: FC<{ data: UserAttributes }> = ({ data }) => {
  return (
    <>
      <Head title={`用户中心-${data.name}`} />
      <div className="w-full mr-4">
        {data.state == 0 && (
          <Alert
            className="mb-4"
            message="该用户已注销账号，用户基本信息已清空或重置。"
            type="error"
          />
        )}
        <Header data={data} />
        <div className="p-7 bg-white mt-2 shadow-sm">
          <Main />
        </div>
      </div>
      <div className="w-60">
        <Aside data={data} />
      </div>
    </>
  );
};
export default UserData;
