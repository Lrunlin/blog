import { useEffect } from "react";
import Navigation from "./Navigation";
import Search from "./Search";
import User from "./User";

import { action as useUserAuthAction } from "@/store/user-auth";
import { action as useUserDataAction } from "@/store/user-data";

const Header = () => {
    useUserAuthAction();
    useUserDataAction();

  return (
    <header className="w-full">
      <div className="max-w-[1440px] h-12 mx-auto flex justify-between items-center">
        <Navigation />
        <Search />
        <User />
      </div>
    </header>
  );
};
export default Header;
