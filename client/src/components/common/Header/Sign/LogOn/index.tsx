import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { modalStateContext } from "../index";

const Logon = () => {
  const [isLoad, setIsLoad] = useState(false);
  const setModalState = useSetRecoilState(modalStateContext);

  function logOn(values: any) {
    setIsLoad(true);
    let { email, name, password } = values;
    axios
      .post("/email/link", { email, name, password })
      .then(res => {
        if (res.data.success) {
          message.success(res.data.message);
          setModalState(false);
        } else {
          message.error(res.data.message);
        }
      })
      .finally(() => setIsLoad(false));
  }
  return (
    <>
      <Form onFinish={logOn} autoComplete="off">
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
          name="name"
          rules={[
            { required: true, message: "请填写用户昵称" },
            { min: 1, max: 12, message: "昵称长度在1-12之间" },
          ]}
        >
          <Input placeholder="昵称" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: "请输入初始密码" },
            { min: 8, max: 16, message: "密码长度在8-16之间" },
            {
              pattern: new RegExp(/^[a-zA-Z0-9_]{8,16}$/),
              message: "密码格式为数字、字母或下划线",
            },
          ]}
        >
          <Input.Password placeholder="密码" />
        </Form.Item>
        <Form.Item
          name="verify_password"
          rules={[
            { required: true, message: "请确认密码" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("两次密码必须相同"));
              },
            }),
          ]}
        >
          <Input.Password placeholder="确认密码" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={isLoad}>
            发送激活链接
          </Button>
        </Form.Item>
      </Form>
      <div className="flex justify-between">
        <span className="text-sky-600 cursor-pointer" onClick={() => setModalState("LogIn")}>
          登录
        </span>
      </div>
    </>
  );
};
export default Logon;
