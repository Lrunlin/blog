import logo from "@/assets/favicon.svg";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import bg from "@/assets/bg.svg";
import { useNavigate } from "react-router";
import Footer from "@/components/common/Footer";

let env = import.meta.env;

const LognIn = () => {
  let navigate = useNavigate();
  function onFinish(values: any) {
    axios.post("/login/email", values).then(res => {
      if (res.data.success) {
        window.localStorage.token = res.data.token;
        message.success(res.data.message);
        navigate("/", { replace: true });
      } else {
        message.error(res.data.message);
      }
    });
  }

  return (
    <div className="w-screen h-screen" style={{ backgroundImage: `url(${bg})` }}>
      <div className="relative top-20">
        <div className="flex items-center justify-center">
          <img src={logo} alt="Logo" className="w-12 h-12" />
          <a
            target="_blank"
            href="https://github.com/Lrunlin/blog"
            className="text-black no-underline hover:text-black font-semibold text-3xl ml-6"
          >
            {env.VITE_SITE_NAME}
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
      </div>
      <div className="fixed bottom-0 w-screen">
        <Footer />
      </div>
    </div>
  );
};
export default LognIn;
