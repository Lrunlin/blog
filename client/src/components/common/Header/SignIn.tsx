import { FunctionComponent } from "react";
import { Button, Form, Input, message } from "antd";
import type { response } from "@/types";
import axios from "axios";
import type { propsTypes } from "./Logn";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

interface signInTypes {
  email: string;
  password: string;
}

interface signUpFCTypes {
  closeLayer?: propsTypes["closeLayer"];
}

interface responseTypes extends response<string> {
  token: string;
}

const SignIn: FunctionComponent<signUpFCTypes> = () => {
  let router = useRouter();
  const signIn = (values: signInTypes) => {
    axios.get<responseTypes>("/user/token", { params: { ...values } }).then(res => {
      if (res.data.success) {
        message.success("登录成功");
        localStorage.token = res.data.token;
        router.reload();
      } else {
        message.error("登录失败");
      }
    });
  };

  return (
    <>
      <Form
        name="normal_login"
        className="login-form"
        onFinish={signIn}
        initialValues={{ remember: true }}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              type: "string",
              min: 6,
              max: 30,
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "邮箱格式不正确（不支持含有中文字符）",
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户邮箱" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              type: "string",
              min: 6,
              max: 16,
              message: "密码应由6-16位数字或字母组成",
              pattern: /^[A-Za-z0-9]+$/,
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="用户密码"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" block htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default SignIn;
