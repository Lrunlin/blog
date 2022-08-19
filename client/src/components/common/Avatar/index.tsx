import type { FC } from "react";
import { Avatar  } from "antd";
import type { AvatarProps } from "antd";
import useUserData from "@/store/user-data";

/** 登录用户的头像（根据userData自动获取链接）*/
const componentNeme: FC<AvatarProps> = props => {
  let [userData] = useUserData();
  return (
    <>
      <Avatar src={userData?.avatar_url} alt="头像" {...props} />
    </>
  );
};
export default componentNeme;
