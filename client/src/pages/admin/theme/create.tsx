import useFetch from "@/common/hooks/useFetch";
import CodeEdite from "@/components/admin/page/theme/CodeEdite";
import AdminLayout from "@/layout/Admin/Base";
import { Input, Form, Button, Card, Alert, message } from "antd";
import axios from "axios";

export const CreateTheme = () => {
  let { useForm } = Form;
  let [form] = useForm();
  let { isLoading, refetch: submit } = useFetch(
    params =>
      axios
        .post("/theme", params)
        .then(res => {
          message.success(res.data.message);
          form.resetFields();
        })
        .catch(err => {
          console.log(err);
          message.error(err.message);
          return err;
        }),
    true
  );

  return (
    <>
      <Card>
        <Alert message="容器className为content-body,请在编写时添加后代选择器。" type="info" />
        <Form
          className="mt-4"
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 16 }}
          form={form}
          name="control-hooks"
          onFinish={(values: any) => submit(values)}
        >
          <Form.Item
            name="name"
            label="主题名称"
            rules={[
              { required: true, message: "主题名称未填写" },
              { min: 1, max: 40, message: "名称最长为40个字符串" },
            ]}
          >
            <Input placeholder="填写主题名称" maxLength={40} />
          </Form.Item>
          <Form.Item
            name="content"
            label="样式内容"
            rules={[{ required: true, message: "样式内容未填写" }]}
          >
            <CodeEdite
              className="mt-2"
              onChange={content => {
                form.setFieldsValue({ content: content });
              }}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 2, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              创建
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};
export default () => (
  <AdminLayout>
    <CreateTheme />
  </AdminLayout>
);
