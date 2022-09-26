import { useEffect } from "react";
import type { GetServerSideProps, NextPage } from "next";
import { atom, useSetRecoilState, useResetRecoilState } from "recoil";
import { Button, Result } from "antd";
import axios from "axios";
import Layout from "@/components/page/article/Layout";
import Head from "@/components/next/Head";
import View from "@/components/page/article/View";
import type { ArticleAttributes } from "@type/model-attribute";
import { useRouter } from "next/router";
import Header from "@/components/common/Header";
import dynamic from "next/dynamic";
const ArticleUserData = dynamic(import("@/components/page/article/UserData"), { ssr: false });
const Reprint = dynamic(import("@/components/page/article/Reprint"), { ssr: false });

interface propsType {
  data: ArticleAttributes | null;
}
export const currentArticleDataContext = atom<ArticleAttributes>({
  key: "current-article-data",
  default: {} as ArticleAttributes,
});
const Article: NextPage<propsType> = props => {
  let router = useRouter();
  if (!props.data) {
    return (
      <>
        <Head title="没找到该篇文章" keywords={["404"]} description="Not Found" />
        <Header />
        <Result
          status="404"
          title="404"
          subTitle="没找到该篇文章"
          extra={
            <Button type="primary" onClick={() => router.replace("/")}>
              返回主页
            </Button>
          }
        />
      </>
    );
  }
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
        <h1 className="text-4xl font-black">{data.title}</h1>
        <div className="mb-4 flex items-center justify-between">
          <ArticleUserData />
        </div>
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
