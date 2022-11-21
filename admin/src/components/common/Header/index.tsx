import { useState, useEffect, useMemo, memo } from "react";
import type { FC } from "react";
import { Menu } from "antd";
import items from "./items";
import { useLocation } from "react-router-dom";

function getKeys(pathname:string) {
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
  let location = useLocation();
  let { openKey: _openKey, selectKey: _selectKey } = getKeys(location.pathname);
  const [openKey, setOpenKey] = useState(_openKey);
  const [selectKey, setSelectKey] = useState(_selectKey);

  useEffect(() => {
    let { openKey, selectKey } = getKeys(location.pathname);
    setOpenKey(openKey);
    setSelectKey(selectKey);
  }, [location.pathname]);

  useEffect(() => {
    document.body.classList.add("pl-48", "bg-gray-100");
    return () => {
      document.body.classList.remove("pl-48", "bg-gray-100");
    };
  }, []);

  return (
    <Menu
      className="h-screen fixed left-0 w-48"
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
  );
});
export default Header;
