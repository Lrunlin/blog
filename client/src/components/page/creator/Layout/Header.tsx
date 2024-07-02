import Link from "next/link";
import Avatar from "@/components/common/Avatar";
import News from "@/components/common/Header/News";
import Image from "@/components/next/Image";

/** 创作者中心的Header组件*/
const Header = () => {
  return (
    <div className="h-16 w-full">
      <header className="border-b-solid fixed z-10 h-16 w-full border-slate-100 bg-white shadow-sm">
        <div className="mx-auto flex h-full max-w-[1440px] cursor-pointer items-center justify-between bg-white px-6">
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
