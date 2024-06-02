"use client";
import userUserCurrentArticleData from "@/store/user/user-current-article-data";

import Catalogue_ from "./Catalogue";
/** 文章页面侧边目录*/
const Catalogue = () => {
  let articleData = userUserCurrentArticleData(s => s.data);
  return <>{articleData.display_directory && <Catalogue_ />}</>;
};
export default Catalogue;
