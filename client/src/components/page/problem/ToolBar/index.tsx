import { useContext } from "react";
import { Context } from "@/pages/problem/[id]";
import { Button, message } from "antd";
import Image from "@/components/next/Image";
import useUserData from "@/store/user-data";
import { like, unlike } from "@/request/like";
import { collection, uncollection } from "@/request/collection";
import { follow, unfollow } from "@/request/follow";

/** 问答页面对问题的点赞和收藏按钮*/
const ToolBar = () => {
  let { data, reload } = useContext(Context);
  let [userData] = useUserData();
  function collectionProblem() {
    collection(data?.id, "problem")
      .then(res => {
        reload();
        message.success(res.data.message);
      })
      .catch(() => {
        message.error("收藏失败");
      });
  }
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
    <>
      {data.collection_data.collection_state ? (
        <Button
          type="primary"
          className="flex items-center"
          onClick={!userData ? undefined : unCollectionProblem}
        >
          <Image src="/icon/problem-collection-white.png" alt="icon" width={14} height={14} />
          <span className="ml-0.5">已收藏 {data.collection_data.collection_count}</span>
        </Button>
      ) : (
        <Button
          className="flex items-center"
          onClick={userData?.id == data.author || !userData ? undefined : collectionProblem}
        >
          <Image src="/icon/problem-collection-black.png" alt="icon" width={14} height={14} />
          <span className="ml-0.5">收藏 {data.collection_data.collection_count}</span>
        </Button>
      )}
      {data.like_data.like_state ? (
        <Button
          type="primary"
          className="flex items-center ml-2"
          onClick={!userData ? undefined : unLikeProblem}
        >
          <Image src="/icon/problem-like-white.png" alt="icon" width={14} height={14} />
          <span className="ml-0.5">已点赞 {data.like_data.like_count}</span>
        </Button>
      ) : (
        <Button
          className="flex items-center ml-2"
          onClick={userData?.id == data.author || !userData ? undefined : likeProblem}
        >
          <Image src="/icon/problem-like-black.png" alt="icon" width={14} height={14} />
          <span className="ml-0.5">点赞 {data.like_data.like_count}</span>
        </Button>
      )}
      {data.follow_data.follow_state ? (
        <Button
          type="primary"
          className="flex items-center ml-2"
          onClick={!userData ? undefined : unFollowProblem}
        >
          <Image src="/icon/problem-follow-white.png" alt="icon" width={14} height={14} />
          <span className="ml-0.5">已关注 {data.follow_data.follow_count}</span>
        </Button>
      ) : (
        <Button
          className="flex items-center ml-2"
          onClick={userData?.id == data.author || !userData ? undefined : followProblem}
        >
          <Image src="/icon/problem-follow-black.png" alt="icon" width={14} height={14} />
          <span className="ml-0.5">关注 {data.follow_data.follow_count}</span>
        </Button>
      )}
    </>
  );
};
export default ToolBar;
