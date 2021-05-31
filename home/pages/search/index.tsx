import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Input, Empty, Tag } from "antd";
import { Base64 } from "js-base64";
import queryString from "query-string";
import Article from "../../components/Article";
import setHead from "../../components/Head";
import style from "./index.module.scss";
interface articleType {
  title: string;
  introduce: string;
}
export default function Search({ data, type }) {
  const [article, setArticle] = useState<object[]>(data);
  const inputDom: any = React.createRef();

  const router = useRouter();
  useEffect(() => {
    inputDom.current.focus();
    let isArticleType = router.query.type;
    if (isArticleType) {
      setType(isArticleType + "");
    }
  }, []);
  // 搜索
  const filter = (value: string) => {
    let articleData: object[] = [];
    // 关键词和被查询内容都转为小写
    data.forEach((item: articleType) => {
      if (
        (Base64.decode(item.title) + Base64.decode(item.introduce))
          .toLocaleLowerCase()
          .indexOf(value.toLocaleLowerCase()) != -1
      ) {
        articleData.push(item);
      }
    });
    setArticle(articleData);
  };
  // 根据tag查询文章
  const [_type, setType] = useState<string>("");

  // 监听类型（_type）变化
  useEffect(() => {
    let setData = [];
    data.forEach(item => {
      if (item.type.indexOf(_type) != -1) {
        setData.push(item);
      }
    });
    setArticle(setData);
  }, [_type]);
  // 察看全部文章
  function clear() {
    setType("");
    setArticle(data);
  }
  return (
    <>
      {setHead({
        title: "刘润霖||搜索文章",
        keywords: "web前端,博客,刘润霖,搜索文章",
        description:
          "刘润霖WEB个人博客,本站可以搜索文章,内容为日常技术文章,成果物毕业设计分享,本章源代码更新。",
      })}
      <header>
        <Input
          className={style.input}
          placeholder="输入文章关键词"
          ref={inputDom}
          onChange={e => {
            filter(e.target.value);
          }}
        />
      </header>
      <nav>
        <Tag
          color="blue"
          className={`${style.tag} ${!_type.length && style.tag_active}`}
          onClick={() => clear()}
        >
          查看全部
        </Tag>
        {type.map((item: { type: string }, i: number) => {
          return (
            <Tag
              color="blue"
              key={item.type}
              className={`${style.tag} ${
                _type === item.type && style.tag_active
              }`}
              onClick={() => setType(item.type)}
            >
              {item.type}
            </Tag>
          );
        })}
      </nav>
      <Article data={article} />
      <Empty
        description="没有查询到对应文章"
        className={style.blank}
        style={{ display: article.length ? "none" : "block" }}
      />
    </>
  );
}
{
}
Search.getInitialProps = async () => {
  let data;
  let type;
  await axios
    .get("/article", { params: { key: "router,type,introduce,time,title" } })
    .then(res => {
      data = res.data.data;
    });
  await axios
    .get("/type", {
      params: { key: "type" },
    })
    .then(res => {
      type = res.data.data;
    });
  return { data: data, type: type };
};
