import type { FC } from "react";
import type { UserAttributes } from "@type/model-attribute";

import Header from "./Header";
import Main from "./Main";
import Aside from "./Aside";

import Head from "@/components/next/Head";

const UserData: FC<{ data: UserAttributes }> = ({ data }) => {
  return (
    <>
      <Head title={`用户中心-${data.name}`} />
      <div className="w-full mr-4">
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
