"use client";

import { useRef, useState } from "react";
import type { FC, ReactNode } from "react";
import { Spin, message } from "antd";
import Main from "@/layout/Main";
import ArticleList from "@/components/common/ArticleList";
import SortSelect from "@/components/page/index/SortSelect";
import TypeHeader from "@/components/page/index/TypeHeader";
import getArticleList, {
  responseType as articleListResponseType,
  sortType,
} from "@/request/article/article-list";
import { responseType as typeTreeRsponseType } from "@/request/type/type-tree-index";

interface optionType {
  type?: number | string;
  tag?: number | string;
  follow?: true;
  sort: sortType;
}

interface propsType {
  type: typeTreeRsponseType[];
  article_list: articleListResponseType;
  children: ReactNode;
}
const Home: FC<propsType> = (props) => {
  /** 文章总数*/
  let [total, setTotal] = useState(props.article_list.total);
  /** 文章数据信息*/
  let [list, setList] = useState<articleListResponseType["list"]>(
    props.article_list.list,
  );
  /** 判断是否在加载中*/
  const [isLoading, setIsLoading] = useState(false);

  let page = useRef(1);
  let option = useRef<optionType>({ sort: "recommend" });

  /** 取消请求函数，每次请求数据时设置上，下次请求时运行*/
  let cancel = useRef<() => void>(null);
  function loadMoreData() {
    cancel.current && cancel.current();
    if (page.current == 1) setIsLoading(true);
    getArticleList(page.current, option.current, (cancelFunction) => {
      cancel.current = cancelFunction;
    })
      .then((data) => {
        if (page.current == 1) {
          setList(data.list);
        } else {
          setList((_list) => [...list, ...data.list]);
        }
        setTotal(data.total);
      })
      .catch(() => {
        message.error("请求错误");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  return (
    <>
      <TypeHeader
        data={props.type}
        change={({ type, tag, follow }) => {
          option.current.tag = tag;
          option.current.type = type;
          option.current.follow = follow;
          page.current = 1;
          loadMoreData();
        }}
      />
      <Main>
        <div className="mr-4 w-[calc(100%-256px)] sm:mr-0 sm:w-full">
          <SortSelect
            change={(sort) => {
              option.current.sort = sort as sortType;
              page.current = 1;
              loadMoreData();
            }}
          />
          <Spin tip="加载中..." spinning={isLoading}>
            <ArticleList
              list={list}
              total={total}
              className="w-full shadow-sm"
              loadMoreData={() => {
                page.current++;
                loadMoreData();
              }}
            />
          </Spin>
        </div>
        {props.children}
      </Main>
    </>
  );
};

export default Home;
