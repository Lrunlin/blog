import { Suspense, type FC, type ReactNode } from "react";
import Read from "@/layout/Content";
import type { propsType as contentLayoutPropsType } from "@/layout/Content";
import Aside from "./Aside";
import Comments from "./Comments";
import Recommend from "./Recommend";
import ToolBar from "./ToolBar";

interface propsType extends Pick<contentLayoutPropsType, "language"> {
  children: ReactNode;
}

const Layout: FC<propsType> = props => {
  return (
    <Read className="pb-16" language={props.language} ToolBar={<ToolBar />} Aside={<Aside />}>
      <article className="p-8 pb-5 bg-white break-all shadow-sm w-full">{props.children}</article>
      <div className="p-8 pb-10 mt-4 bg-white shadow-sm">
        <Suspense>
          <Comments title="评论" />
        </Suspense>
      </div>
      <Suspense>
        <Recommend />
      </Suspense>
    </Read>
  );
};
export default Layout;
