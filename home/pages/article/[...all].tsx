import axios from "axios";
import Link from "next/link";
import setHead from "../../components/Head";
import { Base64 } from "js-base64";
import style from "./index.module.scss";
import { CalendarOutlined, TagsOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import { message } from "antd";
import NoFound from "../../components/404";
export default function Article({ data }) {
  let isArticle = !!data.length;
  let articleData = isArticle ? data[0] : null;

  useEffect(() => {
    document.addEventListener("copy", e => {
      const userSelectt = window.getSelection().toString();
      const template = `\n文章作者:刘润霖\n文章地址:${window.location.href}`;
      console.log(userSelectt + template);
      e.preventDefault();
      e.clipboardData.setData("text", userSelectt + template);
      message.success("复制成功>_<");
    });
  }, []);

  const Head = () => {
    if (isArticle) {
      return setHead({
        title: Base64.decode(articleData.title),
        keywords: `web前端,博客,刘润霖,${articleData.type}`,
        description: Base64.decode(articleData.introduce),
      });
    } else {
      return setHead({
        title: "刘润霖||404",
        keywords: "web前端,博客,刘润霖,404",
        description:
          "刘润霖博客:该文章不存在请访问首页链接：https://blogweb.cn",
      });
    }
  };
  const tag = (type: string[]) => {
    return (
      <>
        {type.map((item: string, index: number) => {
          return (
            // 根据索引值判断 如果是20，否则加上30
            <span
              className={style.tag}
              style={{ marginLeft: index ? "30px" : "20px" }}
              key={item}
            >
              <Link href={`/search?type=${item}`}>
                <a>
                  <div className={style.tag_head}>
                    <div className={style.tag_round}></div>
                  </div>
                  <div className={style.tag_body}>{item}</div>
                </a>
              </Link>
            </span>
          );
        })}
      </>
    );
  };

  const footer = () => {
    return (
      <div className={style.article_footer}>
        <table>
          <tbody>
            <tr>
              <td>本文标题:</td>
              <td>{Base64.decode(articleData.title)}</td>
            </tr>
            <tr>
              <td>文章作者:</td>
              <td>刘润霖</td>
            </tr>
            <tr>
              <td>GitHub:</td>
              <td>
                <a href="https://github.com/Lrunlin">
                  https://github.com/Lrunlin
                </a>
              </td>
            </tr>
            <tr>
              <td>本文地址:</td>
              <td>
                <a href={`https://blogweb.cn/article/${articleData.router}`}>
                  {`https://blogweb.cn/article/${articleData.router}`}
                </a>
              </td>
            </tr>
            <tr>
              <td>发布时间</td>
              <td>{articleData.time}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
  const container = () => {
    return (
      <div className={style.article_container}>
        <header>
          <h1 className={style.article_title}>
            {Base64.decode(articleData.title)}
          </h1>
          <time>
            <CalendarOutlined />
            {articleData.time.substring(0, 10)}
          </time>
        </header>
        <nav className={style.article_types}>
          <TagsOutlined style={{ display: "inline", float: "left" }} />
          {tag(articleData.type.split(","))}
        </nav>
        <article
          dangerouslySetInnerHTML={{
            __html: Base64.decode(articleData.article),
          }}
        ></article>
      </div>
    );
  };

  
  return isArticle ? (
    <>
      <>{Head()}</>
      <>{container()}</>
      <>{footer()}</>
    </>
  ) : (
    <NoFound></NoFound>
  );
}

Article.getInitialProps = async ({ asPath }) => {
  let data;
  const router = asPath.replace("/article/", "");
  data = JSON.stringify(asPath);
  await axios.get(`/article/${router}`).then(res => {
    data = res.data.data;
  });
  return {
    data: data,
  };
};
