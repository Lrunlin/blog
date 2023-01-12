import { useState, useEffect } from "react";
import classNames from "classnames";
import Image from "@/components/next/Image";
import useUserData from "@/store/user-data";
import { useRouter } from "next/router";
import { message, Badge } from "antd";
import axios from "axios";
import itemClassName from "./class";
import { currentArticleDataContext } from "@/pages/article/[id]";
import { useRecoilState } from "recoil";

const Collection = () => {
  let [userData] = useUserData();
  let rotuer = useRouter();
  let id = rotuer.query.id;
  let [currentArticleData, setCurrentArticleData] = useRecoilState(currentArticleDataContext);
  let [collectionState, setCollectionState] = useState<boolean | undefined>();
  useEffect(() => {
    if (!userData) {
      return;
    }
    axios.get(`/collection/state/${id}`).then(res => setCollectionState(res.data.success));
  }, [userData]);
  function collection() {
    axios.post(`/collection/${id}`, { type: "article" }).then(res => {
      if (res.data.success) {
        setCollectionState(true);
        setCurrentArticleData(_data => ({
          ..._data,
          collection_count: _data.collection_count + 1,
        }));
      } else {
        message.error(res.data.message);
      }
    });
  }
  function unCollection() {
    axios.delete(`/collection/${id}`).then(res => {
      if (res.data.success) {
        setCollectionState(false);
        setCurrentArticleData(_data => ({
          ..._data,
          collection_count: _data.collection_count - 1,
        }));
      } else {
        message.error(res.data.message);
      }
    });
  }
  return (
    <>
      <div
        className={classNames([itemClassName, "hover:text-blue-500"])}
        onClick={
          collectionState == undefined ? () => {} : collectionState ? unCollection : collection
        }
      >
        <Badge count={currentArticleData.collection_count} color="#adb1b8" offset={[10, -10]}>
          <Image
            src={collectionState ? "/icon/collection-fill.png" : "/icon/collection.png"}
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
