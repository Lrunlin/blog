import { useRef } from "react";
import { Result } from "antd";
import useSwr from "swr";
import axios from "axios";
import useUserData from "@/store/user-data";
import Layout from "@/components/page/user/setting/Layout";
import UpdateEmailModal, { event } from "@/components/page/user/setting/UpdateEmailModal";
import UpdatePasswordModal, {
  event as updatePasswordEvent,
} from "@/components/page/user/setting/UpdatePasswordModal";

const Account = () => {
  let [userData] = useUserData();
  let { data, error } = useSwr(`user-account-set-${userData?.id}`, () =>
    userData ? axios.get(`/user/data/${userData?.id}`).then(res => res.data.data) : undefined
  );

  function updateGithub() {
    window.open(
      `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`,
      "_blank",
      "width=800,height=600,menubar=no,toolbar=no, status=no,scrollbars=yes"
    );
  }
  let emailModalRef = useRef() as event;
  let passwordModalRef = useRef() as updatePasswordEvent;

  return (
    <Layout>
      <h2 className="pb-2 border-b-solid border-gray-200">账号设置</h2>
      {error && <Result status="404" title="没有找到指定的用户" />}
      {data && (
        <div>
          <div className="px-4 h-14 flex justify-between items-center">
            <div className="flex">
              <div className="w-14">邮箱:</div>
              <div>{data.email || "未绑定"}</div>
            </div>
            <UpdateEmailModal event={emailModalRef} />
            <div
              className="text-blue-400 cursor-pointer"
              onClick={() => emailModalRef.current.onOpen()}
            >
              换绑
            </div>
          </div>
          <div className="px-4 h-14 flex justify-between items-center">
            <div className="flex">
              <div className="w-14">QQ:</div>
              <div>{data.qq || "未绑定"}</div>
            </div>
            <div className="text-blue-400 cursor-pointer">换绑</div>
          </div>
          <div className="px-4 h-14 flex justify-between items-center">
            <div className="flex">
              <div className="w-14">GitHub:</div>
              <div>{data.github || "未绑定"}</div>
            </div>
            <div className="text-blue-400 cursor-pointer" onClick={updateGithub}>
              换绑
            </div>
          </div>
          <div className="px-4 h-14 flex justify-between items-center">
            <div className="flex">
              <div className="w-14">密码</div>
              <UpdatePasswordModal event={passwordModalRef} />
            </div>
            <div
              className="text-blue-400 cursor-pointer"
              onClick={() => passwordModalRef.current.onOpen()}
            >
              修改
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};
export default Account;
