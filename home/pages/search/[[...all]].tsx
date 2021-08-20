import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Input, Tag, Empty } from "antd";
import axios from "axios";
import { SearchOutlined, TagsOutlined } from "@ant-design/icons";
import style from "./index.module.scss";
import Article from "../../components/Article";
import Head from "../../modules/Head";

interface article {
  router?: string;
  type?: string;
  introduce?: string;
  article?: string;
  time?: string;
  isTop?: boolean;
  isShow?: boolean;
  title?: string;
}
function search({ data, type }: { data: object[]; type: object[] }) {
  let router = useRouter();

  const [articleData, setArticleData] = useState<object[]>(data);
  //? 关于类型可以将可以将文章类型转为数组在对比传来的参数防止javascript和Java这种类型的名字出现重合
  //类型过滤文章内容(监听所选中的类型变化)
  const [typeTagActive, setTypeTagActive] = useState<string | string[]>("");
  function typeFilterData(type) {
    let temporaryData = data.filter((item: article, index: number) => {
      return item.type.indexOf(type) != -1;
    });
    setTypeTagActive(type);
    setArticleData(temporaryData);
  }
  //格式： blogweb.cn/search/React
  useEffect(() => {
    if (router.query?.all) {
      typeFilterData(router.query?.all[0]);
    }
  }, []);

  //文本框过滤文章内容(设置延时器)
  let timer;
  function filterData(value: string) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      let temporaryData = data.filter((item: article, index: number) => {
        let stringData =
          item.title.toLowerCase() + item.introduce.toLowerCase();
        return stringData.indexOf(value.toLowerCase()) != -1; //返回布尔判断是否含有关键词
      });
      setArticleData(temporaryData);
    }, 500);
  }
  const routerType = router.query.all ? router.query.all[0] : false; // todo 有没有参数
  const description = `文章在搜索${routerType},优先推送${routerType}`; // todo 有参数就额外加一句
  return (
    <>
      {Head({
        title: "刘润霖||搜索文章" + `${routerType ? "||" + routerType : ""}`,
        keywords: `搜索文章,${routerType ? routerType : ""}`,
        description:
          "刘润霖WEB个人博客,本站可以搜索文章,内容为日常技术文章,成果物毕业设计分享,本章源代码更新。" +
          `${routerType ? description : ""}`,
      })}
      <Input
        size="large"
        placeholder="请输入文章关键词"
        prefix={<SearchOutlined />}
        onInput={(e: any) => filterData(e.target.value)}
      />
      <div className={style.types + " pc"}>
        <TagsOutlined className={style.type_ico} />
        {type.map((item: { type: string; time: string }, index: number) => {
          return (
            <Tag
              color="blue"
              key={item.type}
              className={typeTagActive == item.type ? style.type_active : ""}
              onClick={() => typeFilterData(item.type)}
            >
              {item.type}
            </Tag>
          );
        })}
      </div>
      <Article data={articleData} />
      <Empty
        description="没找到对应类型的文章"
        style={{
          display: articleData.length ? "none" : "block",
          marginTop: "30px",
        }}
      />
    </>
  );
}

search.getInitialProps = async () => {
  let data = { data: null, type: null };
  await axios
    .get("/article", { params: { ksy: "type,time,title,introduce,router" } })
    .then(res => {
      data.data = res.data.data;
    });
  await axios.get("/type").then(res => {
    data.type = res.data.data;
  });
  return data;
};

export default search;
