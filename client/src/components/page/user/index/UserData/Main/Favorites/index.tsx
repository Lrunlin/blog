"use client";

import { startTransition, useState } from "react";
import { useParams } from "next/navigation";
import { Button, Empty, Result, Skeleton, message } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  LockOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import axios from "@axios";
import { response } from "@type/response";
import classNames from "classnames";
import useFetch from "@/common/hooks/useFetch";
import { valuesType } from "@/components/common/CollectionModal/CreateFrom";
import useUserData from "@/store/user/user-data";
import Modal from "./Modal";

interface favoritesListProps {
  id: number;
  name: string;
  is_private: boolean;
  favorites_collection_count: number;
  description: string;
  user_id: number;
}
const FavoritesList = () => {
  let params = useParams();
  let id = params.id as string;
  const [defaultValue, setDefaultValue] = useState<favoritesListProps>();
  const [open, setOpen] = useState(false);
  let userData = useUserData((s) => s.data);
  // 列表获取
  let { data, error, isLoading, refetch, setData } = useFetch(() =>
    axios
      .get<
        response<favoritesListProps[]>
      >(`/favorites/${id}`, { params: { edit: true } })
      .then((res) => res.data.data),
  );
  // 更新收藏夹
  let { isLoading: updateIsLoading, refetch: updateRefetch } = useFetch(
    (values: valuesType) =>
      axios
        .put<response<favoritesListProps[]>>(
          `/favorites/${defaultValue?.id}`,
          values,
        )
        .then((res) => {
          message.success("更新成功");
          refetch();
          setOpen(false);
        })
        .catch((err) => {
          message.error("更新失败");
        }),
    { manual: true },
  );

  const [deleteID, setDeleteID] = useState<null | number>(null);
  //删除收藏夹
  let { refetch: deleteRefetch } = useFetch(
    (id: number) => {
      setDeleteID(id);
      return axios
        .delete<response>(`/favorites/${id}`)
        .then((res) => {
          if (data) {
            setData(
              (data) =>
                data?.filter((item) => item.id != id) as favoritesListProps[],
            );
          }
          message.success("删除成功");
        })
        .catch((err) => {
          message.error("删除失败");
        })
        .finally(() => {
          setDeleteID(null);
        });
    },
    { manual: true },
  );

  return (
    <>
      {isLoading ? (
        <Skeleton active />
      ) : error ? (
        <Result
          status="error"
          title="数据获取错误"
          extra={
            <Button type="primary" onClick={refetch}>
              点击刷新
            </Button>
          }
        ></Result>
      ) : (
        <div>
          {data?.length ? (
            data?.map((item, index) => (
              <div
                key={item.id}
                className={classNames(
                  "group cursor-pointer px-2 py-2",
                  index && "border-0 border-t border-solid border-gray-200",
                )}
              >
                <a
                  href={`/collection/${item.id}`}
                  target="_blank"
                  className="flex items-center text-lg text-black"
                >
                  <span>{item.name}</span>
                  {!!item.is_private && (
                    <LockOutlined className="ml-2 text-gray-400" />
                  )}
                </a>
                <div className="my-1 text-sm text-gray-400">
                  {item.description}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div>
                    {item.favorites_collection_count}
                    <span className="ml-1">篇文章</span>
                  </div>
                  {userData?.id == item.user_id && (
                    <div className="hidden text-gray-500 group-hover:flex">
                      <div
                        className="mr-4"
                        onClick={() => {
                          setDefaultValue(item);
                          startTransition(() => {
                            setOpen(true);
                          });
                        }}
                      >
                        <EditOutlined />
                        <span className="ml-0.5">编辑</span>
                      </div>
                      {deleteID == item.id ? (
                        <div>
                          <SyncOutlined spin />
                        </div>
                      ) : (
                        <div onClick={() => deleteRefetch(item.id)}>
                          <DeleteOutlined />
                          <span className="ml-0.5">删除</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <Empty
              className="py-32"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="列表为空哦"
            />
          )}
        </div>
      )}
      <Modal
        defaultValue={
          defaultValue
            ? { ...defaultValue, is_private: !!defaultValue?.is_private }
            : undefined
        }
        open={open}
        onSubmit={(values) => updateRefetch(values)}
        isLoading={updateIsLoading}
        onCancel={() => setOpen(false)}
      />
    </>
  );
};
export default FavoritesList;
