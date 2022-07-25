import { useState, useMemo } from "react";
import { atom, useRecoilValue } from "recoil";
import { Button, Modal, Form, Input } from "antd";
import Login from "./Login";

/** 弹窗组件显示的状态管理管理*/
const loginModalContext = atom({
  key: "login-modal",
  default:{
    title:'登录',
    component:<Login/>
  },
});
const LogIn = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const ComponentsValue = useRecoilValue(loginModalContext);
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
export default LogIn;
