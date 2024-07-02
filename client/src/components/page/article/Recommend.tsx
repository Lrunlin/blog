"use client";

import { useParams } from "next/navigation";
import { Result, Skeleton } from "antd";
import axios from "@axios";
import type { response } from "@type/common/response";
import type { articleListItemType } from "@type/model/article-list-item";
import useFetch from "@/common/hooks/useFetch";
import ArticleList from "@/components/common/ArticleList";

/** 文章页面底部的推荐文章*/
const Recommend = () => {
  let params = useParams();
  let articleID = params.id;

  let { data, isLoading } = useFetch(() =>
    axios
      .get<response<articleListItemType[]>>(`/article/recommend/${articleID}`)
      .then((res) => res.data.data),
  );
  return (
    <div>
      {data ? (
        <ArticleList
          className="mt-4 shadow-sm"
          list={data}
          total={data.length}
          loadMoreData={() => {}}
        />
      ) : isLoading ? (
        <>
          <Skeleton active />
          <Skeleton active />
        </>
      ) : (
        <div className="bg-white">
          <Result status="error" title="文章获取失败" />
        </div>
      )}
    </div>
  );
};
export default Recommend;
