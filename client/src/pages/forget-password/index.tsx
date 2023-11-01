import Base from "@/layout/Base";
import useFetch from "@/common/hooks/useFetch";
import axios from "axios";
import { Button, message, Form, Input } from "antd";
import { useSearchParams } from "next/navigation";

const ForgetPassword = () => {
  let searchParams = useSearchParams();
  let { isLoading, refetch } = useFetch(
    (values: any) =>
      axios
        .post("/forget-password/update", {
          key: searchParams.get("key"),
          password: values.password,
        })
        .then(res => {
          message.success(res.data.message);
        })
        .catch(err => {
          message.error(err.message);
        }),
    true
  );

  return (
    <Base>
      <div className="bg-white w-full">
        <Form
          className="!mx-auto !mt-10"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={params => refetch(params)}
          autoComplete="off"
        >
          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: "密码为8-16位的数字或字母组成",
                max: 16,
                min: 8,
                pattern: /^[a-zA-Z0-9_]{8,16}$/,
              },
            ]}
          >
            <Input.Password maxLength={16} />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="isPassword"
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("确认密码与密码不匹配");
                },
              }),
            ]}
          >
            <Input.Password maxLength={16} />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              disabled={!searchParams.get("key")}
              loading={isLoading}
            >
              确认修改
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Base>
  );
};
export default ForgetPassword;
