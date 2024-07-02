import NotLogin from "@/components/common/Header/User/NotLogin";
import UserData from "@/components/common/Header/User/UserData";
import useUserData from "@/store/user/user-data";

/** 顶部Header的右侧部分*/
const User = () => {
  let userData = useUserData((s) => s.data);
  return (
    <div className="flex w-80 justify-end sm:hidden">
      {userData ? (
        <>
          <UserData />
        </>
      ) : (
        <>
          <NotLogin />
        </>
      )}
    </div>
  );
};
export default User;
