import { memo } from "react";
import type { FunctionComponent } from "react";
import { articlePageTypes } from "@/types";
import css from "styled-jsx/css";
import { Image } from "antd";
import { LoadingOutlined, MessageFilled, EyeOutlined } from "@ant-design/icons";
import cl from "classnames";
import Link from "next/link";
import NoSSR from "@/utils/NoSSR";
import If from "@/utils/If";

interface propsTypes {
  data: articlePageTypes[];
}
/** 文章展示图片*/
interface ArticleImageTypes {
  image: false | string;
  title: string;
}

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

/** 文章图片 需要在外部提前判断是否需要渲染（内部断言image为string）*/
const ArticleImage: FunctionComponent<ArticleImageTypes> = props => {
  /** 图片加载时占位*/
  const ImagePlaceholder = () => (
    <>
      <style jsx>{`
        .image-placeholder {
          width: 169px;
          height: 98px;
          text-align: center;
          line-height: 98px;
          border: 1px solid #f2f2f2;
        }
      `}</style>
      <div className="image-placeholder">
        <NoSSR children={<LoadingOutlined />} />
      </div>
    </>
  );
  return (
    <>
      <span>
        <Image
          width={168}
          height={98}
          preview={false}
          src={props.image as string}
          alt={props.title}
          fallback={`data:image/png;base64,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`}
          placeholder={<ImagePlaceholder />}
        />
      </span>
    </>
  );
};

/** 单个文章展示组件*/
const ArticleItem: FunctionComponent<articlePageTypes> = props => {
  /** 文章跳转的超链接标签*/
  const ArticleLink: FunctionComponent = articleLinkProps => {
    return (
      <>
        <style jsx>{`
          a {
            color: inherit;
          }
        `}</style>
        <Link href={`/article/${props.router}`}>
          <a>{articleLinkProps.children}</a>
        </Link>
      </>
    );
  };

  return (
    <>
      <style jsx>{Style}</style>
      <article className={cl([props.image && "article-has_image"])}>
        <ArticleLink children={<h2>{props.title}</h2>} />
        <div className="article-body">
          <If if={props.image}>
            <ArticleLink>
              <ArticleImage image={props.image} title={props.title} />
            </ArticleLink>
          </If>
          <NoSSR>
            <ArticleLink children={<div className="introduce">{props.introduce}</div>} />
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
};

/** 输入文章相关数组展示大概文章内容*/
const Article: FunctionComponent<propsTypes> = props => {
  return (
    <>
      {props.data.map(item => {
        return <ArticleItem key={item.router} {...item} />;
      })}
    </>
  );
};
export default memo(Article);
