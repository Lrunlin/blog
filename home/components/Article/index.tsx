import Link from "next/link";
import { CalendarOutlined, RightOutlined } from "@ant-design/icons";
import { Base64 } from "js-base64";
import style from "./index.module.scss";
const Article = ({ data }: { data: object[] }) => {
  //生成标签函数
  const tag = (type: string[]) => {
    return (
      <>
        {type.map((item: string, index: number) => {
          return (
            // 根据索引值判断如果是20，就不加margin-left，否则加上30
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

  return (
    <main className={style.article_container}>
      {data.map((item: any, index: number) => {
        return (
          <article key={item.router} className={style.article}>
            <header>
              <h1 className="title">
                <a href={`/article/${item.router}`}>
                  {Base64.decode(item.title)}
                </a>
              </h1>
              <time>
                <CalendarOutlined />
                {item.time.substring(0, 10)}
              </time>
            </header>
            <h2>
              <div className={style.introduce}>文章介绍</div>
              <p>{Base64.decode(item.introduce)}</p>
            </h2>
            <footer>
              <div>{tag(item.type.split(","))}</div>
              <a href={`/article/${item.router}`} className={style.link}>
                阅读全文
                <RightOutlined />
              </a>
            </footer>
          </article>
        );
      })}
    </main>
  );
};
export default Article;
