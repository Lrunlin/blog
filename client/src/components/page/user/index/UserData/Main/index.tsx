import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Tabs } from "antd";
import ArticleList from "@/components/common/ArticleList";
import FollowList from "./FollowList";
import { useRouter } from "next/router";

const { TabPane } = Tabs;
const Main = () => {
  let router = useRouter();
  const [articleData, setArticleDetdata] = useState<any[]>([]);
  const [articleTotal, setArticleTotal] = useState(0);
  const [articlePage, setArticlePage] = useState(1);
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

  const [collectionData, setCollectionDetdata] = useState<any[]>([]);
  const [collectionTotal, setCollectionTotal] = useState(0);
  const [collectionPage, setCollectionPage] = useState(1);
  useEffect(() => {
    axios
      .get(`/collection/${router.query.id}`, {
        params: { page: collectionPage },
      })
      .then(res => {
        setCollectionDetdata(_data => [..._data, ...res.data.data.list]);
        setCollectionTotal(res.data.data.total);
      });
  }, [collectionPage]);
  
  let activeKey = useMemo(() => (router.query.key as string) || "article", [router.query]);
  return (
    <>
      <Tabs
        activeKey={activeKey}
        onChange={key => {
          router.push({
            query: { ...router.query, key },
          });
        }}
      >
        <TabPane tab="文章" key="article">
          <ArticleList
            list={articleData}
            total={articleTotal}
            loadMoreData={() => setArticlePage(_page => ++_page)}
          />
        </TabPane>
        <TabPane tab="收藏" key="collection">
          <ArticleList
            list={collectionData}
            total={collectionTotal}
            loadMoreData={() => setCollectionPage(_page => ++_page)}
          />
        </TabPane>
        <TabPane tab="关注" key="following">
          <FollowList
            loadMoreData={(page, setTotal, setData) => {
              axios.get(`/following/${router.query.id}`, { params: { page: page } }).then(res => {
                setTotal(res.data.data.total);
                setData(_data => [..._data, ...res.data.data.list]);
              });
            }}
          />
        </TabPane>
        <TabPane tab="关注者" key="follower">
          <FollowList
            loadMoreData={(page, setTotal, setData) => {
              axios.get(`/follower/${router.query.id}`, { params: { page: page } }).then(res => {
                setTotal(res.data.data.total);
                setData(_data => [..._data, ...res.data.data.list]);
              });
            }}
          />
        </TabPane>
      </Tabs>
    </>
  );
};
export default Main;
