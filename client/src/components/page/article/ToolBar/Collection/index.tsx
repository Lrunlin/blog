import { useState } from "react";
import classNames from "classnames";
import Image from "@/components/next/Image";
import useUserData from "@/store/user-data";
import { useParams } from "next/navigation";
import { message, Badge } from "antd";
import itemClassName from "../class";
import { currentArticleDataContext } from "@/pages/article/[id]";
import { useRecoilState } from "recoil";
import { uncollection } from "@/request/collection";
import dynamic from "next/dynamic";
const Modal = dynamic(() => import("@/components/common/CollectionModal"), { ssr: false });

const Collection = () => {
  let [userData] = useUserData();
  let params = useParams();
  let id = params.id as string;
  let [currentArticleData, setCurrentArticleData] = useRecoilState(currentArticleDataContext);

  const [isOpenModal, setIsOpenModal] = useState(false);
  function unCollectionArticle() {
    uncollection(id)
      .then(() => {
        setCurrentArticleData(_data => ({
          ..._data,
          collection_count: _data.collection_count - 1,
          collection_state: [],
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
            : currentArticleData.collection_state?.length == 1
            ? unCollectionArticle
            : () => setIsOpenModal(true)
        }
      >
        <Badge count={currentArticleData.collection_count} color="#adb1b8" offset={[10, -10]}>
          <Image
            src={
              currentArticleData.collection_state?.length
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
          setCurrentArticleData(_data => ({
            ..._data,
            collection_count: _data.collection_count - 1,
            collection_state: [],
          }));
        }}
        onUpdate={checkList => {
          setCurrentArticleData(_data => ({
            ..._data,
            collection_state: checkList,
          }));
        }}
        onCreate={checkList => {
          setCurrentArticleData(_data => ({
            ..._data,
            collection_count: _data.collection_count + 1,
            collection_state: checkList,
          }));
        }}
        defaultChecked={currentArticleData.collection_state}
        open={isOpenModal}
        onCancel={() => setIsOpenModal(false)}
      />
    </>
  );
};
export default Collection;
