import dynamic from "next/dynamic";
const Sign = dynamic(import("./Sign"), { ssr: false });
import { state } from "@/store/user-data";
import UserData from "@/components/common/Header/User/UserData";
import NotLogin from "@/components/common/Header/User/NotLogin";
/** 顶部Header的右侧部分*/
const User = () => {
  return (
    <>
      <Sign />
      {state() ? (
        <>
          <UserData />
        </>
      ) : (
        <>
          <NotLogin />
        </>
      )}
    </>
  );
};
export default User;
