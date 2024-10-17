import type { FC } from "react";
import { Button, Form, Input, Select } from "antd";
import { TagAttributes } from "@type/type";
import useFetch from "@/common/hooks/useFetch";
import UpLoad from "@/components/common/UpLoad";
import getType from "@/request/type/getTag";

export interface TagFormValueProps {
  name: string;
  belong: number | string;
  icon_url: string | null;
}

interface PropsType {
  onFinish: (value: TagFormValueProps) => void;
  initialValue?: TagAttributes & { icon_url: string };
}

/**
 * @params onFinish {(value:object)=>void} 表单提交
 */
const TagForm: FC<PropsType> = (props) => {
  let { useForm } = Form;
  let [form] = useForm();

  const onFinish = (values: any) => {
    props.onFinish(values);
  };

  //查询并设置类型选择器（belong）
  let { data } = useFetch(() => getType("type"));
  let { Option } = Select;
  return (
    <>
      <Form
        form={form}
        labelCol={{ flex: "60px" }}
        wrapperCol={{ span: 16 }}
        initialValues={props.initialValue}
        onFinish={onFinish}
        autoComplete="off"
        scrollToFirstError={true}
      >
        <Form.Item
          label="图标"
          name="icon_file_name"
          rules={[{ required: true, message: "请上传图标" }]}
        >
          <div>
            <UpLoad
              width={120}
              target="tag"
              imgURL={props?.initialValue?.icon_url}
              onSuccess={({ file_name }) => {
                form.setFieldsValue({ icon_file_name: file_name });
              }}
              onDelete={() => {
                form.setFieldsValue({ icon_file_name: null });
              }}
            />
          </div>
        </Form.Item>
        <Form.Item
          label="名称"
          name="name"
          rules={[{ required: true, message: "请输入标签名称" }]}
        >
          <Input placeholder="请填写标签名称" />
        </Form.Item>
        <Form.Item
          label="归属"
          name="belong"
          rules={[{ required: true, message: "请选择归属" }]}
        >
          <Select style={{ width: 180 }} loading={!data}>
            {data &&
              data.map((item) => {
                return (
                  <Option key={item.id} value={item.id}>
                    {item.name}
                  </Option>
                );
              })}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button className="ml-[60px]" type="primary" htmlType="submit">
            确认
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default TagForm;
