import { useRecoilValue, useSetRecoilState } from "recoil";
import { userDataContext } from "@/store/user-data";
import { modalStateContext } from "@/components/common/Header/Sign";
import Editor from "./Editor";
import Comment from "./Comment";

const Comments = () => {
  let userData = useRecoilValue(userDataContext);
  let setModalState = useSetRecoilState(modalStateContext);
  return (
    <>
      <div className="text-xl font-black mb-4">评论</div>
      <div>
        {userData ? (
          <Editor id="comment" />
        ) : (
          <div className="py-16 text-center">
            <a onClick={() => setModalState("LogIn")}>请登录</a>
          </div>
        )}
      </div>
      <Comment />
    </>
  );
};
export default Comments;
