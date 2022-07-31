import { useEffect } from "react";
import axios from "axios";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

export interface UserAttributes {
  id: number;
  name: string;
  auth: number;
  email?: string;
  github?: string;
  qq?: string;
  state?: number;
  description?: string;
  site?: string;
  unit?: string;
  location?: string;
  avatar_file_name?: string;
  avatar_url?: string;
  create_time: Date;
}

export const userDataContext = atom<UserAttributes | null>({
  key: "user-data",
  default: null,
});

/** 用户是否登录，以及用户权限信息*/
export function state() {
  return useRecoilValue(userDataContext);
}

/** 根据Token刷新当前用户信息*/
export function action() {
  let setUserAuthState = useSetRecoilState(userDataContext);
  useEffect(() => {
    axios.get("/user/info").then(res => {
      if (res.data.success) {
        setUserAuthState(res.data.data);
      } else {
        setUserAuthState(null);
      }
    });
  }, []);
  return;
}

