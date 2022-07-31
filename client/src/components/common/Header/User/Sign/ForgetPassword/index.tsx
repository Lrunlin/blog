import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { modalStateContext, signModalContext } from "../index";
import { useSetRecoilState } from "recoil";
import LogIn from "../LogIn";
import LogOn from "../LogOn";


const ForgetPassword = () => {
  const [isLoad, setIsLoad] = useState(false);

  let closeModal = useSetRecoilState(modalStateContext);
  let switchComponent = useSetRecoilState(signModalContext);
  function forgetPassword(values: any) {
    setIsLoad(true);
    axios
      .post(`/forget-password/email/${values.email}`)
      .then(res => {
        if (res.data.success) {
          message.success(res.data.message);
          closeModal(false);
        } else {
          message.error(res.data.message);
        }
      })
      .finally(() => setIsLoad(false));
  };
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
        <span
          className="text-sky-600 cursor-pointer"
          onClick={() =>
            switchComponent({
              title: "邮箱注册",
              component: <LogIn />,
            })
          }
        >
          登录
        </span>
        <span
          className="text-sky-600 cursor-pointer"
          onClick={() =>
            switchComponent({
              title: "忘记密码",
              component: <LogOn />,
            })
          }
        >
          注册
        </span>
      </div>
    </>
  );
};
export default ForgetPassword;
