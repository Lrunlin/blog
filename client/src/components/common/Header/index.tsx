import classNames from "classnames";
import { useState, useEffect } from "react";
import Navigation from "./Navigation";
import Search from "./Search";
import User from "./User";

const Header = () => {
  let [isShrink, setIsShrink] = useState(false);

  useEffect(() => {
    const scrollSwitch = () => {
      let scrollY = document.documentElement.scrollTop || document.body.scrollTop;
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
      className={classNames(["w-full h-12 border-slate-100 duration-200", isShrink && "-mt-12"])}
    >
      <div className="w-full h-12 fixed bg-white z-50 shadow-sm">
        <div className="max-w-[1440px] h-12 mx-auto flex justify-between items-center px-6">
          <Navigation />
          <Search />
          <User />
        </div>
      </div>
    </header>
  );
};
export default Header;
