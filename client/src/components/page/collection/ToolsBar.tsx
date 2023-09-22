import { useState } from "react";
import type { FC } from "react";
import dynamic from "next/dynamic";
import useFetch from "@/common/hooks/useFetch";
const Modal = dynamic(() => import("@/components/common/CollectionModal"), { ssr: false });
import { response } from "@type/response";
import axios from "axios";
import { message, Popconfirm } from "antd";
import { useParams } from "next/navigation";
import { DeleteOutlined, EditOutlined, LoadingOutlined } from "@ant-design/icons";

interface propsType {
  belong_id: number;
  refetch: Function;
}
const ToolsBar: FC<propsType> = ({ belong_id, refetch }) => {
  const [open, setOpen] = useState(false);
  let params = useParams();
  let id = params.id as string;

  // 获取单个文章被哪些收藏集收藏过
  let {
    data: favoritesList,
    isLoading: favoritesListIsLoading,
    refetch: favoritesListRefetch,
  } = useFetch(
    () =>
      axios
        .get<response<number[]>>(`/collection/favorites/${belong_id}`)
        .then(res => {
          setOpen(true);
          return res.data.data;
        })
        .catch(err => {
          message.error("获取失败");
          console.log(err);
          return null;
        }),
    true
  );

  // 删除
  let { isLoading: deleteCollectionIsLoading, refetch: deleteCollectionRefetch } = useFetch(
    () =>
      axios
        .delete<response<number[]>>(`/collection/favorites/${belong_id}`, {
          params: { favorites_id: id },
        })
        .then(res => {
          message.success("删除成功");
          refetch();
        })
        .catch(err => {
          message.error("删除失败");
          console.log(err);
          return null;
        }),
    true
  );
  return (
    <>
      <Modal
        defaultChecked={favoritesList}
        onCancel={() => setOpen(false)}
        onCreate={() => {
          setOpen(false);
          refetch();
        }}
        onDelete={() => {
          setOpen(false);
          refetch();
        }}
        onUpdate={() => {
          setOpen(false);
          refetch();
        }}
        open={open && !favoritesListIsLoading && !!favoritesList}
        id={belong_id}
        type="article"
      />
      <div className="flex items-center cursor-pointer">
        <div className="mr-4" onClick={favoritesListRefetch}>
          <EditOutlined />
          <span className="ml-0.5">转移</span>
        </div>
        <div id={`favorites=${belong_id}`}>
          {deleteCollectionIsLoading ? (
            <LoadingOutlined />
          ) : (
            <Popconfirm
              trigger="hover"
              title="确认取消收藏？"
              // 传递的是belong_id
              onConfirm={() => deleteCollectionRefetch(belong_id)}
              okText="确认"
              cancelText="取消"
              getPopupContainer={() =>
                document.getElementById(`favorites=${belong_id}`) as HTMLElement
              }
            >
              <DeleteOutlined />
              <span className="ml-0.5">删除</span>
            </Popconfirm>
          )}
        </div>
      </div>
    </>
  );
};
export default ToolsBar;
