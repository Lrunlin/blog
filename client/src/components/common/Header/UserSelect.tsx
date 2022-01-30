import { memo, useContext } from "react";
import type { FunctionComponent } from "react";
import { Context } from "@/store";

import UserFace from "@/components/common/UserFace";
import Link from "next/link";
import { Menu, Dropdown } from "antd";
import { UserOutlined, PoweroffOutlined, SettingOutlined } from "@ant-design/icons";
import css from "styled-jsx/css";
import { useRouter } from "next/router";

const PropsStyle = css.global`
  .header_user-face {
    border-radius: 50%;
    margin-right: 10px;
  }
`;

const UserSelect: FunctionComponent = memo(() => {
  let router = useRouter();
  let { userData } = useContext(Context);
  //*暂时不加退出将token加入黑名单的功能
  function signOut() {
    localStorage.removeItem("token");
    router.reload();
  }
  const menu = (
    <Menu>
      <Menu.Item icon={<UserOutlined />} key="个人中心">
        <Link href={`/user/${userData.email}`}>
          <>个人中心</>
        </Link>
      </Menu.Item>
      <Menu.Item icon={<SettingOutlined />} key="设置">
        <Link href="/set">
          <>设置</>
        </Link>
      </Menu.Item>
      <Menu.Item icon={<PoweroffOutlined />} key="退出登录" onClick={signOut}>
        <>退出登录</>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <style jsx>{`
        #userSelectDom {
          display: flex;
          align-items: center;
          margin-right: 10px;
        }
      `}</style>
      <style jsx>{PropsStyle}</style>
      <Dropdown
        overlay={menu}
        placement="bottomCenter"
        getPopupContainer={() => document.getElementById("userSelectDom") as HTMLElement}
        //由于固定定位的原因需要修改下指定定位节点
      >
        <div id="userSelectDom">
          <UserFace userId={userData.email} width={30} height={30} className="header_user-face" />
          <span>{userData.email}</span>
        </div>
      </Dropdown>
    </>
  );
});
export default UserSelect;
