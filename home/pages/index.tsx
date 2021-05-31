import React, { useState } from "react";
import Article from "../components/Article/index";
import axios from "axios";
import style from "./index.module.scss";
import setHead from "../components/Head";
import { Pagination } from "antd";
function Index({ maxNum, data }) {
  const [articleData, setArticleData] = useState<object[]>(data);

  // 根据页面查询数据
  const getArticle = (index: number) => {
    axios.get(`/article-page/${index}`).then(res => {
      setArticleData(res.data.data);
    });
  };

  return (
    <>
      {setHead({
        title: "刘润霖||web博客",
        keywords: "web前端,博客,刘润霖",
        description:
          "刘润霖的个人博客WEB相关,记录日常开发有趣的事情,刷题时分享结果与思路,分享成果物,博客会长期更新,频繁更新本站开发技术以及源代码。",
      })}
      <Article data={articleData} />
      <div className={style.page}>
        <Pagination
          defaultCurrent={1}
          total={maxNum}
          onChange={pageNumber => getArticle(pageNumber)}
          hideOnSinglePage={true}
        />
      </div>
    </>
  );
}

Index.getInitialProps = async () => {
  let data;
  let maxNum;
  await axios.get("/article-max").then(res => {
    maxNum = res.data.data;
  });
  await axios
    .get("/article-page/1", { params: { key: "router,type,introduce,time,title" } })
    .then(res => {
      data = res.data.data;
    });
  return {
    maxNum,
    data,
  };
};
export default Index;
