import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { modalStateContext } from "../index";
import { useSetRecoilState } from "recoil";

const ForgetPassword = () => {
  const [isLoad, setIsLoad] = useState(false);

  let setModalState = useSetRecoilState(modalStateContext);
  function forgetPassword(values: any) {
    setIsLoad(true);
    axios
      .post(`/forget-password/email/${values.email}`)
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
      <Form onFinish={forgetPassword} autoComplete="off">
        <Form.Item
          name="email"
          rules={[
            { required: true, type: "email", message: "请填写邮箱" },
            { min: 5, max: 30, message: "邮箱长度为5-30" },
          ]}
        >
          <Input placeholder="邮箱" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={isLoad}>
            发送链接
          </Button>
        </Form.Item>
      </Form>
      <div className="flex justify-between">
        <span className="text-sky-600 cursor-pointer" onClick={() => setModalState("LogIn")}>
          登录
        </span>
        <span className="text-sky-600 cursor-pointer" onClick={() => setModalState("LogOn")}>
          注册
        </span>
      </div>
    </>
  );
};
export default ForgetPassword;
