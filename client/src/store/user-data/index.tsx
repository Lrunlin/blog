import { useEffect } from "react";
import axios from "axios";
import { atom, useRecoilState } from "recoil";
import { UserAttributes } from "@type/model-attribute";

export type UserStateAttributes = Pick<
  UserAttributes,
  "id" | "name" | "auth" | "avatar_file_name" | "avatar_url"
>;

export const userDataContext = atom<UserStateAttributes | null>({
  key: "user-data",
  default: null,
});

/**
 * @params [userData, refreshUserData] {[object,function]} 用户信息，刷新用户信息
 */
function useUserData() {
  let [userData, setUserData] = useRecoilState(userDataContext);
  function refreshUserData() {
    axios.get("/user/info").then(res => {
      if (res.data.success) {
        setUserData(res.data.data);
      } else {
        setUserData(null);
      }
    });
  }

  useEffect(() => {
    if (!userData) refreshUserData();
  }, [userData]);
  return [userData, refreshUserData] as [UserStateAttributes | null, () => void];
}

export default useUserData;
