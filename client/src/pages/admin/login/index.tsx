import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import Footer from "@/components/admin/common/Footer";
import cookie from "js-cookie";
import { userDataContext } from "@/store/user-data";
import { useSetRecoilState } from "recoil";
import Head from "@/components/next/Head";

const LognIn = () => {
  let router = useRouter();
  let setUserData = useSetRecoilState(userDataContext);
  function onFinish(values: any) {
    axios.post("/login/email", values).then(res => {
      if (res.data.success) {
        message.success(res.data.message);
        cookie.set("token", res.data.token, {
          expires: 365,
          domain: `.${window.location.hostname.split(".").slice(-2).join(".")}`,
        });
        setUserData(res.data.data);
        router.replace("/admin");
      } else {
        message.error(res.data.message);
      }
    });
  }

  return (
    <>
      <Head title={`登录 - ${process.env.NEXT_PUBLIC_SITE_NAME} - 后台管理系统`} />
      <div className="w-screen h-screen" style={{ backgroundImage: `url(/image/admin/bg.svg)` }}>
        <div className="relative top-20">
          <div className="flex items-center justify-center">
            <img src="/favicon.svg" alt="Logo" className="w-12 h-12" />
            <a
              target="_blank"
              href="https://github.com/Lrunlin/blog"
              className="text-black no-underline hover:text-black font-semibold text-3xl ml-6"
            >
              {process.env.NEXT_PUBLIC_SITE_NAME}
            </a>
          </div>
          <div className="flex justify-center mt-20">
            <Form
              className="w-96"
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
    </>
  );
};
export default LognIn;
