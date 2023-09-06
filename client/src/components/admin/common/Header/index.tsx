import { useState, useEffect, memo } from "react";
import type { FC } from "react";
import { Menu } from "antd";
import items from "./items";
import { usePathname } from "next/navigation";
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

const Header: FC = memo(() => {
  let pathname = usePathname() as string;
  let { openKey: _openKey, selectKey: _selectKey } = getKeys(pathname);
  const [openKey, setOpenKey] = useState(_openKey);
  const [selectKey, setSelectKey] = useState(_selectKey);

  useEffect(() => {
    let { openKey, selectKey } = getKeys(pathname);
    setOpenKey(openKey);
    setSelectKey(selectKey);
  }, [pathname]);

  return (
    <>
      <style jsx global>{`
        body {
          padding-left: 192px;
          background-color: rgb(243 244 246);
        }
      `}</style>
      <Menu
        className="h-screen fixed left-0 !w-48"
        defaultSelectedKeys={selectKey}
        selectedKeys={selectKey}
        defaultOpenKeys={openKey}
        openKeys={openKey}
        mode="inline"
        theme="dark"
        items={items}
        onOpenChange={keys => {
          setOpenKey(keys);
        }}
      />
    </>
  );
});
export default Header;
