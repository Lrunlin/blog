import { useState, useEffect } from "react";
import type { FC } from "react";
import { Modal, message } from "antd";
import type { ModalProps } from "antd";
import CreateFrom, { valuesType } from "./CreateFrom";
import { useParams } from "next/navigation";
import List from "./List";
import axios from "axios";
import useFetch from "@/common/hooks/useFetch";
import { response } from "@type/response";

export interface favoritesListProps {
  id: number;
  name: string;
  is_private: number;
  favorites_collection_count: number;
}

export interface propsType extends Pick<ModalProps, "onCancel" | "open"> {
  id?: number | string;
  onDelete: () => void;
  onCreate: (list: number[]) => void;
  onUpdate: (list: number[]) => void;
  defaultChecked?: number[] | null;
  type: "article" | "problem";
}

const CollectionModal: FC<propsType> = props => {
  let title = { "update-list": "选择收藏夹", list: "选择收藏夹", "create-from": "创建收藏夹" };
  let [type, setType] = useState<"create-from" | "list" | "update-list">("list");
  let params = useParams();
  let id = props.id || params.id;
  function switchType() {
    if (!props.defaultChecked?.length) {
      setType("list");
    } else {
      setType("update-list");
    }
  }

  useEffect(() => {
    switchType();
  }, [props.defaultChecked]);

  // 创建收藏
  let { isLoading: createIsLoading, refetch: createRefetch } = useFetch(
    (checkList: number[]) =>
      axios
        .post(`/collection/${id}`, {
          type: props.type,
          favorites_id: checkList,
        })
        .then(res => {
          message.success("收藏成功");
          props.onCreate(checkList);
          props.onCancel && props.onCancel(null as any);
          setType("list");
          return res;
        })
        .catch(err => {
          message.error("收藏失败");
          console.log(err);
          return err;
        }),
    true
  );

  // 修改收藏
  let { isLoading: updateIsLoading, refetch: updateRefetch } = useFetch(
    (checkList: number[]) =>
      axios
        .put(`/collection/${id}`, {
          favorites_id: checkList,
        })
        .then(res => {
          message.success("收藏成功");
          props.onUpdate(checkList);
          props.onCancel && props.onCancel(null as any);
          setType("list");
          return res;
        })
        .catch(err => {
          message.error("收藏失败");
          console.log(err);
          return err;
        }),
    true
  );

  // 删除收藏
  let { isLoading: deleteIsLoading, refetch: deleteRefetch } = useFetch(
    () =>
      axios
        .delete(`/collection/${id}`)
        .then(res => {
          message.success("删除成功");
          props.onDelete();
          props.onCancel && props.onCancel(null as any);
          setType("list");
          return res;
        })
        .catch(err => {
          message.error("删除失败");
          console.log(err);
          return err;
        }),
    true
  );

  // 创建收藏夹
  let { isLoading: createFavoritesIsLoading, refetch: createFavoritesRefetch } = useFetch(
    (param: valuesType) =>
      axios
        .post<response>("/favorites", param)
        .then(res => {
          message.success("创建成功");
          switchType();
          return res;
        })
        .catch(err => {
          message.error("创建失败");
          return err;
        }),
    true
  );
  return (
    <>
      <Modal
        title={title[type]}
        footer={null}
        {...props}
        onCancel={e => {
          if (["update-list", "list"].includes(type)) {
            props.onCancel && props.onCancel(e);
          } else {
            switchType();
          }
        }}
      >
        {["update-list", "list"].includes(type) ? (
          <List
            isLoading={createIsLoading || updateIsLoading || deleteIsLoading}
            onSwitchType={() => setType("create-from")}
            defaultChecked={props.defaultChecked}
            onSubmit={checkList => {
              if (type == "list") {
                createRefetch(checkList);
              } else {
                checkList.length ? updateRefetch(checkList) : deleteRefetch();
              }
            }}
          />
        ) : (
          <CreateFrom
            isLoading={createFavoritesIsLoading}
            onCancel={() => {
              switchType();
            }}
            onSubmit={values => {
              createFavoritesRefetch(values);
            }}
          />
        )}
      </Modal>
    </>
  );
};
export default CollectionModal;
