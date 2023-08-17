import Editor from "@/components/common/Editor";
import { Button, Form, Input, message, TreeSelect } from "antd";
import axios from "axios";
import Upload from "@/components/common/UpLoad";
import useSwr from "swr";
import getType from "@/request/getType";
import { useRouter } from "next/navigation";
import AdminLayout from "@/layout/Admin/Base";
import useFetch from "@/common/hooks/useFetch";

const Write = () => {
  let { useForm } = Form;
  let [form] = useForm();
  let router = useRouter();
  let { isLoading, refetch: onFinish } = useFetch(
    (values: any) =>
      axios
        .post("/article", { ...values, state: 1 })
        .then(res => {
          message.success(res.data.message);
          router.replace("/admin/article/list");
        })
        .catch(err => {
          message.error(err.message);
        }),
    true
  );

  let { data: treeData } = useSwr("/type/tree", () =>
    getType().then(res => {
      return res.map(item => ({ ...item, checkable: false }));
    })
  );

  return (
    <AdminLayout>
      <Form
        form={form}
        initialValues={{
          description: null,
          cover_file_name: null,
          reprint: null,
          theme_id: 0,
        }}
        labelCol={{ span: 2 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        autoComplete="off"
        validateTrigger="onSubmit"
      >
        <Form.Item
          label="标题"
          name="title"
          rules={[
            { required: true, message: "请填写标题" },
            { type: "string", min: 3, max: 200, message: "标题长度在3-200之间" },
          ]}
        >
          <Input placeholder="填写网站标题" maxLength={200} />
        </Form.Item>
        <Form.Item name="theme_id" hidden rules={[{ required: true }]}>
          <></>
        </Form.Item>
        <Form.Item
          label="标签"
          name="tag"
          rules={[
            { required: true, message: "请选择文章标签" },
            { type: "array", max: 6, message: "标签数量在1-6个" },
          ]}
        >
          <TreeSelect
            treeData={treeData}
            treeCheckable={true}
            treeDefaultExpandAll
            placeholder="选择文章对应的标签"
            fieldNames={{ label: "name", value: "id" }}
          />
        </Form.Item>
        <Form.Item
          label="介绍"
          name="description"
          rules={[
            { required: false, message: "介绍" },
            { max: 200, message: "最大不得超过200个字符" },
          ]}
        >
          <Input.TextArea rows={5} placeholder="填写介绍" maxLength={200} showCount />
        </Form.Item>

        <Form.Item label="封面" name="cover_file_name">
          <div>
            <Upload
              width={200}
              target="cover"
              aspect={3 / 2}
              onSuccess={({ file_name }) => {
                form.setFieldsValue({ cover_file_name: file_name });
              }}
            />
          </div>
        </Form.Item>

        <Form.Item label="是否为转载" name="reprint">
          <Input placeholder="转载地址(原创文章则留空)" />
        </Form.Item>

        <Form.Item
          label="内容"
          name="content"
          rules={[{ required: true, message: "内容不得为空" }]}
        >
          <div>
            <Editor
              theme={true}
              target="article"
              onChange={html => {
                form.setFieldsValue({ content: html });
              }}
              onSetTheme={id => {
                form.setFieldsValue({ theme_id: id });
              }}
            />
          </div>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 2, span: 16 }}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            发布
          </Button>
        </Form.Item>
      </Form>
    </AdminLayout>
  );
};
export default Write;
