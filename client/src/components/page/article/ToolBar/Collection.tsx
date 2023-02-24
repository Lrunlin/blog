import classNames from "classnames";
import Image from "@/components/next/Image";
import useUserData from "@/store/user-data";
import { useSearchParams } from "next/navigation";
import { message, Badge } from "antd";
import itemClassName from "./class";
import { currentArticleDataContext } from "@/pages/article/[id]";
import { useRecoilState } from "recoil";
import { collection, uncollection } from "@/request/collection";

const Collection = () => {
  let [userData] = useUserData();
  let searchParams = useSearchParams();
  let id = searchParams.get("id") as string;
  let [currentArticleData, setCurrentArticleData] = useRecoilState(currentArticleDataContext);
  function collectionArticle() {
    collection(id, "article")
      .then(() => {
        setCurrentArticleData(_data => ({
          ..._data,
          collection_count: _data.collection_count + 1,
          collection_state: 1,
        }));
      })
      .catch(() => {
        message.error("收藏失败");
      });
  }
  function unCollectionArticle() {
    uncollection(id)
      .then(() => {
        setCurrentArticleData(_data => ({
          ..._data,
          collection_count: _data.collection_count - 1,
          collection_state: 0,
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
            : currentArticleData.collection_state
            ? unCollectionArticle
            : collectionArticle
        }
      >
        <Badge count={currentArticleData.collection_count} color="#adb1b8" offset={[10, -10]}>
          <Image
            src={
              currentArticleData.collection_state
                ? "/icon/collection-fill.png"
                : "/icon/collection.png"
            }
            width={24}
            height={24}
            alt="collection"
          />
        </Badge>
      </div>
    </>
  );
};
export default Collection;
