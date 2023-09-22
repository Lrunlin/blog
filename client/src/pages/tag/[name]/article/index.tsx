import { useRef, useState } from "react";
import type { GetServerSideProps, NextPage } from "next";
import axios from "axios";
import Layout from "@/components/page/tag/Layout";
import { TagAttributes, ArticleAttributes } from "@type/model-attribute";
import ArticleList from "@/components/common/ArticleList";
import { useParams } from "next/navigation";
import { message } from "antd";
import { response } from "@type/common/response";

interface propsType {
  data: {
    tag_data: TagAttributes;
    article_data: {
      total: number;
      list: ArticleAttributes[];
    };
  };
}

async function fetch(page: number, name: string) {
  return axios
    .get<response<propsType["data"]>>(`/article/tag/${name}`, { params: { page } })
    .then(res => res.data.data);
}

const Article: NextPage<propsType> = ({ data }) => {
  let page = useRef(1);
  /** 文章总数*/
  let [total, setTotal] = useState(data.article_data.total);
  /** 文章数据信息*/
  let [list, setList] = useState(data.article_data.list);
  let params = useParams();
  let name = params.name as string;

  function loadMoreData() {
    fetch(page.current, name)
      .then(res => {
        let _list = res.article_data.list;
        if (page.current == 1) {
          setList(_list);
          setTotal(res.article_data.total);
        } else {
          setList(currentList => [...currentList, ..._list]);
        }
      })
      .catch(() => {
        message.error("请求错误");
      });
  }

  return (
    <Layout>
      <div className="bg-white p-4">
        <img className="w-14" src={data.tag_data.icon_url} alt={`${data.tag_data.name} ICON`} />
        <span className="text-lg font-bold ml-2">{data.tag_data.name}</span>
      </div>
      <div className="mt-4 bg-white p-4">
        <ArticleList
          total={total}
          list={list}
          loadMoreData={() => {
            page.current++;
            loadMoreData();
          }}
        />
      </div>
    </Layout>
  );
};
export default Article;
export const getServerSideProps: GetServerSideProps = async ctx => {
  let reponse = await fetch(1, ctx?.params?.name as string);
  return {
    props: {
      data: reponse,
    },
  };
};
