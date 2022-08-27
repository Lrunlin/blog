import type { FC } from "react";
import { Avatar, Dropdown } from "antd";
import type { AvatarProps } from "antd";
import useUserData from "@/store/user-data";
import useSWR from "swr";
import axios from "axios";
import { useRouter } from "next/router";

function Menu() {
  let router = useRouter();
  let [userData] = useUserData();
  let { data,  isValidating } = useSWR(`achievement-user-${userData?.id}`, () =>
    axios.get(`/achievement/${userData?.id}`).then(res => res.data.data)
  );

  function Skeleton() {
    return <>{isValidating && <span className="px-1 py-0.5 bg-slate-300"></span>}</>;
  }
  return (
    <div className="w-60 p-4 mb-6 bg-white rounded-xl shadow-md border border-solid border-gray-200">
      {/* 顶部 */}
      <div className="flex">
        <div>
          <Avatar size={48} src={userData?.avatar_url} alt="头像" />
        </div>
        <div className="text-lg ml-4 truncate">{userData?.name}</div>
      </div>
      {/* 中间 */}
      <div className="mt-4 flex justify-around">
        <div className="text-center">
          <div className="text-base">关注者</div>
          <div>
            {data?.funs_count}
            <Skeleton />
          </div>
        </div>
        <div className="text-center">
          <div className="text-base">被收藏</div>
          <div>
            {data?.article_collection_count}
            <Skeleton />
          </div>
        </div>
        <div className="text-center">
          <div className="text-base">文章</div>
          <div>
            {data?.article_count}
            <Skeleton />
          </div>
        </div>
      </div>
      {/* 底部 */}
      <div className="text-gray-400 mt-8 flex justify-between">
        <div className="cursor-pointer" onClick={() => router.push("/user/settings/profile")}>
          我的主页
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            localStorage.removeItem("token");
            router.reload()
          }}
        >
          退出登录
        </div>
      </div>
    </div>
  );
}

/** 登录用户的头像（根据userData自动获取链接）*/
const componentNeme: FC<AvatarProps> = props => {
  let [userData] = useUserData();

  return (
    <>
      <Dropdown overlay={<Menu />} placement="bottomRight" trigger={["click"]}>
        <Avatar src={userData?.avatar_url} className="cursor-pointer" alt="头像" {...props} />
      </Dropdown>
    </>
  );
};
export default componentNeme;
