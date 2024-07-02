"use client";

import { FC, useRef, useState } from "react";
import { Divider, Empty, Skeleton, message } from "antd";
import axios from "@axios";
import type { ProblemAttributes } from "@type/model-attribute";
import InfiniteScroll from "react-infinite-scroll-component";
import List from "@/components/page/problem/List";

interface propsType {
  total: number;
  list: ProblemAttributes[];
}
const ProblemList: FC<propsType> = (props) => {
  const [list, setList] = useState(props.list);
  const [total, setTotal] = useState(props.total);
  const page = useRef(1);

  function loadMore() {
    page.current++;
    axios
      .get(`/problem/page/${page.current}`, { params: { type: "newest" } })
      .then((res) => {
        setList((_data) => [..._data, ...res.data.data.list]);
      })
      .catch((err) => {
        message.error("问答列表获取失败");
        console.log(err);
      });
  }
  return (
    <>
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
            <List data={list} />
          </InfiniteScroll>
        </div>
      ) : (
        <div className="flex h-96 items-center justify-center bg-white">
          <Empty className="!my-0" image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
      )}
    </>
  );
};
export default ProblemList;
