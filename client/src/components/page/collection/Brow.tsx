"use client";

import type { FC } from "react";
import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Avatar, message } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { RightOutlined } from "@ant-design/icons";
import axios from "@axios";
import { RootObject } from "@type/model/favorites-collection-list";
import useFetch from "@/common/hooks/useFetch";
import useUserData from "@/store/user/user-data";
import FavoritesModal from "./FavoritesModal";

const Brow: FC<{
  favoritesData: RootObject["favorites_data"];
  authorData: RootObject["author_data"];
}> = ({ favoritesData, authorData }) => {
  const [open, setOpen] = useState(false);
  let userData = useUserData((s) => s.data);
  let params = useParams();
  let id = params.id as string;
  let router = useRouter();
  let { isLoading: deleteIsLoading, refetch: deleteRefetch } = useFetch(
    () =>
      axios
        .delete(`/favorites/${id}`)
        .then((res) => {
          message.success("删除成功");
          router.back();
        })
        .catch((err) => {
          message.error("删除失败");
          console.log(err);
        }),
    { manual: true },
  );
  return (
    <>
      <div
        className="h-52 w-full bg-cover bg-no-repeat text-white"
        style={{ backgroundImage: `url(/image/client/collection-bg.jpg)` }}
      >
        <div className="mx-auto max-w-[1160px]">
          <div className="flex items-center justify-between pt-10">
            <span className="text-3xl">{favoritesData.name}</span>
            {userData?.id == authorData.id && (
              <div className="flex items-center justify-between">
                <div
                  className="mr-6 cursor-pointer"
                  onClick={() => setOpen(true)}
                >
                  <EditOutlined />
                  <span className="ml-0.5">编辑</span>
                </div>
                {deleteIsLoading ? (
                  <LoadingOutlined />
                ) : (
                  <div className="cursor-pointer" onClick={deleteRefetch}>
                    <DeleteOutlined />
                    <span className="ml-0.5">删除</span>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="my-4 line-clamp-2">{favoritesData.description}</div>
          <div className="flex">
            <Avatar
              className="h-11 w-11"
              src={authorData.avatar_url}
              alt="avatar"
            />
            <div className="ml-2">
              <div className="text-base">{authorData.name}</div>
              <Link
                className="text-sm text-gray-300"
                href={`/user/${authorData.id}?key=collection`}
              >
                更多收藏集
                <RightOutlined size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <FavoritesModal
        defaultValue={favoritesData}
        open={open}
        onCancel={() => setOpen(false)}
      />
    </>
  );
};
export default Brow;
