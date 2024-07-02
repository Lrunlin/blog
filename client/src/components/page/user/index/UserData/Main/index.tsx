import { useCallback, useEffect, useMemo, useState } from "react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { Tabs } from "antd";
import axios from "@axios";
import ArticleList from "@/components/common/ArticleList";
import Favorites from "./Favorites";
import FollowList from "./FollowList";

const Main = () => {
  let router = useRouter();
  let params = useParams();
  let searchParams = useSearchParams();
  let id = params.id;
  let key = searchParams.get("key");
  const pathname = usePathname();

  const [articleData, setArticleDetdata] = useState<any[]>([]);
  const [articleTotal, setArticleTotal] = useState(0);
  const [articlePage, setArticlePage] = useState(1);

  useEffect(() => {
    axios
      .get(`/article/search/${articlePage}`, {
        params: { state: 1, author: id },
      })
      .then((res) => {
        setArticleDetdata((_data) => [..._data, ...res.data.data.list]);
        setArticleTotal(res.data.data.total);
      });
  }, [articlePage]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  let activeKey = useMemo(() => (key as string) || "article", [searchParams]);
  return (
    <>
      <Tabs
        activeKey={activeKey}
        onChange={(key) => {
          router.push(pathname + "?" + createQueryString("key", key));
        }}
        items={[
          {
            label: "文章",
            key: "article",
            children: (
              <ArticleList
                list={articleData}
                total={articleTotal}
                loadMoreData={() => setArticlePage((_page) => ++_page)}
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
                    .get(`/following/${id}`, { params: { page: page } })
                    .then((res) => {
                      setTotal(res.data.data.total);
                      setData((_data) => [..._data, ...res.data.data.list]);
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
                    .get(`/follower/${id}`, { params: { page: page } })
                    .then((res) => {
                      setTotal(res.data.data.total);
                      setData((_data) => [..._data, ...res.data.data.list]);
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
