import { useState, useEffect, startTransition, useRef, memo } from "react";
import type { NextPage } from "next";
import axios from "axios";
import Layout from "@/components/page/notification/Layout";
import InfiniteScroll from "react-infinite-scroll-component";
import { Skeleton, Empty } from "antd";
import Notice from "@/components/page/notification/Notice";
import { useRouter } from "next/router";
import useUserData from "@/store/user-data";
const Notification: NextPage = memo(() => {
  let [userData] = useUserData();
  let router = useRouter();

  const [list, setList] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  let type = useRef("");
  let page = useRef(1);
  useEffect(() => {
    if (router.query.type && userData && ["article", "comment"].includes(router.query.type + "")) {
      type.current = router.query.type as string;
      page.current = 1;
      getNoticeData();
    }
  }, [router, userData]);

  function getNoticeData() {
    axios
      .get(`/notice/list/${type.current}`, { params: { page: page.current } })
      .then(({ data }) => {
        if (page.current == 1) {
          setList(data.data.list);
          startTransition(() => {
            setTotal(data.data.total);
          });
        } else {
          setList(_list => [..._list, ...data.data.list]);
        }
      });
  }

  // 标记已读
  useEffect(() => {
    let noticeList = list.filter(item => item.is_read == 0).map(item => item.id);
    if (noticeList.length) {
      axios.put("/notice/read", { notice_list: noticeList });
    }
  }, [list]);

  return (
    <Layout>
      {list.length ? (
        <InfiniteScroll
          dataLength={list.length}
          next={() => {
            page.current++;
            getNoticeData();
          }}
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
});
export default Notification;
