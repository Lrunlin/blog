import { useRecoilValue, useSetRecoilState } from "recoil";
import { userDataContext } from "@/store/user-data";
import { modalStateContext } from "@/components/common/Header/Sign";
import Editor from "./Editor";
import Comment from "./Comment";

/** 文章页面评论组件*/
const Comments = () => {
  let userData = useRecoilValue(userDataContext);
  let setModalState = useSetRecoilState(modalStateContext);
  return (
    <>
      <div className="text-xl font-black mb-4" id="comment">
        评论
      </div>
      <div>
        {userData ? (
          <Editor id="comment" />
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
    </>
  );
};
export default Comments;
