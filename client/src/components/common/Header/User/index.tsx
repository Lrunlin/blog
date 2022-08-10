import dynamic from "next/dynamic";
const Sign = dynamic(import("./Sign"), { ssr: false });
import useUserData from "@/store/user-data";
import UserData from "@/components/common/Header/User/UserData";
import NotLogin from "@/components/common/Header/User/NotLogin";

/** 顶部Header的右侧部分*/
const User = () => {
  let [userData] = useUserData();
  return (
    <>
      <Sign />
      {userData ? (
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
