import { Pagination } from "antd";
import { useState, useEffect } from "react";
import Article from "@/components/Article";
import style from "@/style/index.module.scss";
import Head from "@/modules/Head";
import axios from "axios";
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
export default function Home({ data, max }) {
  //文章数据
  const [articleData, setArticleData] = useState<article[]>(data);
  //文章总条数

  function switchPage(page: number) {
    axios.get(`/article/page/${page}`, { params: { show: true } }).then(res => {
      setArticleData(res.data.data);
    });
  }
  useEffect(() => {
    setTimeout(() => {
      axios.get("/article/page/1", {});
    }, 2000);
  }, []);
  return (
    <>
      {Head({
        title: "刘润霖||web博客",
        keywords: "首页,刘润霖",
        description:
          "刘润霖的个人博客WEB相关,记录日常开发有趣的事情,刷题时分享结果与思路,分享成果物,博客会长期更新,频繁更新本站开发技术以及源代码,网站整体由刘润霖个人开发。 刘润霖--WEB博客",
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
  let max;
  await axios
    .get("/article/page/1", {
      params: { key: ["router", "title", "type", "introduce", "time"] },
    })
    .then(res => {
      data = res.data.data;
      max = res.data.max;
    });
  return {
    data,
    max,
  };
};
