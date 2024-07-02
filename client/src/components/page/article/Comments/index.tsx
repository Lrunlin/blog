"use client";

import type { FC } from "react";
import useUserData from "@/store/user/user-data";
import useUserSignModel from "@/store/user/user-sign-model-state";
import Comment from "./Comment";
import Editor from "./Editor";

export interface propsType {
  title?: string;
}
/** 文章页面评论组件*/
const Comments: FC<propsType> = ({ title }) => {
  let userData = useUserData((s) => s.data);
  let setModalState = useUserSignModel((s) => s.setData);

  return (
    <div id="commentRoot">
      {title && (
        <div className="mb-4 text-xl font-black" id="comment">
          {title}
        </div>
      )}
      <div>
        {userData ? (
          <Editor id="comment" notHideInput={true} />
        ) : (
          <div className="py-16 text-center">
            <span
              className="cursor-pointer text-blue-400 hover:text-blue-600"
              onClick={() => setModalState("LogIn")}
            >
              请登录
            </span>
          </div>
        )}
      </div>
      <Comment />
    </div>
  );
};
export default Comments;
