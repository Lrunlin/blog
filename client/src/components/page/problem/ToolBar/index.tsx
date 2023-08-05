import { useState, useContext } from "react";
import { Context } from "@/pages/problem/[id]";
import { Button, message } from "antd";
import Image from "@/components/next/Image";
import useUserData from "@/store/user-data";
import { like, unlike } from "@/request/like";
import { collection, uncollection } from "@/request/collection";
import { follow, unfollow } from "@/request/follow";
import dynamic from "next/dynamic";
const Modal = dynamic(() => import("@/components/common/CollectionModal"), { ssr: false });

/** 问答页面对问题的点赞和收藏按钮*/
const ToolBar = () => {
  let { data, reload } = useContext(Context);
  let [userData] = useUserData();
  const [isOpen, setIsOpen] = useState(false);

  function unCollectionProblem() {
    uncollection(data?.id)
      .then(res => {
        reload();
      })
      .catch(() => {
        message.error("取消失败");
      });
  }

  function likeProblem() {
    like(data.id, "problem")
      .then(() => {
        reload();
      })
      .catch(() => {
        message.error("点赞失败");
      });
  }

  function unLikeProblem() {
    unlike(data?.id)
      .then(() => {
        reload();
      })
      .catch(() => {
        message.error("取消失败");
      });
  }

  function followProblem() {
    follow(data.id, "problem")
      .then(res => {
        reload();
        message.success("关注成功");
      })
      .catch(() => {
        message.error("关注失败");
      });
  }
  function unFollowProblem() {
    unfollow(data.id)
      .then(() => {
        reload();
      })
      .catch(() => {});
  }
  return (
    <div className="flex">
      {data.collection_state ? (
        <Button
          type="primary"
          className="flex items-center"
          onClick={
            !userData || userData?.id == data.author_data.id
              ? () => {}
              : (data.collection_state as unknown as number[])?.length == 1
              ? unCollectionProblem
              : () => setIsOpen(true)
          }
        >
          <Image
            src="/icon/client/problem-collection-white.png"
            alt="icon"
            width={14}
            height={14}
          />
          <span className="ml-0.5">已收藏 {data.collection_count}</span>
        </Button>
      ) : (
        <Button className="flex items-center" onClick={() => setIsOpen(true)}>
          <Image
            src="/icon/client/problem-collection-black.png"
            alt="icon"
            width={14}
            height={14}
          />
          <span className="ml-0.5">收藏 {data.collection_count}</span>
        </Button>
      )}
      {data.like_data.like_state ? (
        <Button
          type="primary"
          className="flex items-center ml-2"
          onClick={!userData ? undefined : unLikeProblem}
        >
          <Image src="/icon/client/problem-like-white.png" alt="icon" width={14} height={14} />
          <span className="ml-0.5">已点赞 {data.like_data.like_count}</span>
        </Button>
      ) : (
        <Button
          className="flex items-center ml-2"
          onClick={userData?.id == data.author || !userData ? undefined : likeProblem}
        >
          <Image src="/icon/client/problem-like-black.png" alt="icon" width={14} height={14} />
          <span className="ml-0.5">点赞 {data.like_data.like_count}</span>
        </Button>
      )}
      {data.follow_data.follow_state ? (
        <Button
          type="primary"
          className="flex items-center ml-2"
          onClick={!userData ? undefined : unFollowProblem}
        >
          <Image src="/icon/client/problem-follow-white.png" alt="icon" width={14} height={14} />
          <span className="ml-0.5">已关注 {data.follow_data.follow_count}</span>
        </Button>
      ) : (
        <Button
          className="flex items-center ml-2"
          onClick={userData?.id == data.author || !userData ? undefined : followProblem}
        >
          <Image src="/icon/client/problem-follow-black.png" alt="icon" width={14} height={14} />
          <span className="ml-0.5">关注 {data.follow_data.follow_count}</span>
        </Button>
      )}
      <Modal
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        onDelete={() => {
          reload();
        }}
        onUpdate={() => {
          reload();
        }}
        onCreate={() => {
          reload();
        }}
        type="problem"
        defaultChecked={data.collection_state}
      />
    </div>
  );
};
export default ToolBar;
