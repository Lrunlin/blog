import { memo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "antd";
import { Menu } from "antd";
import { BookOutlined, HomeOutlined } from "@ant-design/icons";
import Avatar from "@/components/common/Avatar";
import useUserData from "@/store/user/user-data";

let items = [
  { label: "首页", key: "", icon: <HomeOutlined /> },
  {
    label: "内容管理",
    key: "content",
    icon: <BookOutlined />,
    children: [
      { label: "文章管理", key: "article" },
      { label: "问题管理", key: "problem" },
    ],
  },
];

/** 创作者中心的左侧导航*/
const Aside = () => {
  let userData = useUserData((s) => s.data);
  let router = useRouter();
  let pathname = usePathname();

  function flattenItemsWithBelongKey(items: any[], belongKey = "") {
    let flattenedItems: any[] = [];
    for (const item of items) {
      const { key, children } = item;
      flattenedItems.push({ key, belongKey });
      if (children) {
        flattenedItems = flattenedItems.concat(
          flattenItemsWithBelongKey(children, key),
        );
      }
    }
    return flattenedItems;
  }

  function onClick(params: any) {
    let path = (params.keyPath as string[]).reverse().join("/");
    router.push(`/creator/${path}`);
  }

  let keys = flattenItemsWithBelongKey(items);

  let defaultSelectedKeys: string = keys.find(
    (item) =>
      item.belongKey + item.key ==
      pathname.replace("creator", "").replace(/\//g, ""),
  )?.key;
  let defaultOpenKeys: string = keys.find(
    (item) => item.key == defaultSelectedKeys,
  )?.belongKey;

  return (
    <aside className="fixed flex h-5/6 w-60 flex-col bg-white p-4 shadow-sm">
      <div className="flex items-center">
        <Avatar className="h-12 w-12" />
        <div className="ml-2 w-20 truncate text-lg">{userData?.name}</div>
      </div>
      <Button
        type="primary"
        block
        className="mt-8"
        onClick={() => router.push("/article/editor")}
      >
        写文章
      </Button>
      <Button block className="mt-2" onClick={() => router.push("/theme")}>
        提交主题
      </Button>
      <Menu
        rootClassName="!border-0"
        className="!mt-4 flex-1"
        onClick={onClick}
        defaultSelectedKeys={[defaultSelectedKeys]}
        mode="inline"
        items={items}
        defaultOpenKeys={[defaultOpenKeys]}
      />
    </aside>
  );
};

export default memo(Aside);
