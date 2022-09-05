import { useEffect } from "react";
import type { GetServerSideProps, NextPage } from "next";
import { atom, useSetRecoilState, useResetRecoilState } from "recoil";
import { Avatar, Button, Result } from "antd";
import axios from "axios";
import moment from "moment";
import Layout from "@/components/page/article/Layout";
import Head from "@/components/next/Head";
import FollwoButton from "@/components/page/article/FollowButton";
import View from "@/components/page/article/View";
import type { ArticleAttributes } from "@type/model-attribute";
import { useRouter } from "next/router";
import Header from "@/components/common/Header";

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
        title={data.title}
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
          <div className="flex items-center">
            <span onClick={() => router.push(`/user/${data.author_data.id}`)}>
              <Avatar
                src={data.author_data.avatar_url}
                alt={`作者${data.author_data.name}头像`}
                className="cursor-pointer"
              />
            </span>
            <div className="ml-2">
              <div>{data.author_data.name}</div>
              <div>
                <time>{moment(data.create_time).format("YYYY年MM月DD日 hh:mm")}</time>
                <span> · 阅读数 {data.view_count}</span>
              </div>
            </div>
          </div>
          <FollwoButton bloggerID={data.author_data.id} />
        </div>
        <View language={data.language} content={data.content} />
        {data.reprint && (
          <blockquote className="mt-20 pl-4 border-l-solid border-l-4 rounded-sm border-l-blue-600">
            转载自:{data.reprint}
          </blockquote>
        )}
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
