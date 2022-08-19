import type { GetServerSideProps, NextPage } from "next";
import { Avatar } from "antd";
import axios from "axios";
import moment from "moment";
import Layout from "@/components/page/article/Layout";
import Head from "@/components/next/Head";
import FollwoButton from "@/components/page/article/FollwoButton";
import type { ArticleAttributes } from "@type/model-attribute";

interface propsType {
  data: ArticleAttributes;
}
const Article: NextPage<propsType> = props => {
  let { data } = props;
  return (
    <>
      <Head
        title={data.title}
        keywords={[
          process.env.SITE_NAME,
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
            <Avatar src={data.author_data.avatar_url} alt={`作者${data.author_data.name}头像`} />
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
        <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
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
  let response = await axios(`/article/${(ctx as any).params.id}`).then(res => res.data.data);
  return {
    props: {
      data: response,
    },
  };
};
