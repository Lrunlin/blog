import { FunctionComponent } from "react";
import type { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import css from "styled-jsx/css";
import Layout from "@/layout/Main";
import Head from "@/utils/Head";
import useLazyLoad from "@/hooks/useLazyLoad";
import { getArticleData } from "@/request";
import type { article } from "@/types";
import UserFace from "@/components/common/UserFace";
import Comment from "@/components/common/Comment";
import CodeStyle from "@/style/CodeStyle";
import NotFound from "@/components/article/NotFound";

interface propsTypes {
  data: article | null;
}
interface articleProps {
  data: article;
}

const propsStyle = css.resolve`
  .container {
    display: flex;
    justify-content: space-between;
    align-content: flex-start;
  }
`;

const Style = css`
  .article-container_item {
    background-color: white;
    padding: 16px 20px;
    flex-grow: 1; /*铺满剩余空间*/
  }
  .article-header {
    height: 130px;
  }
  .article-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
  }
  .article-data_author {
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 13px;
    color: #939393;
    span {
      margin-left: 20px;
    }
  }
  .article-data {
    margin-top: 10px;
    position: relative;
    p {
      margin: 0px;
    }
  }
  .article-user-face_container {
    display: flex;
    align-items: center;
  }
`;

const Article: FunctionComponent<articleProps> = props => {
  let data = props.data;
  let router = useRouter();
  useLazyLoad("article img");
  return (
    <>
      <Head
        title={`${data.title}-前端路上`}
        description={data.introduce.substring(0, 100)}
        keyword={data.type}
      />
      <CodeStyle />
      <style jsx>{Style}</style>
      <style jsx global>{`
        .article-details img {
          max-width: 80%;
        }
        .article-user-face {
          border-radius: 50%;
        }
        article p {
          margin-bottom: 8px;
        }
      `}</style>
      <div className="article-header article-container_item">
        <h1 className="article-title">{data.title}</h1>
        <div className="article-data_author">
          <div
            onClick={() => router.push(`/user/${data.author}`)}
            className="article-user-face_container"
          >
            <UserFace userId={data.author} height={30} className="article-user-face" width={30} />
            <span>{data.author == "admin" ? "管理员" : data.author}</span>
            <span>{data.view_count}阅读</span>
          </div>
          <time>发布于{(data.time + "").substring(0, 10)}</time>
        </div>
      </div>
      <article
        className="article-data article-container_item article-details"
        dangerouslySetInnerHTML={{ __html: data.article }}
      ></article>
    </>
  );
};

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

  return {
    props: {
      data: rows,
    },
  };
};

export default NextPageName;
