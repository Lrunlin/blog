import { memo } from "react";
import type { FunctionComponent } from "react";
import cl from "classnames";
import css from "styled-jsx/css";
import ArticleImage from "./ArticleImage";
import ArticleLink from "./ArticleLink";
import ArticleIntroduce from "./ArticleIntroduce";
import ArticleFooter from "./ArticleFooter";
import If from "@/utils/If";
import { articlePageTypes } from "@/types";

const Style = css`
  article {
    display: block;
    background-color: white;
    padding: 16px 20px;
    border-bottom: 1px solid #f2f2f2;
  }
  h2 {
    font-weight: 600;
    font-size: 18px;
  }
  .article-body {
    display: flex;
    align-items: flex-start;
  }
`;

/** 单个文章展示组件*/
const ArticleItem: FunctionComponent<articlePageTypes> = memo(props => {
  return (
    <>
      <style jsx>{Style}</style>
      <article className={cl([props.image && "article-has_image"])}>
        <ArticleLink id={props.id}>
          <h2>{props.title}</h2>
        </ArticleLink>
        <div className="article-body">
          <If if={props.image}>
            <ArticleLink id={props.id}>
              <ArticleImage image={props.image} title={props.title} />
            </ArticleLink>
          </If>
          <ArticleLink id={props.id}>
            <ArticleIntroduce introduce={props.introduce} hasImage={!!props.image} />
          </ArticleLink>
        </div>
        <ArticleFooter
          view_count={props.view_count}
          comment_count={props.comment_count}
          time={(props.time + "").substring(0, 10)}
        />
      </article>
    </>
  );
});
export default ArticleItem;
