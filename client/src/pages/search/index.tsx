import { useState, useEffect } from "react";
import type { FunctionComponent } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import type { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import css from "styled-jsx/css";
import { Result, Button } from "antd";
import Layout from "@/layout/Main";
import Head from "@/utils/Head";
import type { response, article } from "@/types";
import Article from "@/components/common/Article";
import If from "@/utils/If";

const Style = css`
  .header-search {
    height: 40px;
    background-color: white;
    display: flex;
    align-items: center;
    span {
      margin-left: 10px;
    }
    b {
      font-size: 20px;
    }
  }
`;

const NoResult: FunctionComponent = () => {
  return (
    <Result
      title="没有找到相关文章"
      extra={
        <Link href="/">
          <Button type="primary" key="console">
            首页
          </Button>
        </Link>
      }
    />
  );
};

const NoText: FunctionComponent = () => {
  return (
    <div style={{ backgroundColor: "white", textAlign: "center", padding: "50px 0px" }}>
      <strong style={{ fontWeight: 900, fontSize: "24px" }}>
        请在顶部搜索栏输入关键词后按回车查找相关文章
      </strong>
    </div>
  );
};

const Search: NextPage = props => {
  let router = useRouter();

  const [data, setData] = useState<article[]>([]);
  useEffect(() => {
    axios
      .get<response<article[]>>(`/article/search/${(router.query.text + "").substring(0, 15)}`)
      .then(res => {
        setData(res.data.data);
      });
  }, [router.query.text]);
  return (
    <>
      <Head
        title="文章搜索"
        keyword={["搜索文章", "内容检索", "文章内容展示"]}
        description="根据输入的关键词展示文章内容"
      />
      <Layout>
        <style jsx>{Style}</style>
        <If if={router.query.text} else={<NoText />}>
          <div className="header-search">
            <span>
              为您展示:<b>{(router.query.text + "").substring(0, 15)}</b> 的文章
            </span>
            <span>共{data.length}条结果</span>
          </div>
          <div style={{ backgroundColor: "white", marginTop: "10px" }}>
            <If if={data.length > 0} else={<NoResult />}>
              <Article data={data} />
            </If>
          </div>
        </If>
      </Layout>
    </>
  );
};

export default Search;
