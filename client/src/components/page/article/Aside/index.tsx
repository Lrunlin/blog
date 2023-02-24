import dynamic from "next/dynamic";
import Repository from "@/components/page/article/Aside/Repository";
import AdSense from "@/components/common/AdSense";
import Advertisement from "../../../common/Advertisement";
const Catalogue = dynamic(import("./Catalogue"), { ssr: false });

/** 文章页面的右侧推广内容*/
const Aside = () => {
  return (
    <>
      <Repository />
      <Advertisement type="article" className="mt-3" />
      <AdSense />
      <Catalogue />
    </>
  );
};
export default Aside;
