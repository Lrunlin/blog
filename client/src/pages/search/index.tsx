import { useState, Fragment, useEffect } from "react";
import type { GetServerSideProps, NextPage } from "next";
import Layout from "@/layout/Base";
import axios from "axios";
import ArticleList from "@/components/common/ArticleList";
import type { articleListItemType } from "@type/article-list-item";

interface propsType {
  keyword?: string;
}
const Search: NextPage<propsType> = ({ keyword }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<articleListItemType[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios
      .get(`/article/list/page/${page}`, {
        params: {
          state: 1,
          keyword: keyword,
        },
      })
      .then(res => {
        setData(_data => [...data, ...res.data.data.list]);
        setTotal(res.data.data.total);
      });
  }, [page]);

  return (
    <Layout className="container-xs">
      <div className="w-full">
        <ArticleList
          keyword={keyword}
          list={data}
          total={total}
          loadMoreData={() => setPage(_page => ++_page)}
        />
      </div>
    </Layout>
  );
};
export default Search;
export const getServerSideProps: GetServerSideProps = async ctx => {
  return {
    props: {
      keyword: ctx.query.keyword,
    },
  };
};
