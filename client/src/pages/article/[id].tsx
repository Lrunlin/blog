import type { NextPage, GetServerSideProps } from "next";
import css from "styled-jsx/css";
import Layout from "@/layout/Main";
import { getArticleData } from "@/request";
import type { article } from "@/types";
import Comment from "@/components/common/Comment";
import NotFound from "@/components/article/NotFound";
import Article from "@/components/article/Article";

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
    <Layout styleJsx={propsStyle}>
      {data ? (
        <>
          <Article data={data as article} />
          <Comment articleId={(data as article).id + ""} />
        </>
      ) : (
        <NotFound />
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  let rows = await getArticleData(context?.params?.id as string, true);
  if (!rows) {
    context.res.statusCode = 404;
  }

  return {
    props: {
      data: rows,
    },
  };
};

export default NextPageName;
