import type { FC } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { userDataContext } from "@/store/user-data";
import { modalStateContext } from "@/components/common/Header/Sign";
import Editor from "./Editor";
import Comment from "./Comment";
import { articleCommentType } from "@type/model/article-comment";

export const editorOptionContext = atom<{
  activeEmojiID: null | string | number;
  activeInputID: null | string | number;
  data: articleCommentType[] | null;
}>({
  key: "editor-option-context",
  default: {
    activeEmojiID: null,
    activeInputID: null,
    data: null,
  },
});

export interface propsType {
  title?: string;
}
/** 文章页面评论组件*/
const Comments: FC<propsType> = ({ title }) => {
  let userData = useRecoilValue(userDataContext);
  let setModalState = useSetRecoilState(modalStateContext);
  return (
    <div id="commentRoot">
      {title && (
        <div className="text-xl font-black mb-4" id="comment">
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
