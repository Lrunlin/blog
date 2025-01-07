"use client";

import { useRef } from "react";
import { Result } from "antd";
import axios from "@axios";
import useFetch from "@/common/hooks/useFetch";
import UpdateEmailModal, {
  event,
} from "@/components/page/user/setting/UpdateEmailModal";
import UpdatePasswordModal, {
  event as updatePasswordEvent,
} from "@/components/page/user/setting/UpdatePasswordModal";
import useUserData from "@/store/user/user-data";

const Account = () => {
  let userData = useUserData((s) => s.data);
  let { data, error } = useFetch(async () =>
    userData
      ? axios.get(`/user/data/${userData?.id}`).then((res) => res.data.data)
      : undefined,
  );

  function updateGithub() {
    window.open(
      `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`,
      "_blank",
      "width=800,height=600,menubar=no,toolbar=no, status=no,scrollbars=yes",
    );
  }
  let emailModalRef = useRef() as event;
  let passwordModalRef = useRef() as updatePasswordEvent;

  return (
    <>
      <h2 className="border-b-solid border-gray-200 pb-2">账号设置</h2>
      {error && <Result status="404" title="没有找到指定的用户" />}
      {data && (
        <div>
          <div className="flex h-14 items-center justify-between px-4">
            <div className="flex">
              <div className="w-14">邮箱:</div>
              <div>{data.email || "未绑定"}</div>
            </div>
            <UpdateEmailModal ref={emailModalRef} />
            <div
              className="cursor-pointer text-blue-400"
              onClick={() => emailModalRef.current.onOpen()}
            >
              换绑
            </div>
          </div>
          <div className="flex h-14 items-center justify-between px-4">
            <div className="flex">
              <div className="w-14">GitHub:</div>
              <div>{data.github || "未绑定"}</div>
            </div>
            <div
              className="cursor-pointer text-blue-400"
              onClick={updateGithub}
            >
              换绑
            </div>
          </div>
          <div className="flex h-14 items-center justify-between px-4">
            <div className="flex">
              <div className="w-14">密码</div>
              <UpdatePasswordModal ref={passwordModalRef} />
            </div>
            <div
              className="cursor-pointer text-blue-400"
              onClick={() => passwordModalRef.current.onOpen()}
            >
              修改
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Account;
