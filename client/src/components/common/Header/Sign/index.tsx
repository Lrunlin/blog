import { Modal } from "antd";
import dynamic from "next/dynamic";
import useUserSignModel from "@/store/user/user-sign-model-state";
const LogIn = dynamic(import("./LogIn"), { ssr: false });
const LogOn = dynamic(import("./LogOn"), { ssr: false });
const ForgetPassword = dynamic(import("./ForgetPassword"), { ssr: false });

export const componentsList = {
  LogIn: {
    title: "登录",
    component: <LogIn />,
  },
  LogOn: {
    title: "注册",
    component: <LogOn />,
  },
  ForgetPassword: {
    title: "忘记密码",
    component: <ForgetPassword />,
  },
};

/** Modal弹窗，处理用户的注册和登录*/
const Sign = () => {
  let userSignModel = useUserSignModel(s => s);
  function Components() {
    return userSignModel.data ? componentsList[userSignModel.data].component : <></>;
  }
  return (
    <>
      <Modal
        title={<b>{userSignModel.data ? componentsList[userSignModel.data].title : ""}</b>}
        open={!!userSignModel.data}
        width={315}
        footer={null}
        onCancel={() => userSignModel.setData(false)}
      >
        <Components />
      </Modal>
    </>
  );
};
export default Sign;
