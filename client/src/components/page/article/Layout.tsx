import { type FC, type ReactNode, Suspense } from "react";
import Read from "@/layout/Content";
import type { propsType as contentLayoutPropsType } from "@/layout/Content";
import Aside from "./Aside";
import Comments from "./Comments";
import Recommend from "./Recommend";
import ToolBar from "./ToolBar";

interface propsType extends Pick<contentLayoutPropsType, "language"> {
  children: ReactNode;
}

const Layout: FC<propsType> = (props) => {
  return (
    <Read
      className="pb-16"
      language={props.language}
      ToolBar={<ToolBar />}
      Aside={<Aside />}
    >
      <article className="w-full break-all bg-white p-8 pb-5 shadow-sm">
        {props.children}
      </article>
      <div className="mt-4 bg-white p-8 pb-10 shadow-sm">
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
