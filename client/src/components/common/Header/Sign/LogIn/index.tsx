import { useState } from "react";
import { Button, Form, Input, Divider, message } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import { useSetRecoilState } from "recoil";
import axios from "axios";
import { modalStateContext } from "../index";
import cookie from "js-cookie";


import useUserData from "@/store/user-data";

/** 弹窗中的登录组件*/
const LogIn = () => {
  let setModalState = useSetRecoilState(modalStateContext);
  const [, refreshDataAction] = useUserData();

  const [isLoad, setIsLoad] = useState(false);
  function logIn(values: any) {
    setIsLoad(true);
    axios
      .post("/login/email", values)
      .then(res => {
        if (res.data.success) {
          message.success(res.data.message);
          setModalState(false);
          cookie.set("token", res.data.token, { expires: 365 });
          refreshDataAction();
        } else {
          message.error(res.data.message);
        }
      })
      .finally(() => setIsLoad(false));
  }

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
        <span className="text-sky-600 cursor-pointer" onClick={() => setModalState("LogOn")}>
          邮箱注册
        </span>
        <span
          className="text-sky-600 cursor-pointer"
          onClick={() => setModalState("ForgetPassword")}
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
