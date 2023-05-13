import type { FC } from "react";
import { Button, message } from "antd";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { modalStateContext } from "@/components/common/Header/Sign";
import useSWR from "swr";
import axios from "axios";
import { userDataContext } from "@/store/user-data";
import type { response } from "@type/common/response";
import type { FollowAttributes } from "@type/model-attribute";
import { useRouter } from "next/navigation";
import { follow, unfollow } from "@/request/follow";

interface propsType {
  bloggerID: FollowAttributes["belong_id"];
}
const SwitchButton: FC<propsType> = props => {
  let { data, error, mutate } = useSWR(`follow-user-data-${props.bloggerID}`, () =>
    axios.get<response>(`/follow/state/${props.bloggerID}`).then(res => res.data.success)
  );

  function followUser() {
    follow(props.bloggerID, "user")
      .then(() => {
        mutate();
      })
      .catch(() => {
        message.error("关注失败");
      });
  }
  function unFollowUser() {
    unfollow(props.bloggerID)
      .then(() => {
        mutate();
      })
      .catch(() => {
        message.error("取关失败");
      });
  }
  return (
    <>
      {data != undefined && (
        <>
          {!data ? (
            <Button
              ghost
              type="primary"
              size="small"
              className="rounded text-[#1e80ff] bg-[rgb(30,128,255)]"
              onClick={followUser}
            >
              +关注
            </Button>
          ) : (
            <Button size="small" ghost type="primary" onClick={unFollowUser}>
              已关注
            </Button>
          )}
        </>
      )}
      {error && (
        <Button size="small" ghost disabled danger>
          请求错误
        </Button>
      )}
    </>
  );
};

/**
 * 文章页面顶部的关注按钮，传递作者ID判断按钮显示状态
 * @params bloggerID {number} 文章发布者的ID
 */
const FollowButton: FC<propsType> = props => {
  let userData = useRecoilValue(userDataContext);
  let setModalState = useSetRecoilState(modalStateContext);
  let router = useRouter();
  return (
    <>
      {userData ? (
        <>
          {userData.id == props.bloggerID ? (
            <Button
              ghost
              size="small"
              type="primary"
              className="rounded text-[#1e80ff] bg-[rgb(30,128,255)]"
              onClick={() => router.push("/user/settings/profile")}
            >
              编辑资料
            </Button>
          ) : (
            <SwitchButton bloggerID={props.bloggerID} />
          )}
        </>
      ) : (
        <Button
          ghost
          size="small"
          type="primary"
          className="rounded text-[#1e80ff] bg-[rgb(30,128,255)]"
          onClick={() => setModalState("LogIn")}
        >
          +关注
        </Button>
      )}
    </>
  );
};
export default FollowButton;
