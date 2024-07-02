import { useState } from "react";
import { useParams } from "next/navigation";
import { Badge, message } from "antd";
import classNames from "classnames";
import Modal from "@/components/common/CollectionModal";
import Image from "@/components/next/Image";
import userUserCurrentArticleData from "@/store/user/user-current-article-data";
import useUserData from "@/store/user/user-data";
import { uncollection } from "@/request/collection";
import itemClassName from "../class";

const Collection = () => {
  let userData = useUserData((s) => s.data);
  let params = useParams();
  let id = params.id as string;
  let currentArticleData = userUserCurrentArticleData((s) => s);

  const [isOpenModal, setIsOpenModal] = useState(false);
  function unCollectionArticle() {
    uncollection(id)
      .then(() => {
        currentArticleData.updateData({
          collection_count: currentArticleData.data.collection_count - 1,
          collection_state: [],
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
            : currentArticleData.data.collection_state?.length == 1
              ? unCollectionArticle
              : () => setIsOpenModal(true)
        }
      >
        <Badge
          count={currentArticleData.data.collection_count}
          color="#adb1b8"
          offset={[10, -10]}
        >
          <Image
            src={
              currentArticleData.data.collection_state?.length
                ? "/icon/client/collection-fill.png"
                : "/icon/client/collection.png"
            }
            width={24}
            height={24}
            alt="collection"
          />
        </Badge>
      </div>
      <Modal
        type="article"
        onDelete={() => {
          currentArticleData.updateData({
            collection_count: currentArticleData.data.collection_count - 1,
            collection_state: [],
          });
        }}
        onUpdate={(checkList) => {
          currentArticleData.updateData({
            collection_state: checkList,
          });
        }}
        onCreate={(checkList) => {
          currentArticleData.updateData({
            collection_count: currentArticleData.data.collection_count + 1,
            collection_state: checkList,
          });
        }}
        defaultChecked={currentArticleData.data.collection_state}
        open={isOpenModal}
        onCancel={() => setIsOpenModal(false)}
      />
    </>
  );
};
export default Collection;
