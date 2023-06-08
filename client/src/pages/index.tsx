import { useState, useRef } from "react";
import type { NextPage, GetServerSideProps } from "next";
import { message, Spin } from "antd";
import Head from "@/components/next/Head";

import Layout from "@/components/page/index/Layout";
import ArticleList from "@/components/common/ArticleList";
import TypeHeader from "@/components/page/index/TypeHeader";
import SortSelect from "@/components/page/index/SortSelect";
import getTypeTreeIndex, {
  responseType as typeTreeRsponseType,
} from "@/request/type/type-tree-index";
import getArticleList, {
  responseType as articleListResponseType,
  sortType,
} from "@/request/article/article-list";

interface optionType {
  type?: number | string;
  tag?: number | string;
  follow?: true;
  sort: sortType;
}

interface propsType {
  type: typeTreeRsponseType[];
  article_list: articleListResponseType;
}
const Home: NextPage<propsType> = props => {
  /** 文章总数*/
  let [total, setTotal] = useState(props.article_list.total);
  /** 文章数据信息*/
  let [list, setList] = useState<articleListResponseType["list"]>(props.article_list.list);
  /** 判断是否在加载中*/
  const [isLoading, setIsLoading] = useState(false);

  let page = useRef(1);
  let option = useRef<optionType>({ sort: "recommend" });

  /** 取消请求函数，每次请求数据时设置上，下次请求时运行*/
  let cancel = useRef<() => void>();
  function loadMoreData() {
    cancel.current && cancel.current();
    if (page.current == 1) setIsLoading(true);
    getArticleList(page.current, option.current, cancelFunction => {
      cancel.current = cancelFunction;
    })
      .then(data => {
        if (page.current == 1) {
          setList(data.list);
        } else {
          setList(_list => [...list, ...data.list]);
        }
        setTotal(data.total);
      })
      .catch(() => {
        message.error("请求错误");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  return (
    <>
      <Head
        title={`${process.env.NEXT_PUBLIC_SITE_NAME}-技术社区`}
        description={`${process.env.NEXT_PUBLIC_SITE_NAME}是面向中文开发者的技术内容分享与交流平台。我们通过技术文章、问答服务，打造一个激发开发者创作灵感，激励开发者沉淀分享，陪伴开发者成长的综合类技术社区。`}
        keywords={[process.env.NEXT_PUBLIC_SITE_NAME, "技术社区,博客,前端开发,WEB"]}
      />
      <Layout
        brow={
          <TypeHeader
            data={props.type}
            change={({ type, tag, follow }) => {
              option.current.tag = tag;
              option.current.type = type;
              option.current.follow = follow;
              page.current = 1;
              loadMoreData();
            }}
          />
        }
      >
        <SortSelect
          change={sort => {
            option.current.sort = sort as sortType;
            page.current = 1;
            loadMoreData();
          }}
        />
        <Spin tip="加载中..." spinning={isLoading}>
          <ArticleList
            list={list}
            total={total}
            className="shadow-sm w-full"
            loadMoreData={() => {
              page.current++;
              loadMoreData();
            }}
          />
        </Spin>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  let reponse = await Promise.all([getTypeTreeIndex(), getArticleList(1, { sort: "recommend" })]);

  return {
    props: {
      type: reponse[0],
      article_list: reponse[1],
    },
  };
};
export default Home;
