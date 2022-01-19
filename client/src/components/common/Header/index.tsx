import { memo, useState, useEffect, useContext } from "react";
import type { FunctionComponent } from "react";
import router, { useRouter } from "next/router";
import Link from "next/link";
import { Tooltip, Input, message, Menu, Dropdown } from "antd";
import {
  FormOutlined,
  SearchOutlined,
  UserOutlined,
  PoweroffOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import axios from "axios";
import css from "styled-jsx/css";
import setClassName from "classnames";
import Logn from "./Logn";
import { Context } from "@/store";
import type { response, userData } from "@/types";
import UserFace from "@/components/common/UserFace";
import If from "@/utils/If";

interface navListTypes {
  href: string;
  text: string;
}
const Style = css`
  .header-container {
    height: 60px;
    width: 100vw;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 999;
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.05);
    background-color: #ffffff;
  }
  header {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 10px;
  }
  nav {
    width: 360px;
    a {
      margin-left: 25px !important;
      color: #333;
    }
  }
  .logo {
    width: 32px;
    height: 32px;
    opacity: 0.6;
  }
  .compile {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #05a6f0;
    margin-right: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .header-user {
    display: flex;
    align-items: center;
  }
  .header-logn {
    color: #51a5ff;
  }
`;

const navList: navListTypes[] = [
  {
    href: "/",
    text: "首页",
  },
  {
    href: "/design",
    text: "Design",
  },
  {
    href: "/comment",
    text: "随便说说",
  },
  {
    href: "/open-api",
    text: "开放API",
  },
];

/** 文章搜索函数*/
const articleArticle = (text: string): boolean | void => {
  if (!/^[\s\S]*.*[^\s][\s\S]*$/.test(text)) {
    return false;
  }
  router.push({
    pathname: "/search",
    query: {
      text: text,
    },
  });
};

//修改一个data的格式
interface responseUserData extends response<userData> {
  data: userData;
}

//*暂时不加退出将token加入黑名单的功能
function signOut() {
  localStorage.removeItem("token");
  router.reload();
}

const Header: FunctionComponent = () => {
  let router = useRouter();
  let { userData, setUserData } = useContext(Context);

  const [search, setSearch] = useState<string>(""); //搜索框内容
  const [isLayerShow, setLayerState] = useState<boolean>(false); //登录注册弹窗是否展示

  useEffect(() => {
    if (localStorage.token) {
      axios.get<responseUserData>("/user/data").then(res => {
        if (res.data.success) {
          let _data = res.data.data;
          _data.sign = true;
          setUserData(_data);
        }
      });
    }
  }, []);
  const PropsStyle = css.global`
    .header_user-face {
      border-radius: 50%;
      margin-right: 10px;
    }
  `;
  const UserSelect: FunctionComponent = () => {
    const menu = (
      <Menu>
        <Menu.Item icon={<UserOutlined />} key="个人中心">
          <Link href={`/user/${userData.email}`}>
            <div>个人中心</div>
          </Link>
        </Menu.Item>
        <Menu.Item icon={<SettingOutlined />} key="设置">
          <Link href={`/set`}>
            <div>设置</div>
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
  };

  return (
    <div className="header-container">
      <style jsx={true}>{Style}</style>
      <style jsx global>{`
        body {
          padding-top: 70px;
        }
      `}</style>
      <header className="container">
        <nav>
          <img src="/favicon.svg" className="logo" alt="logo" />
          {navList.map(item => (
            <Link href={item.href} key={item.text}>
              <a className={setClassName({ active: router.pathname == item.href })}>{item.text}</a>
            </Link>
          ))}
        </nav>
        <Input
          style={{
            width: "280px",
            height: "32px",
            borderRadius: "20px",
            backgroundColor: "#f0f1f4",
          }}
          value={search}
          placeholder="搜索内容"
          bordered={false}
          prefix={<SearchOutlined />}
          maxLength={20}
          onChange={e => setSearch(e.target.value)}
          onPressEnter={e => articleArticle(search)}
        />
        <div className="header-user">
          <div className="compile">
            <Tooltip placement="bottomRight" title={userData?.sign ? "发布文章" : "请登录"}>
              <FormOutlined
                onClick={() => {
                  userData?.sign ? router.push("/write") : message.warn("请登录后发布文章");
                }}
                style={{ fontSize: "20px", color: "#def3fd" }}
              />
            </Tooltip>
          </div>
          <If
            if={userData?.sign}
            else={
              <span className="header-logn" onClick={() => setLayerState(true)}>
                登录/注册
              </span>
            }
          >
            <UserSelect />
          </If>
        </div>
      </header>
      <Logn isLayerShow={isLayerShow} closeLayer={(state: boolean) => setLayerState(state)} />
    </div>
  );
};
export default memo(Header);
