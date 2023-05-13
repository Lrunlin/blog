import { useState, useImperativeHandle } from "react";
import type { FC, MutableRefObject } from "react";
import { Button, Modal, Form, Input } from "antd";
import UpLoad from "@/components/common/UpLoad";

export interface TypeFormValueProps {
  name: string;
  icon_url: string | null;
  description: string;
}

export type event = { onOpen: () => void; onClose: () => void };

interface PropsType {
  onFinish: (value: TypeFormValueProps) => void;
  event?: MutableRefObject<event>;
}

/**
 * @params onFinish {(value:object)=>void} 表单提交
 * @params event {useRef} 使用onOpen时间打开弹窗，需要引入组件导出的event类型
 */
const AddTypeModal: FC<PropsType> = props => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  let { useForm } = Form;
  let [form] = useForm();
  const onFinish = (values: any) => {
    props.onFinish(values);
  };

  useImperativeHandle(props.event, () => ({
    onOpen: () => {
      setIsModalVisible(true);
    },
    onClose: () => {
      setIsModalVisible(false);
    },
  }));

  return (
    <>
      <Modal
        title="类型添加"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        destroyOnClose={true}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="上传ICON" name="icon_file_name">
            <div>
              <UpLoad
                width={120}
                target="type"
                onSuccess={({ file_name }) => {
                  form.setFieldsValue({ icon_file_name: file_name });
                }}
              />
            </div>
          </Form.Item>
          <Form.Item
            label="名称"
            name="name"
            rules={[{ required: true, message: "请填写类型名称" }]}
          >
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
          <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
            <Button type="primary" htmlType="submit">
              确认添加
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default AddTypeModal;
