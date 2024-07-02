import { useImperativeHandle, useState } from "react";
import type { FC, MutableRefObject } from "react";
import { Modal } from "antd";
import TypeForm from "./TypeForm";

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
const AddTypeModal: FC<PropsType> = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
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
        <TypeForm onFinish={onFinish} />
      </Modal>
    </>
  );
};
export default AddTypeModal;
