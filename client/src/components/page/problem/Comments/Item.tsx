import { useContext, useState } from "react";
import type { FC } from "react";
import { message } from "antd";
import axios from "@axios";
import type { problemCommentType } from "@type/model/problem";
import classNames from "classnames";
import Image from "@/components/next/Image";
import NoFollowLink from "@/components/next/NoFollowLink";
import { Context } from "@/components/page/problem/ProblemDetail";
import useUserData from "@/store/user/user-data";
import Editor from "./Editor";

interface propsType {
  belong_id: number;
  data: problemCommentType;
  list: problemCommentType[];
  type: "problem" | "answer";
  onFinish?: () => any;
  onSuccess?: () => any;
  onError?: () => any;
}

/** 问答功能中回复评论的的单个评论组件*/
const CommentItem: FC<propsType> = ({ data, list, belong_id, type }) => {
  const [showEditor, setShowEditor] = useState(false);
  let userData = useUserData((s) => s.data);
  let { reload } = useContext(Context);
  function removeComment() {
    axios.delete(`/comment/${data.id}`).then((res) => {
      if (res.data.success) {
        message.success(res.data.message);
        reload();
      } else {
        message.error(res.data.message);
      }
    });
  }

  return (
    <>
      <div
        key={data.id}
        className={classNames([
          "group mt-4",
          !list?.some((item) => data.id == item.id) && "ml-10",
        ])}
      >
        <div className="ml-1 mt-3 flex break-all">
          <NoFollowLink
            href={`/user/${data.user_id}`}
            className="font-bold text-gray-600"
          >
            {data.user_data.name}:
          </NoFollowLink>
          {/* 展示@符号 */}
          {data.reply && (
            <NoFollowLink
              href={`/user/${data.reply.id}`}
              className="ml-1 text-blue-400"
            >
              @{data.reply.name}
            </NoFollowLink>
          )}
          <div
            className="ml-1"
            dangerouslySetInnerHTML={{ __html: data.content }}
          ></div>
        </div>
        {/* 回复、删除 */}
        <div className="flex items-center text-xs text-gray-600">
          <span
            className="mt-3 flex cursor-pointer select-none items-center"
            onClick={() => setShowEditor((state) => !state)}
          >
            <Image
              src="/icon/client/comment.png"
              width={14}
              height={14}
              alt="comment"
            />
            <span className="ml-0.5">{showEditor ? "收起" : "回复"}</span>
          </span>
          {data.user_data.id == userData?.id && (
            <span
              className="ml-3 mt-3 hidden cursor-pointer items-center group-hover:flex"
              onClick={removeComment}
            >
              <Image
                src="/icon/client/delete-fill.png"
                width={14}
                height={14}
                alt="delete"
              />
              <span className="ml-0.5">删除</span>
            </span>
          )}
        </div>
        {/* 编辑器 */}
        {showEditor && (
          <Editor
            type={type}
            belong_id={belong_id}
            reply={data.id}
            onSuccess={() => setShowEditor(false)}
          />
        )}
      </div>
    </>
  );
};
export default CommentItem;
