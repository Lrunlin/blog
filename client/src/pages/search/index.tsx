import { useState, useEffect, useRef } from "react";
import { Spin } from "antd";
import type { NextPage } from "next";
import Layout from "@/layout/Base";
import axios from "axios";
import ArticleList from "@/components/common/ArticleList";
import type { articleListItemType } from "@type/article-list-item";
import { useRouter } from "next/router";

const Search: NextPage = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<articleListItemType[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  let router = useRouter();
  let { keyword, tag } = router.query as { keyword?: string; tag?: string };

  let first = useRef(true);
  useEffect(() => {
    if (first.current) {
      setIsLoading(true);
      first.current = false;
    }
    axios
      .get(`/article/list/page/${page}`, {
        params: {
          state: 1,
          keyword: keyword || undefined,
          tag: tag || undefined,
        },
      })
      .then(res => {
        if (page == 1) {
          setData(res.data.data.list);
        } else {
          setData(_data => [...data, ...res.data.data.list]);
        }
        setTotal(res.data.data.total);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, router.query]);

  return (
    <Layout className="container-xs">
      <div className="w-full bg-white">
        <Spin tip="Loading..." spinning={isLoading}>
          <ArticleList
            keyword={keyword}
            list={data}
            total={total}
            loadMoreData={() => setPage(_page => ++_page)}
          />
        </Spin>
      </div>
    </Layout>
  );
};
export default Search;
