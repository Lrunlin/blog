import { memo, useEffect } from "react";
import type { FC } from "react";
import { Menu } from "antd";
import items from "./items";
const Header: FC = memo(() => {
  useEffect(() => {
    document.body.classList.add("pl-48");
    return () => {
      document.body.classList.remove("pl-48");
    };
  });
  return (
    <Menu
      className="h-screen fixed left-0 w-48"
      // defaultSelectedKeys={["1"]}
      // defaultOpenKeys={[items[0].key]}
      mode="inline"
      theme="dark"
      items={items}
    />
  );
});
export default Header;
