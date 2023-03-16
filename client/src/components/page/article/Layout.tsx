import type { FC, ReactNode } from "react";
import Read from "@/layout/Content";
import Aside from "./Aside";
import dynamic from "next/dynamic";
import ToolBar from "./ToolBar";
import { useRecoilValue } from "recoil";
import { currentArticleDataContext } from "@/pages/article/[id]";
let Comments = dynamic(import("./Comments"), { ssr: false });
let Recommend = dynamic(import("./Recommend"), { ssr: false });

interface propsType {
  children: ReactNode;
}

const Layout: FC<propsType> = props => {
  let data = useRecoilValue(currentArticleDataContext);

  return (
    <Read className="pb-16" language={data.language} ToolBar={<ToolBar />} Aside={<Aside />}>
      <article className="p-8 pb-5 bg-white break-all shadow-sm w-full">{props.children}</article>
      <div className="p-8 pb-10 mt-4 bg-white shadow-sm">
        <Comments title="评论" />
      </div>
      <Recommend />
    </Read>
  );
};
export default Layout;
