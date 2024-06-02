import type { FC, ReactNode } from "react";
import Read from "@/layout/Content";
import Aside from "@/components/page/article/Aside";
import ToolBar from "@/components/page/article/ToolBar";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Read className="pb-16" ToolBar={<ToolBar />} Aside={<Aside />}>
        {children}
      </Read>
    </>
  );
};
export default Layout;
