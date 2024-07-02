"use client";

import type { FC, ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar } from "antd";
import axios from "@axios";
import cookie from "js-cookie";
import useFetch from "@/common/hooks/useFetch";
import useUserData from "@/store/user/user-data";

interface itemPropsType {
  isValidating: boolean;
  data: ReactNode;
}

const Item: FC<itemPropsType> = ({ isValidating, data }) => {
  return (
    <>
      {isValidating ? <span className="bg-slate-300 px-1 py-0.5"></span> : data}
    </>
  );
};

const Menu: FC = () => {
  let router = useRouter();
  let userData = useUserData((s) => s.data);
  let resetUserData = useUserData((s) => s.refreshData);
  let { data, isLoading } = useFetch(() =>
    axios.get(`/achievement/${userData?.id}`).then((res) => res.data.data),
  );

  return (
    <div className="mb-6 w-60 rounded-xl border border-solid border-gray-200 bg-white p-4 shadow-md">
      {/* 顶部 */}
      <div className="flex">
        <Link href={`/user/${userData?.id}`}>
          <Avatar
            size={48}
            src={userData?.avatar_url}
            alt={`${userData?.name}头像`}
          />
        </Link>
        <div className="ml-4 truncate text-lg">{userData?.name}</div>
      </div>
      {/* 中间 */}
      <div className="mt-4 flex justify-around">
        <div className="text-center">
          <div className="text-base">关注者</div>
          <div>
            <Item isValidating={isLoading} data={data?.funs_count} />
          </div>
        </div>
        <div className="text-center">
          <div className="text-base">被收藏</div>
          <div>
            <Item
              isValidating={isLoading}
              data={data?.article_collection_count}
            />
          </div>
        </div>
        <div className="text-center">
          <div className="text-base">文章</div>
          <div>
            <Item isValidating={isLoading} data={data?.article_count} />
          </div>
        </div>
      </div>
      {/* 底部 */}
      <div className="mt-8 flex justify-between text-gray-400">
        <div
          className="cursor-pointer"
          onClick={() => router.push("/user/settings/profile")}
        >
          账号设置
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            cookie.remove("token", {
              domain: `.${window.location.hostname.split(".").slice(-2).join(".")}`,
            });
            resetUserData();
          }}
        >
          退出登录
        </div>
      </div>
    </div>
  );
};

export default Menu;
