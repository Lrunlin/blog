import type { FC, ReactNode } from "react";
import Read from "@/layout/Content";
import Aside from "@/components/page/problem/Aside";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Read className="items-start pb-8" Aside={<Aside />}>
        <article className={`max-w-[904px]`}>{children}</article>
      </Read>
    </>
  );
};
export default Layout;
