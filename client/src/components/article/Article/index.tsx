import { FunctionComponent } from "react";
import { useRouter } from "next/router";
import css from "styled-jsx/css";
import Head from "@/utils/Head";
import useLazyLoad from "@/hooks/useLazyLoad";
import type { article } from "@/types";
import UserFace from "@/components/common/UserFace";
import CodeStyle from "@/style/CodeStyle";
import Statistics from "@/components/common/Statistics";
import Preview from './Preview';

interface articleProps {
  data: article;
}
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
      <style jsx>{Style}</style>
      <style jsx global>{`
        .article-details img {
          max-width: 80%;
          display: block;
          margin: 0px auto;
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
      <CodeStyle />
      <article
        className="article-data article-container_item article-details"
        dangerouslySetInnerHTML={{ __html: data.article }}
      ></article>
      <Preview />
      <Statistics type={data.type + ""} id={data.id} />
    </>
  );
};
export default Article;