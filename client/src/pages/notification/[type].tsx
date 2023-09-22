import { useState, useEffect, startTransition, useRef } from "react";
import axios from "axios";
import Layout from "@/components/page/notification/Layout";
import InfiniteScroll from "react-infinite-scroll-component";
import { Skeleton, Empty } from "antd";
import Notice from "@/components/page/notification/Notice";
import { useParams } from "next/navigation";
import useUserData from "@/store/user-data";
import type {
  NoticeAttributes,
  UserAttributes,
  CommentAttributes,
  ProblemAttributes,
} from "@type/model-attribute";

/** 通知页面评论相关类型*/
export interface noticeCommentListType extends NoticeAttributes {
  label: {
    type: "problem" | "article";
    user_data: Pick<UserAttributes, "id" | "name" | "avatar_file_name" | "avatar_url">;
    content_data: {
      id: number;
      title: string;
    };
    comment_data: Pick<CommentAttributes, "id" | "content"> & {
      reply: Pick<CommentAttributes, "content"> | null;
    };
  };
}

/** 通知页面answer类型*/
export interface noticeAnswerListType extends NoticeAttributes {
  label: {
    type: "problem" | "article";
    user_data: Pick<UserAttributes, "id" | "name" | "avatar_file_name" | "avatar_url">;
    problem_data: Pick<ProblemAttributes, "id" | "title">;
  };
}

/** 通知页面follow类型*/
export interface noticeFollowListType extends NoticeAttributes {
  label: {
    type: "problem" | "article";
    user_data: Pick<UserAttributes, "id" | "name" | "avatar_file_name" | "avatar_url">;
    content_data: Pick<ProblemAttributes, "id" | "title">;
  };
}

const Notification = () => {
  let [userData] = useUserData();
  if (!userData) {
    return (
      <Layout>
        <div className="bg-white h-[400px] flex items-center justify-center">
          <Empty description="请登录后在查看通知" />
        </div>
      </Layout>
    );
  }

  let params = useParams();

  const [list, setList] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  let type = useRef("");
  let page = useRef(1);
  useEffect(() => {
    //暂时未开通系统通知
    if (["notice", "system-notification"].includes(params.type + "")) {
      type.current = params.type as string;
      page.current = 1;
      getNoticeData();
    }
  }, [params]);

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

  /** 标记已读*/
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
