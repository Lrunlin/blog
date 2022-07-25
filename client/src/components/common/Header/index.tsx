import { useState } from "react";
import Navigation from "./Navigation";
import Search from './Search';
import User from "./User";

const Header = () => {
  return (
    <header className="w-full">
      <div className="max-w-[1440px] h-12 mx-auto flex justify-between items-center">
        <Navigation/>
        <Search/>
        <User/>
      </div>
    </header>
  );
};
export default Header;
