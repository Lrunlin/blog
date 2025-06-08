"use client";

import { startTransition } from "react";
import { Button, Form, Input, message } from "antd";
import axios from "@axios";
import Upload from "@/components/common/UpLoad";

const Link = () => {
  let { useForm } = Form;
  let [form] = useForm();
  function onFinish(values: any) {
    axios
      .post("/friendly-link", values)
      .then((res) => {
        message.success(res.data.message);
        startTransition(() => {
          form.resetFields();
        });
      })
      .catch((err) => {
        message.error(err.message);
      });
  }
  return (
    <>
      <div className="piece pt-6">
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
              {
                type: "string",
                min: 2,
                max: 30,
                message: "网站名称为长度2-30位",
              },
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
            <div>
              <Upload
                width={120}
                aspect={1}
                target="friendly-link"
                onSuccess={({ file_name }) => {
                  form.setFieldsValue({ logo_file_name: file_name });
                }}
                onDelete={() => {
                  form.setFieldsValue({ logo_file_name: null });
                }}
              />
            </div>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Button type="primary" htmlType="submit">
              添加
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};
export default Link;
