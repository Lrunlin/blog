import { useState, Fragment, useEffect } from "react";
import Image from "next/image";
import News from "@/components/common/Header/News";
import Avatar from "@/components/common/Avatar";
import Link from "next/link";

/** 创作者中心的Header组件*/
const Header = () => {
  return (
    <div className="w-full h-16">
      <header className="w-full h-16 fixed z-10 bg-white border-slate-100 border-b-solid">
        <div className="max-w-[1440px] h-full mx-auto flex justify-between items-center px-6">
          <Link href="/" className="flex items-center">
            <div className="flex items-center">
              <Image src="/favicon.svg" height={28} width={28} />
              <span className="ml-5 text-xl font-medium text-blue-400">
                {process.env.SITE_NAME}
              </span>
            </div>
          </Link>
          <div className="flex items-center">
            <News className="mr-8" />
            <Avatar />
          </div>
        </div>
      </header>
    </div>
  );
};
export default Header;
