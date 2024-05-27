import useUserData from "@/store/user/user-data";
import UserData from "@/components/common/Header/User/UserData";
import NotLogin from "@/components/common/Header/User/NotLogin";

/** 顶部Header的右侧部分*/
const User = () => {
  let userData = useUserData(s => s.data);
  return (
    <div className="sm:hidden flex justify-end w-80">
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
