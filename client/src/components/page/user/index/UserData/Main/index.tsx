import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { Tabs } from "antd";
import ArticleList from "@/components/common/ArticleList";
import FollowList from "./FollowList";
import Favorites from "./Favorites";

import { useRouter } from "next/router";

const Main = () => {
  let router = useRouter();
  const [articleData, setArticleDetdata] = useState<any[]>([]);
  const [articleTotal, setArticleTotal] = useState(0);
  const [articlePage, setArticlePage] = useState(1);
  useEffect(() => {
    axios
      .get(`/article/search/${articlePage}`, {
        params: { state: 1, author: router.query.id },
      })
      .then(res => {
        setArticleDetdata(_data => [..._data, ...res.data.data.list]);
        setArticleTotal(res.data.data.total);
      });
  }, [articlePage]);

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
        items={[
          {
            label: "文章",
            key: "article",
            children: (
              <ArticleList
                list={articleData}
                total={articleTotal}
                loadMoreData={() => setArticlePage(_page => ++_page)}
              />
            ),
          },
          {
            label: "收藏集",
            key: "collection",
            children: <Favorites />,
          },
          {
            label: "关注",
            key: "following",
            children: (
              <FollowList
                loadMoreData={(page, setTotal, setData) => {
                  axios
                    .get(`/following/${router.query.id}`, { params: { page: page } })
                    .then(res => {
                      setTotal(res.data.data.total);
                      setData(_data => [..._data, ...res.data.data.list]);
                    });
                }}
              />
            ),
          },
          {
            label: "关注者",
            key: "follower",
            children: (
              <FollowList
                loadMoreData={(page, setTotal, setData) => {
                  axios
                    .get(`/follower/${router.query.id}`, { params: { page: page } })
                    .then(res => {
                      setTotal(res.data.data.total);
                      setData(_data => [..._data, ...res.data.data.list]);
                    });
                }}
              />
            ),
          },
        ]}
      ></Tabs>
    </>
  );
};
export default Main;
