import { useState, useEffect, Fragment, memo } from "react";
import Link from "next/link";
import axios from "axios";
import style from "./index.module.scss";
interface newsType {
  path: string;
  title: string;
  html: string;
  image: string;
  passtime: string;
  introduce: string;
}

function News() {
  const [data, setData] = useState<newsType[]>([]);
  useEffect(() => {
    axios.get("/news").then(res => {
      setData(res.data.data);
    });
  }, []);

  const NewsItem = (item: newsType) => {
    return (
      <div className={style.news} key={item.path} >
        <img src={item.image} alt="新闻展示图片" />
        <div style={{ paddingLeft: "10px" }}>
          <h3>
            <Link href={`/news/${item.path}`}>
              <a>{item.title}</a>
            </Link>
          </h3>
          <time style={{ fontSize: "12px", display: "block" }}>
            {item.passtime.substring(0, 10)}
          </time>
          <div className={style.introduce}>{item.introduce}</div>
        </div>
      </div>
    );
  };
  return (
    <>
      {data.map((item: newsType) => {
        return NewsItem(item);
      })}
    </>
  );
}
export default memo(News);
