import Navigation from "./Navigation";
import Search from "./Search";
import User from "./User";

const Header = () => {
  
  return (
    <header className="w-full border-slate-100 border-b-solid">
      <div className="max-w-[1440px] h-12 mx-auto flex justify-between items-center px-6">
        <Navigation />
        <Search />
        <User />
      </div>
    </header>
  );
};
export default Header;
