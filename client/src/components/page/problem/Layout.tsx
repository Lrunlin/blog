import type { FC, ReactNode } from "react";
import Aside from "./Aside";
import Read from "@/layout/Content";

interface propsType {
  children?: ReactNode;
  language?: string[];
}

const Layout: FC<propsType> = props => {
  return (
    <Read className="items-start pb-8" Aside={<Aside />}>
      <article className={`max-w-[904px]`}>{props.children}</article>
    </Read>
  );
};
export default Layout;
