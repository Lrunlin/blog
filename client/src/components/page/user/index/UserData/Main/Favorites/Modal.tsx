import type { FC } from "react";
import { Modal } from "antd";
import type { ModalProps } from "antd";
import CreateFrom, {
  propsType as CollectionModalPropsType,
} from "@/components/common/CollectionModal/CreateFrom";

type propsType = Pick<ModalProps, "onCancel" | "open"> & CollectionModalPropsType;

const CollectionModal: FC<propsType> = props => {
  return (
    <>
      <Modal open={props.open} title={"编辑收藏夹"} footer={null} onCancel={() => props.onCancel()}>
        <CreateFrom {...props} defaultValue={props.defaultValue} />
      </Modal>
    </>
  );
};
export default CollectionModal;
