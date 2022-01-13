import type { response } from "@/types";
import { useState, useEffect, useRef, FunctionComponent } from "react";
import css from "styled-jsx/css";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import type { propsTypes } from "./Logn";
import { useRouter } from "next/router";

import { LockOutlined, MailOutlined, SafetyCertificateOutlined } from "@ant-design/icons";

//该组件接收的值
interface signUpFCTypes {
  closeLayer?: propsTypes["closeLayer"];
}

//注册请求发送的参数
interface signUpTypes {
  email: string;
  password: string;
  code: string;
}

const Style = css`
  .code-input {
    width: 60%;
  }
  .code-btn {
  }
`;

const SignUp: FunctionComponent<signUpFCTypes> = () => {
  const [form] = Form.useForm();
  let router = useRouter();
  const [codeBtnIsDisabled, setCodeBtnIsDisabled] = useState<boolean>(true);
  const updateFrom = ({ email }: { email?: string }) => {
    let test =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email) setCodeBtnIsDisabled(!test.test(email));
  };

  const signUpRequest = (values: signUpTypes) => {
    axios.post<response<string>>("/user", { ...values }).then(res => {
      message[res.data.success ? "success" : "error"](res.data.message);
      if (res.data.success) {
        localStorage.token = res.data.data;
        message.success("注册成功");
        router.reload();
      }
    });
  };

  const [btnTimer, setBtnTimer] = useState<number>(60);
  const [isAwait, setIsAwait] = useState(false); //是否在发送验证码按钮的冷却时间

  //?处理计时器
  let timer = useRef<NodeJS.Timer | null>(null);
  const time = {
    start: () => {
      timer.current = setInterval(() => {
        setBtnTimer(num => --num);
      }, 1000);
    },
    end: () => {
      if (timer.current) {
        setBtnTimer(60);
        clearInterval(timer.current);
      }
    },
  };

  useEffect(() => {
    if (btnTimer < 1) {
      setIsAwait(false);
      time.end();
    }
  }, [btnTimer]);

  useEffect(() => {
    return () => {
      time.end();
    };
  }, []);

  const sendCode = (email: string) => {
    setIsAwait(true);
    axios.post<response>("/email/send", { email: email }).then(res => {
      message[res.data.success ? "success" : "error"](res.data.message);
      res.data.success ? time.start() : setIsAwait(false);
    });
  };

  return (
    <>
      <style jsx>{Style}</style>
      <Form
        name="normal_login"
        className="login-form"
        onFinish={signUpRequest}
        form={form}
        onValuesChange={updateFrom}
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
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="用户邮箱" />
        </Form.Item>

        <Form.Item
          name="code"
          rules={[
            {
              required: true,
              type: "string",
              min: 4,
              max: 4,
              message: "验证码为4位",
            },
          ]}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Input
              prefix={<SafetyCertificateOutlined className="site-form-item-icon" />}
              type="text"
              placeholder="邮箱验证码"
              style={{ width: "70%" }}
            />
            <Button
              type="primary"
              disabled={codeBtnIsDisabled || isAwait}
              style={{ width: "102px" }}
              onClick={() => sendCode(form.getFieldValue("email"))}
            >
              {isAwait ? btnTimer : "发送验证码"}
            </Button>
          </div>
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
            placeholder="密码"
          />
        </Form.Item>

        <Form.Item
          name="isPassword"
          rules={[
            {
              required: true,
              type: "string",
              min: 6,
              max: 16,
              message: "两次密码不相同",
              validator: (_, value) => {
                return form.getFieldValue("password") == value
                  ? Promise.resolve()
                  : Promise.reject(new Error("两次密码不相同"));
              },
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="确认密码"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" block htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default SignUp;
