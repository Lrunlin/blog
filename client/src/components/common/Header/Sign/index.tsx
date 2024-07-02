"use client";

import { Suspense } from "react";
import { Modal } from "antd";
import useUserSignModel from "@/store/user/user-sign-model-state";
import ForgetPassword from "./ForgetPassword";
import LogIn from "./LogIn";
import LogOn from "./LogOn";

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
  let userSignModel = useUserSignModel((s) => s);
  function Components() {
    return userSignModel.data ? (
      componentsList[userSignModel.data].component
    ) : (
      <></>
    );
  }
  return (
    <>
      <Modal
        title={
          <b>
            {userSignModel.data ? componentsList[userSignModel.data].title : ""}
          </b>
        }
        open={!!userSignModel.data}
        width={315}
        footer={null}
        onCancel={() => userSignModel.setData(false)}
      >
        <Suspense>
          <Components />
        </Suspense>
      </Modal>
    </>
  );
};
export default Sign;
