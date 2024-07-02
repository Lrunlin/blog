import { useParams } from "next/navigation";
import { Badge, message } from "antd";
import classNames from "classnames";
import Image from "@/components/next/Image";
import userUserCurrentArticleData from "@/store/user/user-current-article-data";
import useUserData from "@/store/user/user-data";
import { like, unlike } from "@/request/like";
import itemClassName from "./class";

const Likes = () => {
  let userData = useUserData((s) => s.data);
  let params = useParams();
  let id = params.id as string;

  let currentArticleData = userUserCurrentArticleData((s) => s);

  function likeArticle() {
    like(id, "article")
      .then(() => {
        currentArticleData.updateData({
          like_count: currentArticleData.data.like_count + 1,
          like_state: 1,
        });
      })
      .catch(() => {
        message.error("点赞失败");
      });
  }
  function unLikeArticle() {
    unlike(id)
      .then(() => {
        currentArticleData.updateData({
          like_count: currentArticleData.data.like_count - 1,
          like_state: 1,
        });
      })
      .catch(() => {
        message.error("取消失败");
      });
  }

  return (
    <>
      <div
        className={classNames([itemClassName, "hover:text-blue-500"])}
        onClick={
          !userData || userData?.id == currentArticleData.data.author
            ? () => {}
            : currentArticleData.data.like_count
              ? unLikeArticle
              : likeArticle
        }
      >
        <Badge
          count={currentArticleData.data.like_count}
          color="#adb1b8"
          offset={[10, -10]}
        >
          <Image
            src={
              currentArticleData.data.like_state
                ? "/icon/client/likes-fill.png"
                : "/icon/client/likes.png"
            }
            width={24}
            height={24}
            alt="likes"
          />
        </Badge>
      </div>
    </>
  );
};
export default Likes;
