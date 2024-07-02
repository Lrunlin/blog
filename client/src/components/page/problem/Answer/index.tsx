import { Suspense, useContext, useState } from "react";
import type { FC } from "react";
import { useParams } from "next/navigation";
import { Badge, Button, Tooltip, message } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import axios from "@axios";
import dayjs from "@dayjs";
import classNames from "classnames";
import Image from "@/components/next/Image";
import Comments from "@/components/page/problem/Comments";
import CommentEditor from "@/components/page/problem/Comments/Editor";
import { Context } from "@/components/page/problem/ProblemDetail";
import useUserData from "@/store/user/user-data";
import itemClassName from "../../article/ToolBar/class";

/** 问答页面底部的答案区域*/
const Answer: FC = () => {
  let { data, reload } = useContext(Context);

  // 是否展示回复框
  const [answerReplyShrinkIndex, setAnswerReplyShrinkIndex] =
    useState<number>(-1);
  let params = useParams();
  let id = params.id as string;
  let userData = useUserData((s) => s.data);

  /** 采纳答案*/
  function adopt(answer_id: number) {
    axios
      .put(`/problem/adopt/${id}`, { answer_id: answer_id })
      .then((res) => {
        reload();
      })
      .catch((err) => {
        message.error("请求失败");
        console.log(err);
      });
  }
  /** 取消采纳*/
  function cancel() {
    axios
      .put(`/problem/cancel/${id}`)
      .then((res) => {
        reload();
      })
      .catch((err) => {
        message.error("请求失败");
        console.log(err);
      });
  }

  /** 删除答案*/
  function deleteAnswer(id: number) {
    axios
      .delete(`/answer/${id}`)
      .then((res) => {
        reload();
      })
      .catch((err) => {
        message.error(err.message || "删除错误");
        console.log(err);
      });
  }

  function like(id: number) {
    axios.post(`/like/${id}`, { type: "answer" }).then((res) => {
      if (res.data.success) {
        reload();
      } else {
        message.error(res.data.message);
      }
    });
  }
  function unLike(id: number) {
    axios.delete(`/like/${id}`).then((res) => {
      if (res.data.success) {
        reload();
      } else {
        message.error(res.data.message);
      }
    });
  }

  return (
    <>
      <div className="mt-4 bg-white">
        <div className="bg-white p-4 pb-0 text-lg font-bold">
          {data.answer_list.length}个回答
        </div>
        {/* 单个回答 */}
        {data.answer_list.map((item, index) => (
          <div
            key={item.id}
            className={classNames([
              "border-b-solid relative mt-3 border-gray-300 p-8",
              data.answer_id == item.id &&
                "!border-4 !border-solid !border-blue-500",
            ])}
          >
            <div className="flex">
              <img
                src={item.author_data.avatar_url}
                alt="avatar"
                className="h-9 w-9 rounded-full"
              />
              <div className="ml-3">
                <div className="font-bold">{item.author_data.name}</div>
                <div>{dayjs(item.create_time).format("YYYY-MM-DD")}</div>
              </div>
            </div>
            <div
              className={classNames(["content-body mt-2"])}
              suppressHydrationWarning={true}
              dangerouslySetInnerHTML={{ __html: item.content }}
            ></div>
            {data.answer_id == item.id ? (
              <Button
                type="primary"
                onClick={() =>
                  userData?.id == data.author ? cancel() : undefined
                }
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
              <div className="flex select-none justify-between text-gray-500">
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setAnswerReplyShrinkIndex((value) =>
                      value == index ? -1 : index,
                    );
                  }}
                >
                  {answerReplyShrinkIndex == index ? "收起" : "回复"}
                </div>
                {userData?.id == item.author &&
                  // 如果已经采纳，就禁止该答案
                  (data.answer_id == item.id ? (
                    <Tooltip placement="top" title={"被采纳的答案无法删除"}>
                      <div className="cursor-pointer text-gray-400">删除</div>
                    </Tooltip>
                  ) : (
                    <div
                      className="cursor-pointer"
                      onClick={() => deleteAnswer(item.id)}
                    >
                      删除
                    </div>
                  ))}
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
              <Suspense>
                <Comments
                  type="answer"
                  belong_id={item.id}
                  data={item.comment_list}
                />
              </Suspense>
            </div>
            {/* 左侧点赞 */}
            <div
              className={classNames([
                itemClassName,
                "absolute",
                "top-1/2",
                "-left-20",
              ])}
              onClick={
                !userData || userData.id == item.author
                  ? undefined
                  : item.like_data.like_state
                    ? () => unLike(item.id)
                    : () => like(item.id)
              }
            >
              <Badge
                count={item.like_data.like_count}
                color="#adb1b8"
                offset={[10, -10]}
              >
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
