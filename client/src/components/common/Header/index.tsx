import { memo, useState, useEffect, useContext } from "react";
import type { FunctionComponent } from "react";
import { useRouter } from "next/router";
import { Tooltip, message } from "antd";
import { FormOutlined } from "@ant-design/icons";
import axios from "axios";
import css from "styled-jsx/css";
import Logn from "./Logn";
import { Context } from "@/store";
import type { response, userData } from "@/types";
import If from "@/utils/If";
import SearchInput from "./SearchInput";
import Nav from "./Nav";
import UserSelect from "./UserSelect";

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

//修改一个data的格式
interface responseUserData extends response<userData> {
  data: userData;
}

const Header: FunctionComponent = () => {
  let router = useRouter();
  let { userData, setUserData } = useContext(Context);

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

  return (
    <div className="header-container">
      <style jsx={true}>{Style}</style>
      <style jsx global>{`
        body {
          padding-top: 70px;
        }
      `}</style>
      <header className="container">
        <Nav />
        <SearchInput />
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
