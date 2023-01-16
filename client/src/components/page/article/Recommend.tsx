import { Skeleton, Result } from "antd";
import { useSearchParams } from "next/navigation";
import uswSwr from "swr";
import axios from "axios";
import ArticleList from "@/components/common/ArticleList";
import type { response } from "@type/response";
import type { articleListItemType } from "@type/article-list-item";

/** 文章页面底部的推荐文章*/
const Recommend = () => {
  let searchParams = useSearchParams();
  let articleID = searchParams.get("id");
  let { data, isValidating } = uswSwr(`/article/recommend/${articleID}`, () =>
    axios
      .get<response<articleListItemType[]>>(`/article/recommend/${articleID}`)
      .then(res => res.data.data)
  );
  return (
    // 1160-16(margin right)-240(aside width)
    <div className="max-w-[904px]">
      {data ? (
        <ArticleList
          className="mt-4 shadow-sm"
          list={data}
          total={data.length}
          loadMoreData={() => {}}
        />
      ) : isValidating ? (
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
