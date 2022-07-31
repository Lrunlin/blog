import { atom, useRecoilValue } from "recoil";

interface userAuth {
  id: number;
  auth: number;
}
export const userAuthContext = atom<userAuth | null>({
  key: "user-auth",
  default: null,
});

/** 用户是否登录，以及用户权限信息*/
function userAuth() {
  return useRecoilValue(userAuthContext);
}
export default userAuth;
