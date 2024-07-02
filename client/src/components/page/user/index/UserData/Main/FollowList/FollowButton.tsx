import { useEffect, useState } from "react";
import type { FC } from "react";
import { Button, message } from "antd";
import useUserData from "@/store/user/user-data";
import useUserSignModel from "@/store/user/user-sign-model-state";
import { follow, unfollow } from "@/request/follow";

interface propsType {
  /** 是否关注了该用户*/
  isFollow: boolean;
  /** 用户ID*/
  bloggerID: number;
}

const FollowButton: FC<propsType> = (props) => {
  let userData = useUserData((s) => s.data);
  let setModalState = useUserSignModel((s) => s.setData);
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
