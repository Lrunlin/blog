import { memo } from "react";
import type { FunctionComponent } from "react";
import { Skeleton } from "antd";
import cl from "classnames";
import { MessageFilled, EyeOutlined } from "@ant-design/icons";
import css from "styled-jsx/css";
import ArticleImage from "./ArticleImage";
import ArticleLink from "./ArticleLink";
import NoSSR from "@/utils/NoSSR";
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

  .introduce {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
    line-height: 24px;
    color: #333;
  }
  .introduce:hover {
    opacity: 0.7;
    transition: 0.3s;
  }
  .article-footer {
    color: #939393;
    .article-footer_data {
      margin-left: 5px;
    }
  }
  .article-has_image {
    .introduce {
      margin-left: 20px;
      -webkit-line-clamp: 4;
      margin-top: -5px;
    }
  }
`;

/** 单个文章展示组件*/
const ArticleItem: FunctionComponent<articlePageTypes> = memo(props => {
  return (
    <>
      <style jsx>{Style}</style>
      <article className={cl([props.image && "article-has_image"])}>
        <ArticleLink children={<h2>{props.title}</h2>} router={props.router} />
        <div className="article-body">
          <If if={props.image}>
            <ArticleLink router={props.router}>
              <ArticleImage image={props.image} title={props.title} />
            </ArticleLink>
          </If>
          <NoSSR onLoad={<Skeleton />}>
            <ArticleLink router={props.router}>
              <div className="introduce">{props.introduce}</div>
            </ArticleLink>
          </NoSSR>
        </div>
        <div className="article-footer">
          <span>
            <NoSSR children={<EyeOutlined />} />
            <span className="article-footer_data">{props.view_count}人阅读</span>
          </span>
          <span style={{ marginLeft: "10px" }}>
            <NoSSR children={<MessageFilled />} />
            <span className="article-footer_data">{props.comment_count}条留言</span>
          </span>
          <time style={{ marginLeft: "20px" }}>{(props.time + "").substring(0, 10)}</time>
        </div>
      </article>
    </>
  );
});
export default ArticleItem;
