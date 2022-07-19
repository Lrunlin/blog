import {  memo, useEffect } from "react";
import axios from "axios";
import Table, { tableOptionContext } from "./Table";
import Header, { searchOptionContext } from "./Header";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import './index.css';

export const articleListDataContext = atom({
  key: "article-list-data",
  default: {
    list: [],
    total_count: 0,
  },
});

const ArticleList = memo(() => {
  /** 设置文章数据*/
  let setArticleList = useSetRecoilState(articleListDataContext);
  /** 获取表格配置的page和page_size*/
  let tableOption = useRecoilValue(tableOptionContext);
  /** 顶部Header中的搜索配置*/
  let searchOption = useRecoilValue(searchOptionContext);
  useEffect(() => {
    axios
      .get(`/article/page/${tableOption.page}`, {
        params: { page_size: tableOption.page_size, ...searchOption },
      })
      .then(res => {
        setArticleList({
          list: res.data.data.list,
          total_count: res.data.data.total_count,
        });
      });
  }, [tableOption, searchOption]);
  return (
    <>
      <Header />
      <>
        <Table />
      </>
    </>
  );
});
export default ArticleList;
