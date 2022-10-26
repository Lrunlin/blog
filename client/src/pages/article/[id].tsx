import dynamic from "next/dynamic";
import type { GetServerSideProps, NextPage } from "next";
import { useEffect } from "react";
import { atom, useSetRecoilState, useResetRecoilState } from "recoil";
import axios from "axios";
import Head from "@/components/next/Head";
import Layout from "@/components/page/article/Layout";
import View from "@/components/page/article/View";
import ArticleUserData from "@/components/page/article/UserData";
import type { ArticleAttributes } from "@type/model-attribute";
import NoFound from "@/components/page/article/NoFound";
const Reprint = dynamic(import("@/components/page/article/Reprint"), { ssr: false });

interface propsType {
  data: ArticleAttributes | null;
}
export const currentArticleDataContext = atom<ArticleAttributes>({
  key: "current-article-data",
  default: {} as ArticleAttributes,
});
const Article: NextPage<propsType> = props => {
  if (!props.data) return <NoFound />;
  let { data } = props;
  let setCurrentArticleData = useSetRecoilState(currentArticleDataContext);
  let resetCurrentArticleData = useResetRecoilState(currentArticleDataContext);
  useEffect(() => {
    setCurrentArticleData(data);
    return () => {
      resetCurrentArticleData();
    };
  }, [data]);

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
      <Layout>
        <h1 className="text-4xl font-semibold">{data.title}</h1>
        <ArticleUserData data={data} />
        <View language={data.language} content={data.content} />
        <Reprint reprint={data.reprint} />
      </Layout>
    </>
  );
};
export default Article;

export const getServerSideProps: GetServerSideProps = async ctx => {
  let response = await axios(`/article/${(ctx as any).params.id}`)
    .then(res => res.data.data)
    .catch(() => null);
  if (!response) {
    ctx.res.statusCode = 404;
  }
  return {
    props: {
      data: response,
    },
  };
};
