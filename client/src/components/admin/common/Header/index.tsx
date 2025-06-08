import { memo, useEffect, useState } from "react";
import type { FC } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "antd";
import classNames from "classnames";
import items from "./items";

function getKeys(pathname: string) {
  let keys = { selectKey: [""], openKey: [""] };
  for (const item of items) {
    //直接匹配到顶层，无需查看children
    if (item.href == pathname) {
      keys = { selectKey: [item.key], openKey: [item.key] };
      break;
    }
    //匹配children
    for (const _item of item.children || []) {
      if (_item.href == pathname) {
        keys = { selectKey: [_item.key], openKey: [item.key] };
        break;
      }
    }
  }
  return keys;
}

interface propsType {
  collapsed: boolean;
  toggleCollapsed: Function;
}

const Header: FC<propsType> = memo((props) => {
  let pathname = usePathname() as string;
  let { openKey: _openKey, selectKey: _selectKey } = getKeys(pathname);
  const [openKey, setOpenKey] = useState(_openKey);
  const [selectKey, setSelectKey] = useState(_selectKey);

  // 根据路径切换导航
  useEffect(() => {
    let { openKey, selectKey } = getKeys(pathname);
    setOpenKey(openKey);
    setSelectKey(selectKey);
  }, [pathname]);

  return (
    <>
      <style jsx global>{`
        body {
          background-color: rgb(243 244 246);
        }
      `}</style>
      <Menu
        inlineCollapsed={props.collapsed}
        className={classNames(
          "fixed left-0 h-screen",
          props.collapsed ? "!w-20" : "!w-48",
        )}
        defaultSelectedKeys={selectKey}
        selectedKeys={selectKey}
        defaultOpenKeys={openKey}
        openKeys={openKey}
        mode="inline"
        theme="dark"
        items={items}
        onOpenChange={(keys) => {
          setOpenKey(keys);
        }}
        onClick={(e) => {
          if (e.key.includes("伸缩")) {
            props.toggleCollapsed();
          }
        }}
      />
    </>
  );
});
export default Header;
