import { useState } from "react";
import MarkDownEditor from "@/components/MarkDownEditor";
import { Button, Form, Input, message, TreeSelect } from "antd";
import axios from "axios";
import Upload from "@/components/UpLoad";
import useSwr from "swr";
import getType from "@/request/getType";
import { useNavigate } from "react-router";
// 不要吹灭你的灵感和你的想象力; 不要成为你的模型的奴隶。 ——文森特・梵高

const Write = () => {
  let { useForm } = Form;
  let [form] = useForm();
  let navigate = useNavigate();
  const [load, setLoad] = useState(false);
  function onFinish(values: any) {
    setLoad(true);
    axios
      .post("/article", { ...values, state: 1 })
      .then(res => {
        if (res.data.success) {
          message.success(res.data.message);
          navigate("/article/list", { replace: true });
        } else {
          message.error(res.data.message);
        }
      })
      .finally(() => {
        setLoad(false);
      });
  }

  let { data: treeData } = useSwr("/type/tree", () =>
    getType().then(res => {
      return res.map(item => ({ ...item, checkable: false }));
    })
  );

  return (
    <>
      <Form
        form={form}
        initialValues={{
          description: null,
          cover_url: null,
          reprint: null,
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
          <Upload target="cover" aspect={3 / 2} />
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
            <MarkDownEditor
              onChange={html => {
                form.setFieldsValue({ content: html });
              }}
            />
          </div>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 2, span: 16 }}>
          <Button type="primary" htmlType="submit" disabled={load}>
            发布
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default Write;
