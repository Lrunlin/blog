import { useState, useEffect, ReactNode } from "react";
import type { FC } from "react";
import Aside from "./Aside";
import Base from "@/layout/Base";
interface propsType {
  children?: ReactNode;
}

const Layout: FC<propsType> = props => {
  return (
    <Base>
      <main className="bg-white w-full mr-4 p-8">{props.children}</main>
      <Aside />
    </Base>
  );
};
export default Layout;
