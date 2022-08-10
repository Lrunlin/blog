import type { FC, ReactNode } from "react";
import Base from "@/layout/Base";
import Aside from "./Aside";
import dynamic from "next/dynamic";
let Comments = dynamic(import("./Comments"), { ssr: false });
let Recommend = dynamic(import("./Recommend"), { ssr: false });

interface propsType {
  children: ReactNode;
}

const Layout: FC<propsType> = props => {
  return (
    <Base className="pb-16">
      <div className="mr-4">
        <article className="p-8 pb-5 bg-white">{props.children}</article>
        <div className="p-8 pb-10 mt-4 bg-white">
          <Comments />
        </div>
        <Recommend/>
      </div>
      <Aside />
    </Base>
  );
};
export default Layout;
