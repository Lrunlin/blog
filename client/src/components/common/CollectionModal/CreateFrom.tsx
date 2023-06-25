import type { FC } from "react";
import { Form, Button, Input, Radio } from "antd";
// import { useForm } from "antd/es/form/Form";
// https://stackoverflow.com/questions/64428363/syntaxerror-cannot-use-import-statement-outside-a-module-react-js-antd
import { useForm } from "antd/lib/form/Form";

export type valuesType = { name: string; description: string; is_private: boolean };
export interface propsType {
  onCancel: () => void;
  onSubmit: (values: valuesType) => void;
  isLoading: boolean;
  defaultValue?: valuesType;
}
const CreateFrom: FC<propsType> = props => {
  let [form] = useForm();
  const { TextArea } = Input;

  return (
    <>
      <Form
        initialValues={props.defaultValue || { is_private: false }}
        form={form}
        onFinish={values => {
          props.onSubmit({
            ...values,
            description: /^[\s\S]*.*[^\s][\s\S]*$/.test(values.description)
              ? values.description
              : null,
          });
        }}
        labelCol={{ span: 3 }}
        autoComplete="off"
      >
        <Form.Item
          label="名称"
          name="name"
          rules={[
            { required: true, message: "需要填写收藏夹名称" },
            { max: 15, message: "最大长度为15" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="描述" name="description" rules={[{ max: 100, message: "最大长度为100" }]}>
          <TextArea maxLength={100} />
        </Form.Item>
        <Form.Item name="is_private">
          <Radio.Group className="ml-4">
            <Radio value={false}>
              <span>公开</span>
              <span className="ml-4 text-gray-500">所有人都可见</span>
            </Radio>
            <br />
            <Radio value={true} className="mt-3">
              <span>隐私</span>
              <span className="ml-4 text-gray-500">仅自己可见此收藏集</span>
            </Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
      <div className="flex justify-end mt-5">
        <Button className="mr-4" onClick={props.onCancel}>
          取消
        </Button>
        <Button type="primary" loading={props.isLoading} onClick={form.submit}>
          确认创建
        </Button>
      </div>
    </>
  );
};
export default CreateFrom;
