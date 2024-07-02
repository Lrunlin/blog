"use client";

import { useEffect, useState } from "react";
import classNames from "classnames";
import Navigation from "./Navigation";
import Search from "./Search";
import User from "./User";

const Header = () => {
  let [isShrink, setIsShrink] = useState(false);

  useEffect(() => {
    const scrollSwitch = () => {
      let scrollY =
        document.documentElement.scrollTop || document.body.scrollTop;
      // 大于600缩回，小于540伸出
      if (scrollY > 600 && !isShrink) {
        setIsShrink(true);
      }
      if (scrollY < 540 && isShrink) {
        setIsShrink(false);
      }
    };
    window.addEventListener("scroll", scrollSwitch);
    return () => {
      window.removeEventListener("scroll", scrollSwitch);
    };
  }, [isShrink]);

  return (
    <header
      className={classNames([
        "h-12 w-full border-slate-100 duration-200",
        isShrink && "-mt-12",
      ])}
    >
      <div className="fixed z-50 h-12 w-full bg-white shadow-sm">
        <div className="mx-auto flex h-12 max-w-[1440px] items-center justify-between px-6">
          <Navigation />
          <Search />
          <User />
        </div>
      </div>
    </header>
  );
};
export default Header;
