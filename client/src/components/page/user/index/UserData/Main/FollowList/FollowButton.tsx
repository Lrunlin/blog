import { useState, useEffect } from "react";
import { Button, message } from "antd";
import type { FC } from "react";
import { useSetRecoilState } from "recoil";
import useUserData from "@/store/user-data";
import { modalStateContext } from "@/components/common/Header/Sign";
import axios from "axios";

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

  function follow() {
    axios.post(`/follow/${props.bloggerID}`).then(res => {
      if (res.data.success) {
        message.success(res.data.message);
        setIsFollow(true);
      } else {
        message.error(res.data.message);
      }
    });
  }
  function unfollow() {
    axios.delete(`/follow/${props.bloggerID}`).then(res => {
      if (res.data.success) {
        message.success(res.data.message);
        setIsFollow(false);
      } else {
        message.error(res.data.message);
      }
    });
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
        <Button type="primary" ghost onClick={unfollow}>
          取消关注
        </Button>
      ) : (
        <Button type="primary" ghost onClick={follow}>
          + 关注
        </Button>
      )}
    </>
  );
};
export default FollowButton;
