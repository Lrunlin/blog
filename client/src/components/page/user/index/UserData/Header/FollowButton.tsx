import type { FC } from "react";
import { useRouter } from "next/navigation";
import { Button, message } from "antd";
import axios from "@axios";
import type { response } from "@type/common/response";
import type { FollowAttributes } from "@type/model-attribute";
import useFetch from "@/common/hooks/useFetch";
import useUserData from "@/store/user/user-data";
import useUserSignModel from "@/store/user/user-sign-model-state";
import { follow, unfollow } from "@/request/follow";

interface propsType {
  bloggerID: FollowAttributes["belong_id"];
}
const SwitchButton: FC<propsType> = (props) => {
  let { data, error, refetch } = useFetch(() =>
    axios
      .get<response>(`/follow/state/${props.bloggerID}`)
      .then((res) => res.data.success),
  );

  function followUser() {
    follow(props.bloggerID, "user")
      .then(() => {
        refetch();
      })
      .catch(() => {
        message.error("关注失败");
      });
  }
  function unFollowUser() {
    unfollow(props.bloggerID)
      .then(() => {
        refetch();
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
              className="rounded bg-[rgb(30,128,255)] text-[#1e80ff]"
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
const FollowButton: FC<propsType> = (props) => {
  let userData = useUserData((s) => s.data);
  let setModalState = useUserSignModel((s) => s.setData);
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
              className="rounded bg-[rgb(30,128,255)] text-[#1e80ff]"
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
          className="rounded bg-[rgb(30,128,255)] text-[#1e80ff]"
          onClick={() => setModalState("LogIn")}
        >
          +关注
        </Button>
      )}
    </>
  );
};
export default FollowButton;
