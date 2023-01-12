import {  startTransition } from "react";
import { Input, Button, Form, message } from "antd";
import Upload from "@/components/UpLoad";
import axios from "axios";
const Link = () => {
  let { useForm } = Form;
  let [form] = useForm();
  function onFinish(values: any) {
    axios.post("/link", values).then(res => {
      if (res.data.success) {
        message.success(res.data.message);
        startTransition(() => {
          form.resetFields();
        });
      } else {
        message.error(res.data.message);
      }
    });
  }
  return (
    <div className="pt-6">
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 6 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        validateTrigger="onSubmit"
      >
        <Form.Item
          label="网站名称"
          name="name"
          rules={[
            { required: true, message: "请填写网站名称" },
            { type: "string", min: 2, max: 30, message: "网站名称为长度2-30位" },
          ]}
        >
          <Input maxLength={30} placeholder="网站名称为长度2-30位" />
        </Form.Item>
        <Form.Item
          label="网址"
          name="url"
          rules={[
            { required: true, message: "请填写友链网址" },
            {
              type: "string",
              min: 8,
              max: 100,
              message: "网址为8-100位字符串",
            },
            {
              type: "url",
              message: "网址格式不正确",
            },
            {
              pattern: /^https:\/\/.*/,
              message: "网站协议为https",
            },
          ]}
        >
          <Input placeholder="网址为https网址长度为8-100" />
        </Form.Item>
        <Form.Item
          label="LOGO"
          name="logo_file_name"
          rules={[{ required: true, min: 4, message: "请上传网站Logo" }]}
        >
          <Upload target="link" notCrop={true} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4 }}>
          <Button type="primary" htmlType="submit">
            添加
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Link;
