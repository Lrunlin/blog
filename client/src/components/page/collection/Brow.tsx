import useFetch from "@/common/hooks/useFetch";
import useUserData from "@/store/user-data";
import { DeleteOutlined, EditOutlined, LoadingOutlined } from "@ant-design/icons";
import { RootObject } from "@type/model/favorites-collection-list";
import { message } from "antd";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import type { FC } from "react";
import { useState } from "react";
import FavoritesModal from "./FavoritesModal";

const Brow: FC<{
  favoritesData: RootObject["favorites_data"];
  authorData: RootObject["author_data"];
}> = ({ favoritesData, authorData }) => {
  const [open, setOpen] = useState(false);
  let [userData] = useUserData();
  let searchParams = useSearchParams();
  let router = useRouter();
  let id = searchParams.get("id") as string;
  let { isLoading: deleteIsLoading, refetch: deleteRefetch } = useFetch(
    values =>
      axios
        .delete(`/favorites/${id}`)
        .then(res => {
          message.success("删除成功");
          router.back();
        })
        .catch(err => {
          message.error("删除失败");
          console.log(err);
        }),
    true
  );
  return (
    <>
      <div
        className="h-52 w-full text-white bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(/image/client/collection-bg.jpg)` }}
      >
        <div className="max-w-[1160px] mx-auto">
          <div className="pt-10 flex justify-between items-center">
            <span className="text-3xl">{favoritesData.name}</span>
            {userData?.id == authorData.id && (
              <div className="flex justify-between items-center">
                <div className="mr-6 cursor-pointer" onClick={() => setOpen(true)}>
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
        </div>
      </div>
      <FavoritesModal defaultValue={favoritesData} open={open} onCancel={() => setOpen(false)} />
    </>
  );
};
export default Brow;
