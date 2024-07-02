import type { FC } from "react";
import { Alert } from "antd";
import type { UserAttributes } from "@type/model-attribute";
import Head from "@/components/next/Head";
import Aside from "./Aside";
import Header from "./Header";
import Main from "./Main";

const UserData: FC<{ data: UserAttributes }> = ({ data }) => {
  return (
    <>
      <Head title={`用户中心-${data.name}`} />
      <div className="mr-4 w-full">
        {data.state == 0 && (
          <Alert
            className="mb-4"
            message="该用户已注销账号，用户基本信息已清空或重置。"
            type="error"
          />
        )}
        <Header data={data} />
        <div className="mt-2 bg-white p-7 shadow-sm">
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
