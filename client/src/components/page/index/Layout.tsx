"use client";

import type { FC } from "react";
import Base, { propsType as basePropsType } from "@/layout/Base";
import AdSense from "@/components/common/AdSense";
import Advertisement from "@/components/common/Advertisement";
import Repository from "@/components/page/article/Aside/Repository";
import Footer from "./Footer";
import Ranking from "./Ranking";

/**
 * 首页的基本嵌套布局
 * 需要传递右侧推广信息的数据
 */
const Layout: FC<basePropsType> = (props) => {
  return (
    <Base className="max-w-[960px]" {...props}>
      <div className="mr-4 w-[calc(100%-256px)] sm:mr-0 sm:w-full">
        {props.children}
      </div>
      <aside className="w-60 sm:hidden">
        <Repository />
        <Advertisement type="index" />
        <AdSense />
        <Ranking />
        <Footer />
      </aside>
    </Base>
  );
};
export default Layout;
