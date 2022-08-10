import type { FC } from "react";
import Base, { propsType as basePropsType } from "@/layout/Base";
import Advertisement from "./Advertisement";
import AuthorRanking from "./AuthorRanking";
import Footer from "./Footer";
import { responseType as advertisementType } from "@/request/advertisement";

interface propsType extends basePropsType {
  advertisement: advertisementType;
}

/**
 * 首页的基本嵌套布局
 * 需要传递右侧推广信息的数据
 */
const Layout: FC<propsType> = props => {
  return (
    <Base className="max-w-[960px]" {...props}>
      <div className="mr-4 w-fit">{props.children}</div>
      <aside className="w-60">
        <Advertisement data={props.advertisement} />
        <AuthorRanking />
        <Footer />
      </aside>
    </Base>
  );
};
export default Layout;
