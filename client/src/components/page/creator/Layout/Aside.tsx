import { memo } from "react";
import useUserData from "@/store/user-data";
import Avatar from "@/components/common/Avatar";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { BookOutlined, HomeOutlined } from "@ant-design/icons";

type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key: string,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps["items"] = [
  getItem("首页", "", <HomeOutlined />),
  getItem("内容管理", "content", <BookOutlined />, [getItem("文章管理", "article")]),
];

/** 创作者中心的左侧导航*/
const Aside = () => {
  let [userData] = useUserData();
  let router = useRouter();

  function onClick(params: any) {
    let path = (params.keyPath as string[]).reverse().join("/");
    router.push(`/creator/${path}`);
  }

  return (
    <aside className="w-60 h-5/6 p-4 fixed shadow-sm bg-white">
      <div className="flex items-center">
        <Avatar size={48} />
        <div className="w-20 ml-2 text-lg truncate">{userData?.name}</div>
      </div>
      <Button type="primary" block className="mt-8" onClick={() => router.push("/article/editor")}>
        写文章
      </Button>
      <div className="mt-4 select-none">
        <Menu
          onClick={onClick}
          defaultSelectedKeys={[(items as any)[0].key]}
          mode="inline"
          items={items}
        />
      </div>
    </aside>
  );
};

export default memo(Aside);
