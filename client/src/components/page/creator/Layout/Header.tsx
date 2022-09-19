import Image from "@/components/next/Image";
import News from "@/components/common/Header/News";
import Avatar from "@/components/common/Avatar";
import Link from "next/link";

/** 创作者中心的Header组件*/
const Header = () => {
  return (
    <div className="w-full h-16">
      <header className="w-full h-16 bg-white fixed z-10 border-slate-100 border-b-solid shadow-sm">
        <div className="max-w-[1440px] bg-white h-full mx-auto flex justify-between items-center px-6 cursor-pointer">
          <Link href="/" className="flex items-center">
            <div className="flex items-center">
              <Image src="/favicon.svg" height={28} width={28} alt="LOGO" />
              <span className="ml-5 text-xl font-medium text-blue-400">
                {process.env.NEXT_PUBLIC_SITE_NAME}
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
