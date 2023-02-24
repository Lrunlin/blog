import { useState, useRef } from "react";
import type { FC } from "react";
import Head from "@/components/next/Head";
import Layout from "@/components/page/problem/Layout";
import { GetServerSideProps } from "next";
import axios from "axios";
import type { ProblemAttributes } from "@type/model-attribute";
import { Skeleton, Divider, message } from "antd";
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
      <div>
        <InfiniteScroll
          dataLength={list.length}
          next={loadMore}
          hasMore={list.length < total}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>到底啦 ~ ~ 🤐</Divider>}
          className={classNames(["bg-white"])}
        >
          <ul className="p-0 w-full text-base">
            {list.map((item, index) => (
              <li
                key={item.id}
                className={classNames([
                  "flex items-center list-none border-slate-200 border-b-solid p-4 pb-3 max-w-full",
                  index && "mt-3",
                ])}
              >
                <div
                  className={classNames([
                    "w-12 h-12 flex flex-col items-center rounded",
                    item.answer_count
                      ? "border border-solid border-blue-600 text-blue-600"
                      : "text-gray-400",
                  ])}
                >
                  <div>{item.answer_count}</div>
                  <div>回答</div>
                </div>
                <div className="w-12 h-12 ml-2 flex flex-col items-center rounded text-orange-800">
                  <div>{item.view_count}</div>
                  <div>阅读</div>
                </div>
                <div className="ml-2">
                  <a
                    className="max-w-2xl truncate block text-gray-800"
                    href={`/problem/${item.id}`}
                    target="_blank"
                  >
                    {item.title}
                  </a>
                  <div className="flex items-center mt-1">
                    {item.tag.map((tag, _index) => (
                      <Link
                        href={`/search?tag=${tag.name}`}
                        key={`problem${item.id}${tag.name}`}
                        className={classNames([
                          _index && "ml-2",
                          "px-1",
                          "text-sm",
                          "rounded",
                          "bg-blue-200",
                          "text-blue-800",
                          "cursor-pointer",
                          "hover:bg-blue-300",
                        ])}
                      >
                        {tag.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </InfiniteScroll>
      </div>
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
