import AdSense from "@/components/common/AdSense";
import Advertisement from "@/components/common/Advertisement";
import Repository from "@/components/page/article/Aside/Repository";
import Catalogue from "./Catalogue";

/** 文章页面的右侧推广内容*/
const Aside = () => {
  return (
    <>
      <Repository />
      <Advertisement type="article" />
      <AdSense />
      <Catalogue />
    </>
  );
};
export default Aside;
