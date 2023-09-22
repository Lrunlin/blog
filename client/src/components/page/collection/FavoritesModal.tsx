import type { FC } from "react";
import { Modal, message } from "antd";
import type { ModalProps } from "antd";
import { Favorites_data } from "@type/model/favorites-collection-list";
import { useParams } from "next/navigation";
import useFetch from "@/common/hooks/useFetch";
import axios from "axios";
import CreateFrom from "@/components/common/CollectionModal/CreateFrom";

/** 编辑收藏集的弹窗*/
const FavoritesModal: FC<
  Required<Pick<ModalProps, "open">> & { defaultValue: Favorites_data; onCancel: () => void }
> = props => {
  let params = useParams();
  let id = params.id as string;
  let { isLoading, refetch } = useFetch(
    values =>
      axios
        .put(`/favorites/${id}`, values)
        .then(res => {
          message.success("更新成功");
          props.onCancel();
        })
        .catch(err => {
          message.error("更新失败");
          console.log(err);
        }),
    true
  );

  return (
    <Modal onCancel={props.onCancel} footer={null} title="编辑收藏集" open={props.open}>
      <CreateFrom
        defaultValue={{ ...props.defaultValue, is_private: !!props.defaultValue.is_private }}
        isLoading={isLoading}
        onSubmit={values => refetch(values)}
        onCancel={props.onCancel}
      />
    </Modal>
  );
};

export default FavoritesModal;
