import { useImperativeHandle, useState, useEffect, useRef } from "react";
import type { MutableRefObject, FC } from "react";
import { Modal, Form, Input, message } from "antd";
import axios from "axios";

export type event = MutableRefObject<{ onOpen: () => void }>;
interface propsType {
  event: event;
}
const UpdatePasswordModal: FC<propsType> = props => {
  let { useForm } = Form;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoad, setIsLoad] = useState(false);

  let [form] = useForm();
  function onFinish({ password }: { password: string }) {
    setIsLoad(true);
    axios
      .put("/user/password", { password: password })
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
      form.setFieldsValue({ password: "", verify_password: "" });
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
        title="修改密码"
        open={isModalVisible}
        onOk={() => form.submit()}
        onCancel={() => setIsModalVisible(false)}
        cancelText="取消修改"
        okText="确认修改"
        okButtonProps={{ loading: isLoad }}
      >
        <Form form={form} onFinish={onFinish} autoComplete="off">
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "请输入初始密码" },
              { min: 8, max: 16, message: "密码长度在8-16之间" },
              {
                pattern: new RegExp(/^[a-zA-Z0-9_]{8,16}$/),
                message: "密码格式为数字、字母或下划线",
              },
            ]}
          >
            <Input.Password placeholder="密码" />
          </Form.Item>
          <Form.Item
            name="verify_password"
            rules={[
              { required: true, message: "请确认密码" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("两次密码必须相同"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="确认密码" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default UpdatePasswordModal;
