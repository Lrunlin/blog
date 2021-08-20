import axios from "axios";
import { Pagination } from "antd";
import { useState, useEffect } from "react";
import Article from "../components/Article";
import style from "../style/index.module.scss";
import Head from "../modules/Head";
interface article {
  router?: string;
  type?: string;
  introduce?: string;
  article?: string;
  time?: string;
  isTop?: boolean;
  isShow?: boolean;
  title?: string;
}
export default function Home({ data }) {
  //文章数据
  const [articleData, setArticleData] = useState<article[]>(data);
  //文章总条数
  const [max, SetMax] = useState<number>(1);
  useEffect(() => {
    axios.get("/article-max").then(res => {
      SetMax(res.data.data);
    });
  }, []);
  function switchPage(page: number) {
    axios.get(`/article-page/${page}`).then(res => {
      setArticleData(res.data.data);
    });
  }
  return (
    <>
      {Head({
        title: "刘润霖||web博客",
        keywords: "首页",
        description:
          "刘润霖的个人博客WEB相关,记录日常开发有趣的事情,刷题时分享结果与思路,分享成果物,博客会长期更新,频繁更新本站开发技术以及源代码。 刘润霖--WEB博客",
      })}
      <main className={style.container}>
        <Article data={articleData} />
      </main>
      <div className={style.pagination}>
        <Pagination
          showSizeChanger={false}
          total={Math.ceil(max)}
          pageSize={10}
          onChange={page => switchPage(page)}
        />
      </div>
    </>
  );
}
Home.getInitialProps = async () => {
  let data;
  await axios
    .get("/article-page/1", {
      params: { key: "router,title,article,type,introduce,time" },
    })
    .then(res => {
      data = res.data.data;
    });
  return {
    data: data,
  };
};
