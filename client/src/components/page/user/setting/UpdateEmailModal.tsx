import { useImperativeHandle, useState, useEffect, useRef } from "react";
import type { MutableRefObject, FC } from "react";
import { Modal, Form, Input, message } from "antd";
import axios from "axios";

export type event = MutableRefObject<{ onOpen: () => void }>;
interface propsType {
  event: event;
}
const UpdateEmailModal: FC<propsType> = props => {
  let { useForm } = Form;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoad, setIsLoad] = useState(false);

  let [form] = useForm();

  function onFinish({ email }: { email: string }) {
    setIsLoad(true);
    axios
      .put("/user/email", { email: email })
      .then(res => {
        if (res.data.success) {
          message.success(res.data.message);
          setIsModalVisible(false);
        } else {
          message.error(res.data.message);
        }
      })
      .finally(() => {
        setIsLoad(false);
      });
  }
  let friestLoad = useRef(0);
  useEffect(() => {
    if (!isModalVisible && friestLoad.current) {
      form.setFieldsValue({ email: "" });
    }
    friestLoad.current++;
  }, [isModalVisible]);

  useImperativeHandle(props.event, () => ({
    onOpen: () => {
      setIsModalVisible(true);
    },
  }));
  return (
    <>
      <Modal
        title="修改邮箱"
        open={isModalVisible}
        onOk={() => form.submit()}
        onCancel={() => setIsModalVisible(false)}
        cancelText="取消修改"
        okText="确认修改"
        okButtonProps={{ loading: isLoad }}
      >
        <Form form={form} onFinish={onFinish} autoComplete="off">
          <Form.Item
            label="新邮箱"
            name="email"
            rules={[{ required: true, type: "email", message: "请填写正确格式的邮箱" }]}
          >
            <Input placeholder="填写新邮箱，以接收链接" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default UpdateEmailModal;
