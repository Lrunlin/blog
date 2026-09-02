import { startTransition, useEffect, useRef, useState } from "react";
import type { FC } from "react";
import { Divider, Empty, Result, Skeleton } from "antd";
import axios from "@axios";
import type { response } from "@type/common/response";
import type { articleListItemType } from "@type/model/article-list-item";
import InfiniteScroll from "react-infinite-scroll-component";
import useUserData from "@/store/user/user-data";
import ArticleListItem from "./ArticleListItem";

interface propsType {
  /** 查询的文章状态*/
  state: number;
  /** 查询使用的文章关键字*/
  keyword: string;
}
/** 内容管理文章管理组件（文章、草稿箱）*/
const ContentArticleList: FC<propsType> = ({ state, keyword }) => {
  let userData = useUserData((s) => s.data);
  let [page, setPage] = useState(1);
  let [data, setData] = useState<articleListItemType[]>([]);
  let [total, setTotal] = useState(-1);
  let [, setError] = useState(false);
  let [isValidating, setIsValidating] = useState(true);

  let _keyword = useRef<string | undefined>(keyword); //保留上一次关键词

  // 当关键词变化时重置页码
  useEffect(() => {
    if (_keyword.current !== keyword) {
      setPage(1);
      _keyword.current = keyword;
    }
  }, [keyword]);

  useEffect(() => {
    setIsValidating(true);
    axios
      .get<response<{ total: number; list: articleListItemType[] }>>(
        `/article/search/${page}`,
        {
          params: {
            author: userData?.id,
            state: state,
            keyword: keyword,
          },
        },
      )
      .then((res) => {
        let list = res.data.data.list;
        setData((_data) => (page == 1 ? list : [..._data, ...list]));
        startTransition(() => {
          setTotal(res.data.data.total);
        });
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsValidating(false);
      });
  }, [page, keyword, state, userData?.id]);

  return (
    <>
      {isValidating && page === 1 ? (
        <Skeleton avatar paragraph={{ rows: 2 }} active />
      ) : data ? (
        <>
          {data.length ? (
            <>
              <InfiniteScroll
                dataLength={data.length}
                next={() => {
                  setPage((prevPage) => prevPage + 1);
                }}
                hasMore={data.length < total}
                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                endMessage={<Divider plain>到底啦 ~ ~ 🤐</Divider>}
              >
                <ul className="w-full p-0">
                  {data.map((item) => (
                    <ArticleListItem
                      key={`article-list-author-${item.id}`}
                      data={item}
                      dispatch={{ setData: setData, setTotal: setTotal }}
                    />
                  ))}
                </ul>
              </InfiniteScroll>
            </>
          ) : (
            <div className="bg-white py-32">
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </div>
          )}
        </>
      ) : (
        <Result status="error" title="请求错误" />
      )}
    </>
  );
};
export default ContentArticleList;
