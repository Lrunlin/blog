import type { NextPage, GetServerSideProps } from "next";
import css from "styled-jsx/css";
import Layout from "@/layout/Main";
import { getArticleData } from "@/request";
import type { article } from "@/types";
import Comment from "@/components/common/Comment";
import NotFound from "@/components/article/NotFound";
import Article from "@/components/article/Article";
import Head from "next/head";

interface propsTypes {
  data: article | null;
}

const propsStyle = css.resolve`
  .container {
    display: flex;
    justify-content: space-between;
    align-content: flex-start;
  }
`;

const NextPageName: NextPage<propsTypes> = props => {
  let data = props.data;

  return (
    <>
      <Layout styleJsx={propsStyle}>
        {data ? (
          <>
            <Head>
              <link rel="canonical" href={`https://blogweb.cn/article/${data.id}`} />
            </Head>
            <Article data={data as article} />
            <Comment articleId={(data as article).id + ""} />
          </>
        ) : (
          <NotFound />
        )}
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  let id = context?.params?.id as string;
  let rows = await getArticleData(id);

  if (!rows) {
    context.res.statusCode = 404;
  }

  if ((rows as article).id + "" != id) {
    return {
      redirect: {
        destination: `/article/${(rows as article).id}`,
        permanent: true,
      },
    };
  }

  return {
    props: {
      data: rows,
    },
  };
};

export default NextPageName;
