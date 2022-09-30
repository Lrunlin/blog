import { useState, Fragment } from "react";
import type { FC, ReactNode } from "react";
import Base from "@/layout/Base";
import Head from "@/components/next/Head";
import ActiveLink from "@/components/next/ActiveLink";

interface propsType {
  children: ReactNode;
}
const Layout: FC<propsType> = props => {
  return (
    <>
      <Base
        brow={
          <div className="w-full bg-white h-11 shadow-sm">
            <div className="max-w-[960px] mx-auto flex h-full">
              <ActiveLink
                href="/notification/comment"
                className="text-gray-600 flex items-center"
                activeClassName="font-bold !text-blue-400 "
              >
                评论通知
              </ActiveLink>
              <ActiveLink
                href="/notification/article"
                className="text-gray-600 flex items-center ml-4"
                activeClassName="font-bold !text-blue-400"
              >
                关注通知
              </ActiveLink>
            </div>
          </div>
        }
      >
        <Head title={`通知中心-${process.env.NEXT_PUBLIC_SITE_NAME}`} />
        <div className="w-[960px] mx-auto">{props.children}</div>
      </Base>
    </>
  );
};
export default Layout;
