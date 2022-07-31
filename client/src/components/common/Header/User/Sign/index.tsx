import { useState } from "react";
import { atom, useRecoilValue, useRecoilState } from "recoil";
import { Modal } from "antd";
import LogIn from "./LogIn";
import LogOn from "./LogOn";
import ForgetPassword from "./ForgetPassword";

/** 用于对Modal组件的显示与隐藏*/
export const modalStateContext = atom({
  key: "model-state-context",
  default: false,
});

/** 弹窗组件显示的状态管理管理*/
export const signModalContext = atom({
  key: "login-modal",
  default: {
    title: "登录",
    component: <LogIn />,
    // component: <LogOn />,
    // component: <ForgetPassword />,
  },
});

/** Modal弹窗，处理用户的注册和登录*/
const Sign = () => {
  const [isModalVisible, setIsModalVisible] = useRecoilState(modalStateContext);
  
  
  const ComponentsValue = useRecoilValue(signModalContext);
  function Components() {
    return ComponentsValue.component;
  }
  return (
    <>
      <Modal
        title={<b>{ComponentsValue.title}</b>}
        visible={isModalVisible}
        width={315}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
      >
        <Components />
      </Modal>
    </>
  );
};
export default Sign;
