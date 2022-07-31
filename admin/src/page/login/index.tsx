import { useState, Fragment } from "react";
import logo from "@/assets/favicon.svg";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router";
const LognIn = () => {
  let navigate = useNavigate();
  function onFinish(values: any) {
    axios.post("/login", values).then(res => {
      if (res.data.success) {
        window.localStorage.token = res.data.token;
        message.success(res.data.message);
        navigate("/",{replace:true});
      } else {
        message.error(res.data.message);
      }
    });
  }
  
  return (
    <>
      <div className="flex items-center justify-center mt-10">
        <img src={logo} alt="Logo" className="w-20 h-20" />
        <a
          target="_blank"
          href="https://github.com/Lrunlin/blog"
          className="text-black no-underline hover:text-black font-bold text-4xl ml-10"
        >
          Blog
        </a>
      </div>
      <div>
        <Form
          className="w-96 mx-auto mt-20"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          labelCol={{ span: 4 }}
          colon={false}
        >
          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              { required: true, message: "请填写邮箱" },
              { min: 5, max: 30, message: "邮箱的长度在5-30之间" },
              { type: "email", message: "请输入正确格式的邮箱" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[
              { required: true, message: "请填写密码" },
              { min: 8, max: 16, message: "密码为8-16位的数字、字母、特殊字符" },
              { pattern: /^[a-zA-Z0-9_]{8,16}$/, message: "密码格式为数字、字母或下划线" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item label=" ">
            <Button type="primary" htmlType="submit" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
export default LognIn;
