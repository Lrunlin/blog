import { useState, useEffect } from "react";
import { Button, message } from "antd";
import type { FC } from "react";
import { useSetRecoilState } from "recoil";
import useUserData from "@/store/user-data";
import { modalStateContext } from "@/components/common/Header/Sign";
import { follow, unfollow } from "@/request/follow";

interface propsType {
  /** 是否关注了该用户*/
  isFollow: boolean;
  /** 用户ID*/
  bloggerID: number;
}

const FollowButton: FC<propsType> = props => {
  let [userData] = useUserData();
  let [isFollow, setIsFollow] = useState(false);
  useEffect(() => {
    setIsFollow(props.isFollow);
  }, [props.isFollow]);

  function followUser() {
    follow(props.bloggerID, "user")
      .then(() => {
        setIsFollow(true);
      })
      .catch(() => {
        message.error("关注失败");
      });
  }
  function unFollowUser() {
    unfollow(props.bloggerID)
      .then(() => {
        setIsFollow(false);
      })
      .catch(() => {});
  }

  let setModalState = useSetRecoilState(modalStateContext);
  if (!userData) {
    return (
      <Button type="primary" ghost onClick={() => setModalState("LogIn")}>
        + 关注
      </Button>
    );
  }
  return (
    <>
      {isFollow ? (
        <Button type="primary" ghost onClick={unFollowUser}>
          取消关注
        </Button>
      ) : (
        <Button type="primary" ghost onClick={followUser}>
          + 关注
        </Button>
      )}
    </>
  );
};
export default FollowButton;
