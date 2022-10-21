import { atom, useRecoilState } from "recoil";
import { Modal } from "antd";
import dynamic from "next/dynamic";
const LogIn = dynamic(import("./LogIn"), { ssr: false });
const LogOn = dynamic(import("./LogOn"), { ssr: false });
const ForgetPassword = dynamic(import("./ForgetPassword"), { ssr: false });

let componentsList = {
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

/** 弹窗组件显示的状态管理管理*/
export const modalStateContext = atom<false | keyof typeof componentsList>({
  key: "modal-state",
  default: false,
});

/** Modal弹窗，处理用户的注册和登录*/
const Sign = () => {
  const [ComponentsValue, setComponentsValue] = useRecoilState(modalStateContext);

  function Components() {
    return ComponentsValue ? componentsList[ComponentsValue].component : <></>;
  }
  return (
    <>
      <Modal
        title={<b>{ComponentsValue ? componentsList[ComponentsValue].title : ""}</b>}
        open={!!ComponentsValue}
        width={315}
        footer={null}
        onCancel={() => setComponentsValue(false)}
      >
        <Components />
      </Modal>
    </>
  );
};
export default Sign;
