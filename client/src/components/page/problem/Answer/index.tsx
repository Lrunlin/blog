import { useState, useContext } from "react";
import type { FC } from "react";
import classNames from "classnames";
import { Badge, Button, message } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import axios from "axios";
import useUserData from "@/store/user-data";
const CommentEditor = dynamic(() => import("@/components/page/problem/Comments/Editor"), {
  ssr: false,
});
const Comments = dynamic(() => import("@/components/page/problem/Comments"), { ssr: false });
import { Context } from "@/pages/problem/[id]";
import itemClassName from "../../article/ToolBar/class";
import Image from "@/components/next/Image";

/** 问答页面底部的答案区域*/
const Answer: FC = () => {
  let { data, reload } = useContext(Context);
  // 是否展示回复框
  const [answerReplyShrinkIndex, setAnswerReplyShrinkIndex] = useState<number>(-1);
  let params = useParams();
  let id = params.id as string;
  let [userData] = useUserData();

  /** 采纳答案*/
  function adopt(id: number) {
    axios
      .put(`/problem/adopt/${id}`, { answer_id: id })
      .then(res => {
        reload();
      })
      .catch(err => {
        message.error("请求失败");
        console.log(err);
      });
  }
  /** 取消采纳*/
  function cancel() {
    axios
      .put(`/problem/cancel/${id}`)
      .then(res => {
        reload();
      })
      .catch(err => {
        message.error("请求失败");
        console.log(err);
      });
  }

  /** 删除答案*/
  function deleteAnswer(id: number) {
    axios
      .delete(`/answer/${id}`)
      .then(res => {
        reload();
      })
      .catch(err => {
        message.error("删除错误");
        console.log(err);
      });
  }

  function like(id: number) {
    axios.post(`/like/${id}`, { type: "answer" }).then(res => {
      if (res.data.success) {
        reload();
      } else {
        message.error(res.data.message);
      }
    });
  }
  function unLike(id: number) {
    axios.delete(`/like/${id}`).then(res => {
      if (res.data.success) {
        reload();
      } else {
        message.error(res.data.message);
      }
    });
  }

  return (
    <>
      <div className="bg-white mt-4">
        <div className="bg-white p-4 pb-0 text-lg font-bold">{data.answer_list.length}个回答</div>
        {/* 单个回答 */}
        {data.answer_list.map((item, index) => (
          <div
            key={item.id}
            className={classNames([
              "mt-3 p-8 relative border-b-solid border-gray-300",
              data.answer_id == item.id && "!border-4 !border-solid !border-blue-500",
            ])}
          >
            <div className="flex">
              <img
                src={item.author_data.avatar_url}
                alt="avatar"
                className="w-9 h-9 rounded-full"
              />
              <div className="ml-3">
                <div className="font-bold">{item.author_data.name}</div>
                <div>{dayjs(item.create_time).format("YYYY-MM-DD")}</div>
              </div>
            </div>
            <div
              className={classNames(["mt-2 content-body"])}
              dangerouslySetInnerHTML={{ __html: item.content }}
            ></div>
            {data.answer_id == item.id ? (
              <Button
                type="primary"
                onClick={() => (userData?.id == data.author ? cancel() : undefined)}
              >
                <CheckOutlined />
                已采纳该答案
              </Button>
            ) : (
              userData?.id == data.author && (
                <Button onClick={() => adopt(item.id)}>采纳该答案</Button>
              )
            )}
            {/* 单个回答的底部回复 */}
            <div className="mt-4">
              <div className="text-gray-500 flex justify-between select-none">
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setAnswerReplyShrinkIndex(value => (value == index ? -1 : index));
                  }}
                >
                  {answerReplyShrinkIndex == index ? "收起" : "回复"}
                </div>
                {userData?.id == item.author && (
                  <div className="cursor-pointer" onClick={() => deleteAnswer(item.id)}>
                    删除
                  </div>
                )}
              </div>
              {/* 答案回复底部的评论框(回复答案的评论框) */}
              {answerReplyShrinkIndex == index && (
                <CommentEditor
                  belong_id={item.id}
                  reply={null}
                  type="answer"
                  onSuccess={() => {
                    setAnswerReplyShrinkIndex(-1);
                    reload();
                  }}
                />
              )}
              <Comments type="answer" belong_id={item.id} data={item.comment_list} />
            </div>
            {/* 左侧点赞 */}
            <div
              className={classNames([itemClassName, "absolute", "top-1/2", "-left-20"])}
              onClick={
                !userData || userData.id == item.author
                  ? undefined
                  : item.like_data.like_state
                  ? () => unLike(item.id)
                  : () => like(item.id)
              }
            >
              <Badge count={item.like_data.like_count} color="#adb1b8" offset={[10, -10]}>
                <Image
                  src={
                    item.like_data.like_state
                      ? "/icon/client/likes-fill.png"
                      : "/icon/client/likes.png"
                  }
                  width={24}
                  height={24}
                  alt="likes"
                />
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Answer;
