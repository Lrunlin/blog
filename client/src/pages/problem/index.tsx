import { useState, useRef } from "react";
import type { FC } from "react";
import Head from "@/components/next/Head";
import Layout from "@/components/page/problem/Layout";
import { GetServerSideProps } from "next";
import List from "@/components/page/problem/List";
import axios from "axios";
import type { ProblemAttributes } from "@type/model-attribute";
import { Skeleton, Divider, message, Empty } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import classNames from "classnames";
import type { response } from "@type/common/response";
import Link from "next/link";
interface propsType {
  total: number;
  list: ProblemAttributes[];
}

function getProblemList(page: number, type: "newest" | "noanswer") {
  return axios
    .get<response<{ total: number; list: ProblemAttributes[] }>>(`/problem/page/${page}`, {
      params: { type: type },
    })
    .then(res => res.data.data)
    .catch(err => null);
}

const Problem: FC<propsType> = props => {
  const [list, setList] = useState(props.list);
  const [total, setTotal] = useState(props.total);
  const page = useRef(1);

  function loadMore() {
    page.current++;
    axios
      .get(`/problem/page/${page.current}`, { params: { type: "newest" } })
      .then(res => {
        setList(_data => [..._data, ...res.data.data.list]);
      })
      .catch(err => {
        message.error("问答列表获取失败");
        console.log(err);
      });
  }

  return (
    <Layout>
      <Head title={`技术问答 - ${process.env.NEXT_PUBLIC_SITE_NAME}`} />
      {list.length ? (
        <div>
          <InfiniteScroll
            dataLength={list.length}
            next={loadMore}
            hasMore={list.length < total}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            endMessage={<Divider plain>到底啦 ~ ~ 🤐</Divider>}
            className="bg-white"
          >
            <List data={props.list} />
          </InfiniteScroll>
        </div>
      ) : (
        <div className="h-96 flex items-center justify-center bg-white">
          <Empty className="!my-0" image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
      )}
    </Layout>
  );
};
export const getServerSideProps: GetServerSideProps = async ctx => {
  let response = (await getProblemList(1, "newest")) as {
    total: number;
    list: ProblemAttributes[];
  };
  if (!response) {
    ctx.res.statusCode = 404;
  }
  return {
    props: {
      total: response.total,
      list: response.list,
    },
  };
};
export default Problem;
