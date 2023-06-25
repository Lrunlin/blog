import { memo } from "react";
import type { FC } from "react";
import { Avatar, Dropdown } from "antd";
import type { AvatarProps } from "antd";
import useUserData from "@/store/user-data";
import dynamic from "next/dynamic";
const Menu = dynamic(() => import("./Menu"), { ssr: false });

/** 登录用户的头像（根据userData自动获取链接）*/
const Avatar_: FC<AvatarProps> = memo(props => {
  let [userData] = useUserData();
  return (
    <>
      <Dropdown dropdownRender={() => <Menu />} placement="bottomRight" trigger={["click"]}>
        <Avatar src={userData?.avatar_url} className="cursor-pointer" alt="头像" {...props} />
      </Dropdown>
    </>
  );
});
export default Avatar_;
