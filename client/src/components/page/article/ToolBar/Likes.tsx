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

const Likes = () => {
  let [userData] = useUserData();
  let rotuer = useRouter();
  let id = rotuer.query.id;
  let [currentArticleData, setCurrentArticleData] = useRecoilState(currentArticleDataContext);
  let [likeState, setLikeStateState] = useState<boolean | undefined>();
  useEffect(() => {
    if (!userData) {
      return;
    }
    axios.get(`/likes/state/${id}`).then(res => {
      setLikeStateState(res.data.success);
    });
  }, [userData]);

  function like() {
    axios.post(`/likes/${id}`).then(res => {
      if (res.data.success) {
        message.success(res.data.message);
        setLikeStateState(true);
        setCurrentArticleData(_data => ({
          ..._data,
          likes_count: _data.likes_count + 1,
        }));
      } else {
        message.error(res.data.message);
      }
    });
  }
  function unLike() {
    axios.delete(`/likes/${id}`).then(res => {
      if (res.data.success) {
        message.success(res.data.message);
        setLikeStateState(false);
        setCurrentArticleData(_data => ({
          ..._data,
          likes_count: _data.likes_count - 1,
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
        onClick={likeState == undefined ? () => {} : likeState ? unLike : like}
      >
        <Badge count={currentArticleData.likes_count} color="#adb1b8" offset={[10, -10]}>
          <Image
            src={likeState ? "/icon/likes-fill.png" : "/icon/likes.png"}
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