import { useState, Fragment } from "react";
import ActiveLink from "@/components/next/ActiveLink";

const Navigation = () => {
  return (
      <nav>
        <h1 className="hidden">网络日志</h1>
        <ActiveLink href="/">
          <img src="/favicon.svg" className="h-6" alt="logo" />
        </ActiveLink>
        <ActiveLink href="/" className="ml-4 text-zinc-800">
          首页
        </ActiveLink>
      </nav>
  );
};
export default Navigation;
