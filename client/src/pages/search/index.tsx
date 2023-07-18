import { useState, useEffect, useRef } from "react";
import type { NextPage } from "next";
import { useSearchParams } from "next/navigation";
import { Spin } from "antd";
import axios from "axios";
import Head from "@/components/next/Head";
import Layout from "@/layout/Base";
import ArticleList from "@/components/common/ArticleList";
import type { articleListItemType } from "@type/model/article-list-item";
import Highlighter from "react-highlight-words";

const Search: NextPage = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<articleListItemType[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  let searchParams = useSearchParams();

  let first = useRef(true);
  useEffect(() => {
    if (first.current) {
      setIsLoading(true);
      first.current = false;
    }
    axios
      .get(`/article/search/${page}`, {
        params: {
          state: 1,
          keyword: searchParams!.get("keyword") || undefined,
          tag: searchParams!.get("tag") || undefined,
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
  }, [page, searchParams]);

  return (
    <Layout className="container-xs">
      <Head title="文章搜索" />
      <div className="w-full bg-white">
        <Spin tip="Loading..." spinning={isLoading}>
          <ArticleList
            list={data}
            total={total}
            loadMoreData={() => setPage(_page => ++_page)}
            titleKeyword={title => {
              return (
                <Highlighter
                  highlightClassName="p-0 bg-white text-red-500"
                  searchWords={[searchParams!.get("keyword") as string]}
                  autoEscape={true}
                  textToHighlight={title}
                />
              );
            }}
          />
        </Spin>
      </div>
    </Layout>
  );
};
export default Search;
