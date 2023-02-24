import { useRecoilValue } from "recoil";
import { currentArticleDataContext } from "@/pages/article/[id]";
import Catalogue_ from "./Catalogue";
/** 文章页面侧边目录*/
const Catalogue = () => {
  let articleData = useRecoilValue(currentArticleDataContext);
  return <>{articleData.display_directory && <Catalogue_ />}</>;
};
export default Catalogue;
