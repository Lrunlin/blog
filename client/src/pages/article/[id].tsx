import dynamic from "next/dynamic";
import type { GetServerSideProps, NextPage } from "next";

import axios from "@axios";
import Head from "@/components/next/Head";
import Layout from "@/components/page/article/Layout";
import View from "@/components/page/article/View";
import ArticleUserData from "@/components/page/article/UserData";
import type { ArticleAttributes } from "@type/model-attribute";
const NoFound = dynamic(() => import("@/components/page/article/NoFound"), { ssr: false });
const Reprint = dynamic(import("@/components/page/article/Reprint"), { ssr: false });
import readingRecords from "@/common/modules/readingRecords/readingRecords";
import { parse } from "cookie";
import StyleLink from "@/components/common/Editor/StyleLink";
import userUserCurrentArticleData from "@/store/user/user-current-article-data";
import { useEffect } from "react";

interface propsType {
  data: ArticleAttributes | null;
}

const Article: NextPage<propsType> = ({ data }) => {
  if (!data) return <NoFound />;
  let setUserCurrentArticleData = userUserCurrentArticleData(s => s.setArticleData);
  let resetUserCurrentArticleData = userUserCurrentArticleData(s => s.resetData);

  useEffect(() => {
    setUserCurrentArticleData(data);
    return () => {
      resetUserCurrentArticleData();
    };
  }, []);

  return (
    <>
      <Head
        title={`${data.title}-${process.env.NEXT_PUBLIC_SITE_NAME}`}
        keywords={[
          process.env.NEXT_PUBLIC_SITE_NAME,
          "技术文章",
          "博客社区",
          ...data.tag.map(item => item.name),
        ]}
        description={data.description}
      />
      <StyleLink id={data.theme_id} />
      <Layout language={data.language}>
        <h1 className="text-4xl font-semibold">{data.title}</h1>
        <ArticleUserData data={data} type="article" />
        <View content={data.content} />
        <Reprint reprint={data.reprint} />
      </Layout>
    </>
  );
};
export default Article;

export const getServerSideProps: GetServerSideProps = async ctx => {
  let { token } = parse(ctx?.req?.headers?.cookie + "");
  let response = await axios(`/article/${(ctx as any).params.id}`, {
    headers: { authorization: token || "" },
  })
    .then(res => res.data.data)
    .catch(err => null);

  if (!response) {
    ctx.res.statusCode = 404;
  } else {
    if (ctx.req.url?.startsWith("/article/")) {
      readingRecords(ctx);
    }
  }
  return {
    props: {
      data: response,
    },
  };
};
