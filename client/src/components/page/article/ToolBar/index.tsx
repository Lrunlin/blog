import Collection from "./Collection";
import Comment from "./Comment";
import Likes from "./Like";
import Share from "./Share";

const ToolBar = () => {
  return (
    <>
      <style jsx>{`
        .tool-bar {
          left: max(0px, calc(50vw - 680px));
        }
      `}</style>
      <div className="tool-bar fixed top-32 select-none">
        {/* 点赞信息 */}
        <Likes />
        {/* 评论 */}
        <Comment />
        {/* 收藏信息 */}
        <Collection />
        {/* 分享 */}
        <Share />
      </div>
    </>
  );
};
export default ToolBar;
