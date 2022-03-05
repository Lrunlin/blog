import { useState, useRef } from "react";
import type { NextPage, GetServerSideProps } from "next";
import css from "styled-jsx/css";
import InfiniteScroll from "react-infinite-scroll-component";
import { Divider, Skeleton } from "antd";

import Head from "@/utils/Head";
import Layout from "@/layout/Base";
import Aside from "@/components/index/Side";
import Action from "@/components/common/Action";
import Article from "@/components/common/Article";

import type { articleType, articlePageTypes } from "@/types";
import { getPageArticleData, getType } from "@/request";
import Statistics from "@/components/common/Statistics";

/**扩展文章类型，本类型携带文章对应的评论数量*/
interface propsTypes {
  article: articlePageTypes[];
  type: articleType[];
  total: number;
  isOrigina: boolean;
}
const Style = css.resolve`
  .container {
    display: flex;
    justify-content: space-between;
  }
`;
const Index: NextPage<propsTypes> = props => {
  const [data, setData] = useState<articlePageTypes[]>(props.article);
  /** 是否还有更多的数据*/
  const [total, setTotal] = useState(props.total);
  const page = useRef(1);
  const type = useRef("");

  /**根据要求获取对应的文章 type为查询某个类型的第一页文章，page为换页*/
  const refreshData = async (method: "page" | "type", value?: string | number) => {
    if (method == "type") {
      type.current = value as string;
      page.current = 1;
      let res = await getPageArticleData(page.current, type.current);
      setTotal(res.total);
      setData([...res.data]); //!只有页数更新才会合并数组
    }
    if (method == "page") {
      page.current++;
      let res = await getPageArticleData(page.current, type.current);
      setData([...data, ...res.data]);
    }
  };

  return (
    <Layout styleJsx={Style}>
      <Head
        title="前端路上-技术博客 | 网站Web前端"
        description="前端开发|Vue开发|毕业设计制作|NodeJs|WEB前端|前端路上-个人博客。原创前端技术博客，致力于分享前端学习路上的第一手资料。专注WEB前端开发、移动端开发、前端工程化、前端职业发展，做最有价值的前端技术学习网站,网站开放部分API接口,所有文章均为原创,并且分享可做项目类型和日常开源分享。"
        keyword={["专注WEB开发", "前端开发", "前端自动化", "移动端开发", "个人博客"]}
      >
        {/* 如果是IP地址的话标注源站 */}
        {!props.isOrigina && <link rel="canonical" href="https://blogweb.cn" />}
      </Head>
      <Aside type={props.type} refreshData={refreshData} />
      <section style={{ width: "100%", margin: "0px 10px" }}>
        <InfiniteScroll
          dataLength={data.length}
          next={() => refreshData("page")}
          hasMore={data.length < total}
          loader={<Skeleton paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>没有更多内容了~</Divider>}
        >
          <Article data={data} />
        </InfiniteScroll>
      </section>
      <Action />
      <Statistics id="index" />
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  let type = await getType();
  let res = await getPageArticleData(
    1,
    typeof context.query.type == "string" ? context.query.type : ""
  );
  let isOrigina =
    process.env.NEXT_PUBLIC_ENV == "development"
      ? true
      : context.req.headers.referer?.includes("blogweb");
  return {
    props: {
      type: type,
      article: res.data,
      total: res.total,
      isOrigina: isOrigina,
    },
  };
};

export default Index;
