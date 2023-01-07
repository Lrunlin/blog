import Collection from "./Collection";
import Comment from "./Comment";
import Likes from "./Likes";

const ToolBar = () => {
  return (
    <div className="fixed top-32 left-[calc(50vw-680px)] select-none">
      {/* 点赞信息 */}
      <Likes/>
      {/* 评论 */}
      <Comment />
      {/* 收藏信息 */}
      <Collection />
    </div>
  );
};
export default ToolBar;
