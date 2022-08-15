import { useState, useRef } from "react";
import type { NextPage, GetServerSideProps } from "next";
import { env } from "process";

import Head from "@/components/next/Head";

import Layout from "@/components/page/index/Layout";
import ArticleList from "@/components/common/ArticleList";
import TypeHeader from "@/components/page/index/TypeHeader/index";
import TypeSelect from "@/components/page/index/TypeSelect";

import getTypeTreeIndex, { responseType as typeTreeRsponseType } from "@/request/type-tree-index";
import getArticleList, { responseType as articleListResponseType } from "@/request/article-list";
import getAdvertisementList, { responseType as advertisementType } from "@/request/advertisement";

interface propsType {
  type: typeTreeRsponseType[];
  article_list: articleListResponseType;
  advertisement: advertisementType;
}
const Home: NextPage<propsType> = props => {
  /** 文章总数*/
  let [total, setTotal] = useState(props.article_list.total);
  /** 文章数据信息*/
  let [list, setList] = useState<articleListResponseType["list"]>(props.article_list.list);

  let page = useRef(1);
  let requeseURL = useRef("/article/list/recommend");
  let type = useRef("recommend");

  function loadMoreData() {
    getArticleList(requeseURL.current, page.current, type.current as any).then(data => {
      if (page.current == 1) {
        setList(data.list);
      } else {
        setList(_list => [...list, ...data.list]);
      }
      setTotal(data.total);
    });
  }
  return (
    <>
      <Head
        title={env.SITE_NAME}
        description={`${env.SITE_NAME}是面向中文开发者的技术内容分享与交流平台。我们通过技术文章、问答服务，打造一个激发开发者创作灵感，激励开发者沉淀分享，陪伴开发者成长的综合类技术社区。`}
        keywords={[env.SITE_NAME, "博客,前端开发,WEB,博客社区"]}
      />
      <Layout
        brow={
          <TypeHeader
            data={props.type}
            loadMoreData={url => {
              requeseURL.current = url;
              page.current = 1;
              loadMoreData();
            }}
          />
        }
        advertisement={(props as any).advertisement}
      >
        <TypeSelect
          loadMoreData={_type => {
            type.current = _type;
            page.current = 1;
            loadMoreData();
          }}
        />
        <ArticleList
          list={list}
          total={total}
          loadMoreData={() => {
            page.current++;
            loadMoreData();
          }}
        />
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  let reponse = await Promise.all([
    getTypeTreeIndex(),
    getArticleList("/article/list/recommend", 1, "recommend"),
    getAdvertisementList(),
  ]);

  return {
    props: {
      type: reponse[0],
      article_list: reponse[1],
      advertisement: reponse[2],
    },
  };
};
export default Home;
