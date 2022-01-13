import { useState, memo } from "react";
import type { FunctionComponent } from "react";
import css from "styled-jsx/css";
import type { articleType } from "@/types";
import { useRouter } from "next/router";
import { Menu } from "antd";
import NoSSR from "@/utils/NoSSR";
import {
  ContainerOutlined,
  BookOutlined,
  CodeOutlined,
  ConsoleSqlOutlined,
  BorderlessTableOutlined,
} from "@ant-design/icons";

interface propsTypes {
  type: articleType[];
  refreshData: (method: "page" | "type", value: string) => void;
}
interface asideListTypes {
  type: string;
  icon: JSX.Element;
  /**设置key,在没有对应类型时使用，设置为空查询默认信息 用于推荐按钮*/
  key?: string;
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
  }
  .aside-title {
    padding-left: 24px;
    padding-top: 10px;
    border-bottom: 1px solid #f2f2f2;
  }
`;

let asideList: asideListTypes[] = [
  {
    type: "推荐",
    icon: <BookOutlined />,
    key: "",
  },
  {
    type: "资讯",
    icon: <ContainerOutlined />,
  },
  {
    type: "前端",
    icon: <CodeOutlined />,
  },
  {
    type: "后端",
    icon: <ConsoleSqlOutlined />,
  },
];

const IconSkeleton: FunctionComponent = () => {
  return (
    <>
      <style jsx>{`
        div {
          height: 15px;
          width: 15px;
          background-color: rgb(177, 177, 177);
          border-radius: 50%;
        }
      `}</style>
      <div></div>
    </>
  );
};

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
          {asideList.map(item => (
            <Menu.Item
              key={item.key != undefined ? item.key : item.type}
              icon={<NoSSR children={item.icon} onLoad={<IconSkeleton />} />}
            >
              {item.type}
            </Menu.Item>
          ))}
          {props.type.map(
            (item, index) =>
              item.isShow && (
                <Menu.Item
                  key={item.type}
                  style={{ marginTop: !index ? "5px" : "" }}
                  icon={<NoSSR children={<BorderlessTableOutlined />} onLoad={<IconSkeleton />} />}
                >
                  {item.type}
                </Menu.Item>
              )
          )}
        </Menu>
      </aside>
    </>
  );
};
export default memo(Aside);
