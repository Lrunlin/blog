"use client";

import { FC, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { message } from "antd";
import { propsType } from "@/app/tag/[name]/article/page";
import ArticleList from "@/components/common/ArticleList";
import getTagArticleLData from "@/request/type/getTagArticleLData";

const List: FC<propsType> = ({ data }) => {
  let page = useRef(1);
  /** 文章总数*/
  let [total, setTotal] = useState(data.article_data.total);
  /** 文章数据信息*/
  let [list, setList] = useState(data.article_data.list);
  let params = useParams();
  let name = params.name as string;

  function loadMoreData() {
    getTagArticleLData(page.current, name)
      .then((res) => {
        let _list = res.article_data.list;
        if (page.current == 1) {
          setList(_list);
          setTotal(res.article_data.total);
        } else {
          setList((currentList) => [...currentList, ..._list]);
        }
      })
      .catch(() => {
        message.error("请求错误");
      });
  }
  return (
    <>
      <ArticleList
        total={total}
        list={list}
        loadMoreData={() => {
          page.current++;
          loadMoreData();
        }}
      />
    </>
  );
};
export default List;
