import { useEffect, useState } from "react";
import { Button, Divider, Form, Input, message } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import axios from "@axios";
import { setToken } from "@/common/modules/cookie";
import useUserData from "@/store/user/user-data";
import useUserSignModel from "@/store/user/user-sign-model-state";

/** 弹窗中的登录组件*/
const LogIn = () => {
  let setModalState = useUserSignModel((s) => s.setData);

  const userDataStore = useUserData((s) => s);
  const [isLoad, setIsLoad] = useState(false);
  function logIn(values: any) {
    setIsLoad(true);
    axios
      .post("/login/email", values)
      .then((res) => {
        if (res.data.success) {
          message.success(res.data.message);
          setModalState(false);
          userDataStore.setData(res.data.data);
          setToken(res.data.token);
        } else {
          message.error(res.data.message);
        }
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => setIsLoad(false));
  }

  let timer: NodeJS.Timer | number;
  function github() {
    let win = window.open(
      `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`,
      "_blank",
      "width=800,height=600,menubar=no,toolbar=no, status=no,scrollbars=yes",
    ) as Window;
    // 开启后监听是否关闭，如果关闭了就重新获取一下userData
    timer = setInterval(() => {
      if (win.closed) {
        userDataStore.refreshData();
        setModalState(false);
      }
    }, 500);
  }
  useEffect(() => {
    return () => {
      clearInterval(timer as number);
    };
  }, []);

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
          className="cursor-pointer text-sky-600"
          onClick={() => setModalState("LogOn")}
        >
          邮箱注册
        </span>
        <span
          className="cursor-pointer text-sky-600"
          onClick={() => setModalState("ForgetPassword")}
        >
          忘记密码
        </span>
      </div>
      <div>
        <Divider className="my-3" />
        <div className="flex justify-evenly">
          <GithubOutlined className="cursor-pointer text-xl" onClick={github} />
        </div>
      </div>
    </>
  );
};
export default LogIn;
