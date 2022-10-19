import { useState, useEffect } from "react";
import { currentArticleDataContext } from "@/pages/article/[id]";
import { useRecoilValue } from "recoil";
import useUserData from "@/store/user-data";
import Image from "@/components/next/Image";
import classNames from "classnames";
import { useRouter } from "next/router";
import axios from "axios";
import { message, Badge } from "antd";

let itemClassName = classNames([
  "sm:hidden",
  "w-14",
  "h-14",
  "text-[#707070]",
  "flex",
  "items-center",
  "justify-center",
  "bg-white",
  "rounded-full",
  "shadow-md",
  "hover:shadow-xl",
  "cursor-pointer",
  "opacity-70",
  "hover:opacity-100",
  "text-xl",
]);

const ToolBar = () => {
  let [userData] = useUserData();
  let rotuer = useRouter();
  let id = rotuer.query.id;

  const [collectionState, setCollectionState] = useState<boolean | undefined>(undefined);
  useEffect(() => {
    if (!userData) {
      return;
    }
    axios.get(`/collection/state/${id}`).then(res => setCollectionState(res.data.success));
  }, [userData]);

  function collection() {
    axios.post(`/collection/${id}`).then(res => {
      if (res.data.success) {
        message.success(res.data.message);
        setCollectionState(true);
      } else {
        message.error(res.data.message);
      }
    });
  }
  function unCollection() {
    axios.delete(`/collection/${id}`).then(res => {
      if (res.data.success) {
        message.success(res.data.message);
        setCollectionState(false);
      } else {
        message.error(res.data.message);
      }
    });
  }

  let currentArticleData = useRecoilValue(currentArticleDataContext);
  return (
    <div className="fixed top-32 left-[calc(50vw-680px)] select-none">
      <a className={classNames([itemClassName, "block"])} href="#comment">
        <Badge count={currentArticleData.comment_count}>
          <Image src="/icon/comments.png" height={24} width={24} />
        </Badge>
      </a>
      <div
        className={classNames([itemClassName, "mt-4", "hover:text-blue-500"])}
        onClick={
          collectionState == undefined ? () => {} : collectionState ? unCollection : collection
        }
      >
        {collectionState ? (
          <Image src="/icon/collection-fill.png" width={24} height={24} />
        ) : (
          <Image src="/icon/collection.png" width={24} height={24} />
        )}
      </div>
    </div>
  );
};
export default ToolBar;
