import classNames from "classnames";
import Image from "@/components/next/Image";
import useUserData from "@/store/user-data";
import { useParams } from "next/navigation";
import { message, Badge } from "antd";
import itemClassName from "./class";
import { currentArticleDataContext } from "@/pages/article/[id]";
import { useRecoilState } from "recoil";
import { like, unlike } from "@/request/like";

const Likes = () => {
  let [userData] = useUserData();
  let params = useParams();
  let id = params.id as string;

  let [currentArticleData, setCurrentArticleData] = useRecoilState(currentArticleDataContext);

  function likeArticle() {
    like(id, "article")
      .then(() => {
        setCurrentArticleData(_data => ({
          ..._data,
          like_count: _data.like_count + 1,
          like_state: 1,
        }));
      })
      .catch(() => {
        message.error("点赞失败");
      });
  }
  function unLikeArticle() {
    unlike(id)
      .then(() => {
        setCurrentArticleData(_data => ({
          ..._data,
          like_count: _data.like_count - 1,
          like_state: 0,
        }));
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
          !userData || userData?.id == currentArticleData.author
            ? () => {}
            : currentArticleData.like_count
            ? unLikeArticle
            : likeArticle
        }
      >
        <Badge count={currentArticleData.like_count} color="#adb1b8" offset={[10, -10]}>
          <Image
            src={
              currentArticleData.like_state
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
