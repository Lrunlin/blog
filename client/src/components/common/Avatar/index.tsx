import { memo } from "react";
import type { FC } from "react";
import { Dropdown } from "antd";
import classNames from "classnames";
import useUserData from "@/store/user/user-data";
import Menu from "./Menu";

interface propsType {
  className?: string;
}

/** 登录用户的头像（根据userData自动获取链接）*/
const Avatar_: FC<propsType> = memo((props) => {
  let userData = useUserData((s) => s.data);
  return (
    <div>
      <Dropdown
        dropdownRender={() => (
          <>
            <Menu />
          </>
        )}
        placement="bottomRight"
        trigger={["click"]}
      >
        <img
          src={userData?.avatar_url}
          className={classNames([
            "cursor-pointer",
            "rounded-full",
            "w-[30px]",
            "h-[30]",
            props.className,
          ])}
          alt="头像"
        />
      </Dropdown>
    </div>
  );
});
export default Avatar_;
