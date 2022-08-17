import { useState, useRef } from "react";
import { Dropdown, Avatar, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import useUserData from "@/store/user-data";
import type { UserAttributes } from "@/store/user-data";
import { useRouter } from "next/router";

const UserData = () => {
  let router = useRouter();
  function onSelect({ key }: { key: string }) {
    router.push(key);
  }
  const menu = (
    <Menu
      onClick={onSelect}
      className="w-full"
      items={[
        {
          label: "发布文章",
          key: "/write",
        },
        {
          label: "创作者中心",
          key: "/creator",
        },
      ]}
    />
  );
  let [userData] = useUserData();
  return (
    <>
      <div>
        <Dropdown.Button
          getPopupContainer={() =>
            document.getElementsByClassName("header-dropdown-button-positon")[0] as HTMLElement
          }
          icon={<DownOutlined />}
          className="mr-8 header-dropdown-button-positon"
          type="primary"
          overlay={menu}
          overlayStyle={{ width: "110%" }}
        >
          创作者
        </Dropdown.Button>
        <Avatar src={userData?.avatar_url}>{userData?.name.slice(0,1).toLocaleUpperCase()}</Avatar>
      </div>
    </>
  );
};
export default UserData;
