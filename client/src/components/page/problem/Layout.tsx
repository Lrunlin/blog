import type { FC, ReactNode } from "react";
import Read from "@/layout/Content";
import Aside from "./Aside";

interface propsType {
  children?: ReactNode;
  language?: string[];
}

const Layout: FC<propsType> = (props) => {
  return (
    <Read className="items-start pb-8" Aside={<Aside />}>
      <article className={`max-w-[904px]`}>{props.children}</article>
    </Read>
  );
};
export default Layout;
