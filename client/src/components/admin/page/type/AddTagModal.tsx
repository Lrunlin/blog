import { useState, useImperativeHandle } from "react";
import type { FC, MutableRefObject } from "react";
import { Button, Modal, Form, Input, Select } from "antd";
import UpLoad from "@/components/common/UpLoad";
import getType from "@/request/getType";
import useSwr from "swr";

export interface TagFormValueProps {
  name: string;
  belong: number;
  icon_url: string | null;
}

export type event = { onOpen: () => void; onClose: () => void };
interface PropsType {
  onFinish: (value: TagFormValueProps) => void;
  event?: MutableRefObject<event>;
}

/**
 * @params onFinish {(value:object)=>void} 表单提交
 * @params event {useRef} 使用onOpen时间打开弹窗，需要引入组件导出的event类型
 */
const AddTypeModal: FC<PropsType> = props => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  let [name, setName] = useState("");
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

  //查询并设置类型选择器（belong）
  let { data } = useSwr(`/type`, () => getType());
  let { Option } = Select;
  return (
    <>
      <Modal
        title="标签添加"
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
            rules={[{ required: true, message: "请输入标签名称" }]}
          >
            <Input
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="请填写标签名称"
            />
          </Form.Item>
          <Form.Item label="归属" name="belong" rules={[{ required: true, message: "请选择归属" }]}>
            <Select style={{ width: 180 }} loading={!data}>
              {data &&
                data.map(item => {
                  return (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  );
                })}
            </Select>
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
