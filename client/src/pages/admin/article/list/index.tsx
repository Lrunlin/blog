import { useState, useEffect, memo } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import Header, { searchOptionContext } from "@/components/admin/page/article/list/Header";
import { tableOptionContext } from "@/components/admin/page/article/list/Table";
import dynamic from "next/dynamic";
const Table = dynamic(import("@/components/admin/page/article/list/Table"), { ssr: false });
import { message, Spin } from "antd";
import axios from "axios";
import AdminLayout from "@/layout/Admin/Base";

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
  /** 是否加载中*/
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/article/page/${tableOption.page}`, {
        params: { page_size: tableOption.page_size, ...searchOption },
      })
      .then(res => {
        setArticleList({
          list: res.data.data.list,
          total_count: res.data.data.total_count,
        });
      })
      .catch(() => {
        message.error("请求错误");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [tableOption, searchOption]);
  return (
    <>
      <style jsx global>
        {`
          .article-list_header .ant-form-item {
            margin: 10px 0px 15px 15px;
          }
        `}
      </style>
      <AdminLayout>
        <Header />
        <Spin tip="Loading..." spinning={isLoading}>
          <Table />
        </Spin>
      </AdminLayout>
    </>
  );
});
export default ArticleList;
