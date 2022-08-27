import type { FC } from "react";
import type { UserAttributes } from "@type/model-attribute";

import Header from "./Header";
import Main from "./Main";
import Aside from "./Aside";

const UserData: FC<{ data: UserAttributes }> = ({ data }) => {
  return (
    <>
      <div className="w-full mr-4">
        <Header data={data} />
        <div className="p-7 bg-white mt-2">
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
