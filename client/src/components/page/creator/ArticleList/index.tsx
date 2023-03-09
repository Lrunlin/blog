import { useState, useEffect, startTransition, useRef } from "react";
import type { FC } from "react";
import useUserData from "@/store/user-data";
import { Skeleton, Divider, Empty, Result } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import type { articleListItemType } from "@type/model/article-list-item";
import type { response } from "@type/common/response";
import axios from "axios";
import ArticleListItem from "./ArticleListItem";

interface propsType {
  /** 查询的文章状态*/
  state: number;
  /** 查询使用的文章关键字*/
  keyword: string;
}
/** 内容管理文章管理组件（文章、草稿箱）*/
const ContentArticleList: FC<propsType> = ({ state, keyword }) => {
  let [userData] = useUserData();
  let [page, setPage] = useState(1);
  let [data, setData] = useState<articleListItemType[]>([]);
  let [total, setTotal] = useState(-1);
  let [, setError] = useState(false);
  let [isValidating, setIsValidating] = useState(true);

  let _keyword = useRef<string | undefined>(keyword); //保留上一次关键词
  useEffect(() => {
    let _page = _keyword.current == keyword ? page : 1;
    axios
      .get<response<{ total: number; list: articleListItemType[] }>>(`/article/search/${_page}`, {
        params: {
          author: userData?.id,
          state: state,
          keyword: keyword,
        },
      })
      .then(res => {
        let list = res.data.data.list;
        setData(_data => (_page == 1 ? list : [...data, ...list]));
        startTransition(() => {
          setTotal(res.data.data.total);
        });
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setIsValidating(false);
        _keyword.current = /^[\s\S]*.*[^\s][\s\S]*$/.test(keyword) ? keyword : undefined;
      });
  }, [page, keyword]);

  return (
    <>
      {isValidating ? (
        <Skeleton avatar paragraph={{ rows: 2 }} active />
      ) : data ? (
        <>
          {data.length ? (
            <>
              <InfiniteScroll
                dataLength={data.length}
                next={() => {
                  setPage(_page => ++page);
                }}
                hasMore={data.length < total}
                loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
                endMessage={<Divider plain>到底啦 ~ ~ 🤐</Divider>}
              >
                <ul className="p-0 w-full">
                  {data.map(item => (
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
