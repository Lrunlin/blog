import { useState } from "react";
import { Button, Form, Input, Divider, message } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import { useSetRecoilState } from "recoil";
import axios from "axios";
import { modalStateContext, signModalContext } from "../index";

// 用于在Modal中切换的组件
import LogOn from "../LogOn";
import ForgetPassword from "../ForgetPassword";

import { action as useUserAuthAction } from "@/store/user-auth";
import { action as useUserDataAction } from "@/store/user-data";

/** 弹窗中的登录组件*/
const LogIn = () => {
  let closeModal = useSetRecoilState(modalStateContext);

  const [isLoad, setIsLoad] = useState(false);
  function logIn(values: any) {
    setIsLoad(true);
    axios
      .post("/login/email", values)
      .then(res => {
        if (res.data.success) {
          message.success(res.data.message);
          closeModal(false);
          localStorage.token = res.data.token;
          useUserAuthAction();
          useUserDataAction();
        } else {
          message.error(res.data.message);
        }
      })
      .finally(() => setIsLoad(false));
  }

  let switchComponent = useSetRecoilState(signModalContext);
  return (
    <>
      <Form onFinish={logIn} autoComplete="off">
        <Form.Item
          name="email"
          rules={[
            { required: true, type: "email", message: "请填写邮箱" },
            { min: 5, max: 30, message: "邮箱长度为5-30" },
          ]}
        >
          <Input placeholder="邮箱" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: "请输入正确密码" },
            { min: 8, max: 16, type: "string", message: "密码长度在8-16之间" },
            {
              pattern: new RegExp(/^[a-zA-Z0-9_]{8,16}$/),
              message: "密码格式为数字、字母或下划线",
            },
          ]}
        >
          <Input.Password placeholder="密码" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={isLoad}>
            登录
          </Button>
        </Form.Item>
      </Form>
      <div className="flex justify-between">
        <span
          className="text-sky-600 cursor-pointer"
          onClick={() =>
            switchComponent({
              title: "邮箱注册",
              component: <LogOn />,
            })
          }
        >
          邮箱注册
        </span>
        <span
          className="text-sky-600 cursor-pointer"
          onClick={() =>
            switchComponent({
              title: "忘记密码",
              component: <ForgetPassword />,
            })
          }
        >
          忘记密码
        </span>
      </div>
      <div>
        <Divider className="my-3" />
        <div className="flex justify-evenly">
          <GithubOutlined className="text-xl cursor-pointer" />
        </div>
      </div>
    </>
  );
};
export default LogIn;
