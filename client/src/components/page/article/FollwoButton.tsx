import type { FC } from "react";
import { Button } from "antd";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { modalStateContext } from "@/components/common/Header/Sign";
import useSWR from "swr";
import axios from "axios";
import { userDataContext } from "@/store/user-data";
import type { response } from "@type/response";
import type { FollowAttributes } from "@type/model-attribute";

interface propsType {
  bloggerID: FollowAttributes["blogger_id"];
}

const SwitchButton: FC<propsType> = props => {
  let { data, error, mutate } = useSWR("follow-user-state", () =>
    axios.get<response>(`/follow/state/${props.bloggerID}`).then(res => res.data.success)
  );
  function follow() {
    axios.post<response>(`/follow/${props.bloggerID}`).then(res => {
      mutate();
    });
  }
  function unfollow() {
    axios.delete<response>(`/follow/${props.bloggerID}`).then(res => {
      mutate();
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
              className="rounded text-[#1e80ff] bg-[rgb(30,128,255)]"
              onClick={follow}
            >
              +关注
            </Button>
          ) : (
            <Button ghost type="primary" onClick={unfollow}>
              已关注
            </Button>
          )}
        </>
      )}
      {error && (
        <Button ghost disabled danger>
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
  return (
    <>
      {userData ? (
        <SwitchButton bloggerID={props.bloggerID} />
      ) : (
        <Button
          ghost
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
