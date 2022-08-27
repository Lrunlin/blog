import { useState, useEffect } from "react";
import axios from "axios";
import { Tabs } from "antd";
import ArticleList from "@/components/common/ArticleList";
import { useRouter } from "next/router";

const { TabPane } = Tabs;
const Main = () => {
  let router = useRouter();
  const [articleData, setArticleDetdata] = useState<any[]>([]);
  const [articleTotal, setArticleTotal] = useState(0);
  const [articlePage, setArticlePage] = useState(1);

  const [collectionData, setCollectionDetdata] = useState<any[]>([]);
  const [collectionTotal, setCollectionTotal] = useState(0);
  const [collectionPage, setCollectionPage] = useState(1);

  useEffect(() => {
    axios
      .get(`/article/list/page/${articlePage}`, {
        params: { state: 1, author: router.query.id },
      })
      .then(res => {
        setArticleDetdata(_data => [..._data, ...res.data.data.list]);
        setArticleTotal(res.data.data.total);
      });
  }, [articlePage]);


  useEffect(() => {
    axios
      .get(`/article/collection/${articlePage}`, {
        params: { page: collectionPage },
      })
      .then(res => {
        setCollectionDetdata(_data => [..._data, ...res.data.data.list]);
        setCollectionTotal(res.data.data.total);
      });
  }, [collectionPage]);


  return (
    <>
      <Tabs defaultActiveKey="1">
        <TabPane tab="文章" key="1">
          <ArticleList
            list={articleData}
            total={articleTotal}
            loadMoreData={() => setArticlePage(_page => ++_page)}
          />
        </TabPane>
        <TabPane tab="收藏" key="2">
          <ArticleList
            list={collectionData}
            total={collectionTotal}
            loadMoreData={() => setCollectionPage(_page => ++_page)}
          />
        </TabPane>
      </Tabs>
    </>
  );
};
export default Main;
