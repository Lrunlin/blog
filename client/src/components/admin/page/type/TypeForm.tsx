import { useState, useImperativeHandle } from "react";
import type { FC, MutableRefObject } from "react";
import { Button, Modal, Form, Input } from "antd";
import UpLoad from "@/components/common/UpLoad";
import { TypeAttributes } from "@type/type";

export interface TypeFormValueProps {
  name: string;
  icon_url: string | null;
  description: string;
}

export type event = { onOpen: () => void; onClose: () => void };

interface PropsType {
  onFinish: (value: TypeFormValueProps) => void;
  initialValue?: TypeAttributes & { icon_url: string };
}

/**
 * @params onFinish {(value:object)=>void} 表单提交
 */
const TypeForm: FC<PropsType> = props => {
  let { useForm } = Form;
  let [form] = useForm();
  const onFinish = (values: any) => {
    props.onFinish(values);
  };

  return (
    <>
      <Form
        form={form}
        labelCol={{ flex: "60px" }}
        wrapperCol={{ span: 16 }}
        initialValues={props.initialValue}
        scrollToFirstError={true}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="图标"
          name="icon_file_name"
          rules={[{ required: true, message: "请上传图标" }]}
        >
          <div>
            <UpLoad
              width={120}
              target="type"
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
        <Form.Item label="名称" name="name" rules={[{ required: true, message: "请填写类型名称" }]}>
          <Input placeholder="请填写类型名称" />
        </Form.Item>
        <Form.Item
          label="介绍"
          name="description"
          rules={[{ required: true, message: "请输入类型的介绍" }]}
        >
          <Input.TextArea
            rows={6}
            placeholder="类型介绍,用于HTML的meta标签description"
            maxLength={150}
          />
        </Form.Item>
        <Form.Item >
          <Button className="ml-[60px]" type="primary" htmlType="submit">
            确认
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default TypeForm;
