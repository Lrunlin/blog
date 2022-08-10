import { useState, Fragment } from "react";
import { Skeleton } from "antd";
import { useRouter } from "next/router";
import uswSwr from "swr";
import axios from "axios";
import ArticleList from "@/components/common/ArticleList";
import type { response } from "@type/response";
import type { articleListItemType } from "@type/article-list-item";

const Recommend = () => {
  let router = useRouter();
  let articleID = router.query.id;
  let { data, isValidating } = uswSwr(`/article/recommend/${articleID}`, () =>
    axios
      .get<response<articleListItemType[]>>(`/article/recommend/${articleID}`)
      .then(res => res.data.data)
  );
  return (
    <>
      {data && <ArticleList className="mt-4" list={data} total={25} loadMoreData={() => {}} />}
      {isValidating && (
        <>
          <Skeleton active />
          <Skeleton active />
        </>
      )}
    </>
  );
};
export default Recommend;
