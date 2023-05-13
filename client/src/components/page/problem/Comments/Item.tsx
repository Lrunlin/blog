import { useState, useContext } from "react";
import type { FC } from "react";
import { useRecoilValue } from "recoil";
import { userDataContext } from "@/store/user-data";
import Image from "@/components/next/Image";
import { message } from "antd";
import Editor from "./Editor";
import classNames from "classnames";
import axios from "axios";
import NoFollowLink from "@/components/next/NoFollowLink";
import type { problemCommentType } from "@type/model/problem";
import { Context } from "@/pages/problem/[id]";

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
  let userData = useRecoilValue(userDataContext);
  let { reload } = useContext(Context);
  function removeComment() {
    axios.delete(`/comment/${data.id}`).then(res => {
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
        className={classNames(["mt-4 group", !list?.some(item => data.id == item.id) && "ml-10"])}
      >
        <div className="mt-3 ml-1 break-all flex">
          <NoFollowLink href={`/user/${data.user_id}`} className="font-bold text-gray-600">
            {data.user_data.name}:
          </NoFollowLink>
          {/* 展示@符号 */}
          {data.reply && (
            <NoFollowLink href={`/user/${data.reply.id}`} className="text-blue-400 ml-1">
              @{data.reply.name}
            </NoFollowLink>
          )}
          <div className="ml-1" dangerouslySetInnerHTML={{ __html: data.content }}></div>
        </div>
        {/* 回复、删除 */}
        <div className="flex items-center text-xs text-gray-600">
          <span
            className="mt-3 flex items-center cursor-pointer select-none"
            onClick={() => setShowEditor(state => !state)}
          >
            <Image src="/icon/client/comment.png" width={14} height={14} alt="comment" />
            <span className="ml-0.5">{showEditor ? "收起" : "回复"}</span>
          </span>
          {data.user_data.id == userData?.id && (
            <span
              className="mt-3 ml-3 hidden group-hover:flex items-center cursor-pointer "
              onClick={removeComment}
            >
              <Image src="/icon/client/delete-fill.png" width={14} height={14} alt="delete" />
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
