import { useState, memo } from "react";
import type { FunctionComponent } from "react";
import css from "styled-jsx/css";
import type { articleType } from "@/types";
import { useRouter } from "next/router";
import { Menu } from "antd";
import axios from "axios";

let url = axios.defaults.baseURL;

interface propsTypes {
  type: articleType[];
  refreshData: (method: "page" | "type", value: string) => void;
}

const Style = css`
  aside {
    background-color: #ffffff;
    width: 170px;
    border: 1px solid #f2f2f2;
    max-height: calc(100vh - 70px);
    position: sticky;
    top: 70px;
    z-index: 1;
    user-select: none;
  }
  .aside-title {
    padding-left: 24px;
    padding-top: 10px;
    border-bottom: 1px solid #f2f2f2;
  }
  img {
    width: 16px;
  }
`;

/** 左侧aside*/
const Aside: FunctionComponent<propsTypes> = props => {
  let router = useRouter();

  /** 根据地址栏默认类型*/
  const [articleMenu, setArticleMenu] = useState<[string]>([
    (router.query.type as string | undefined) || "",
  ]);

  /** 点击类型切换文章*/
  const selectMeun = (e: any) => {
    let type: string = e.key;
    props.refreshData("type", type);
    if (/^[\s\S]*.*[^\s][\s\S]*$/.test(type)) {
      router.push({ query: { type: type } });
    } else {
      router.push({ query: {} });
    }
    setArticleMenu([type]);
  };

  return (
    <>
      <style jsx>{Style}</style>
      <aside>
        <h2 className="aside-title">首页</h2>
        <Menu
          style={{ width: "170px", height: "100vh" }}
          mode="inline"
          selectedKeys={articleMenu}
          onClick={selectMeun}
        >
          <Menu.Item key="" icon={<img src="/image/推荐.png" />}>
            推荐
          </Menu.Item>
          {props.type.map(item => (
            <Menu.Item
              key={item.type}
              icon={<img src={`${url}/image/type/${item.type}.webp`} alt={item.type} />}
            >
              {item.type}
            </Menu.Item>
          ))}
        </Menu>
      </aside>
    </>
  );
};
export default memo(Aside);
