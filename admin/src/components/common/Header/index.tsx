import { memo, useEffect, useMemo } from "react";
import type { FC } from "react";
import { Menu } from "antd";
import items from "./items";
import { useLocation } from "react-router-dom";
const Header: FC = memo(() => {
  let location = useLocation();
  
  let menuKeys = useMemo(() => {
    let _key = { selectKeys: [""], openKeys: [""] };
    items.forEach(item => {
      if (item.href == location.pathname) {
        _key = {
          selectKeys: [item.key],
          openKeys: [item.key],
        };
        return;
      }
      item.children?.forEach(_item => {
        if (_item.href == location.pathname) {
          _key = {
            selectKeys: [_item.key],
            openKeys: [item.key],
          };
        }
      });
    });
    return _key;
  }, [location]);

  useEffect(() => {
    document.body.classList.add("pl-48");
    return () => {
      document.body.classList.remove("pl-48");
    };
  });
  return (
    <Menu
      className="h-screen fixed left-0 w-48"
      defaultSelectedKeys={menuKeys.selectKeys}
      defaultOpenKeys={menuKeys.openKeys}
      mode="inline"
      theme="dark"
      items={items}
    />
  );
});
export default Header;
