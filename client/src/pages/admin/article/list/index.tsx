import { useState, useEffect, memo, useRef } from "react";
import Header from "@/components/admin/page/article/list/Header";
import dynamic from "next/dynamic";
const Table = dynamic(import("@/components/admin/page/article/list/Table"), { ssr: false });
import { message, Spin } from "antd";
import axios from "@axios";
import AdminLayout from "@/layout/Admin/Base";
import useAdminArticleSearch from "@/store/admin/admin-search-option";
import useAdminArticleList from "@/store/admin/admin-article-list";
import useAdminTableOption from "@/store/admin/admin-table-option";

const ArticleList = memo(() => {
  /** 设置文章数据*/
  let setArticleList = useAdminArticleList(s => s.setData);
  /** 获取表格配置的page和page_size*/
  let tableOption = useAdminTableOption(s=>s.data);
  /** 顶部Header中的搜索配置*/
  let searchOption = useAdminArticleSearch(s => s.data);
  /** 是否加载中*/
  const [isLoading, setIsLoading] = useState(false);

  let cancel = useRef<() => void>();
  useEffect(() => {
    setIsLoading(true);
    cancel.current && cancel.current();
    const controller = new AbortController();
    cancel.current = () => controller.abort();
    axios
      .get(`/article/page/${tableOption.page}`, {
        params: { page_size: tableOption.page_size, ...searchOption },
        signal: controller.signal,
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
