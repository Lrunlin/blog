import { useState, useEffect } from "react";
import type { NextPage } from "next";
import axios from "axios";
import Layout from "@/components/page/notification/Layout";
import InfiniteScroll from "react-infinite-scroll-component";
import { Skeleton, Empty } from "antd";
import Notice from "@/components/page/notification/Notice";
import { useRouter } from "next/router";

const Notification: NextPage = () => {
  const [list, setList] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  let router = useRouter();
  useEffect(() => {
    let type = router.query.type;
    if (!["article", "comment"].includes(type + "")) {
      return;
    }
    axios.get(`/notice/list/${type}`, { params: { page: page } }).then(res => {
      setList(res.data.data.list);
      if (!total) {
        setTotal(res.data.total);
      }
    });
  }, [page, router]);

  useEffect(() => {
    let noticeList = list.filter(item => item.is_read == 0).map(item => item.id);
    if (!noticeList.length) {
      return;
    }
    axios.put("/notice/read", { notice_list: noticeList });
  }, [list]);

  return (
    <Layout>
      {list.length ? (
        <InfiniteScroll
          dataLength={list.length}
          next={() => setPage(_page => ++_page)}
          hasMore={list.length < total}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          className="w-[700px]"
        >
          <Notice data={list} />
        </InfiniteScroll>
      ) : (
        <div className="bg-white h-[400px] flex items-center justify-center">
          <Empty description="没有通知哦" image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
      )}
    </Layout>
  );
};
export default Notification;
