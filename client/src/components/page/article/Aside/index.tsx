import dynamic from "next/dynamic";
import Repository from "@/components/page/article/Aside/Repository";
import AdSense from "@/components/common/AdSense";
import Advertisement from "../../../common/Advertisement";
const Catalogue = dynamic(import("./Catalogue"), { ssr: false });

/** 文章页面的右侧推广内容*/
const Aside = () => {
  return (
    <>
      <aside className="sm:hidden">
        <div className="w-60">{/* 占位用的防止左侧内容偏移 */}</div>
        <Repository />
        <Advertisement type="article" className="mt-3" />
        <AdSense />
        <Catalogue />
      </aside>
    </>
  );
};
export default Aside;
