import type { FC, ReactNode } from "react";
import Sidebar from "@/layout/Sidebar";
import AdSense from "@/components/common/AdSense";
import Advertisement from "@/components/common/Advertisement";
import Repository from "../article/Aside/Repository";

interface propsType {
  children: ReactNode;
}
const Layout: FC<propsType> = ({ children }) => {
  return (
    <Sidebar
      Aside={
        <>
          <Repository />
          <Advertisement type="article" />
          <AdSense />
        </>
      }
    >
      {children}
    </Sidebar>
  );
};
export default Layout;
