import Collection from "./Collection";
import Comment from "./Comment";
import Likes from "./Like";

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
      </div>
    </>
  );
};
export default ToolBar;
