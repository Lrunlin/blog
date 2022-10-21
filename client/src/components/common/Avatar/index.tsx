import { memo } from "react";
import type { FC, ReactNode } from "react";
import { Avatar, Dropdown } from "antd";
import type { AvatarProps } from "antd";
import useUserData from "@/store/user-data";
import useSWR from "swr";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import cookie from "js-cookie";

interface itemPropsType {
  isValidating: boolean;
  data: ReactNode;
}
const Item: FC<itemPropsType> = ({ isValidating, data }) => {
  return <>{isValidating ? <span className="px-1 py-0.5 bg-slate-300"></span> : data}</>;
};

const Menu: FC = () => {
  let router = useRouter();
  let [userData] = useUserData();
  let { data, isValidating } = useSWR(`achievement-user-${userData?.id}`, () =>
    axios.get(`/achievement/${userData?.id}`).then(res => res.data.data)
  );

  return (
    <div className="w-60 p-4 mb-6 bg-white rounded-xl shadow-md border border-solid border-gray-200">
      {/* 顶部 */}
      <div className="flex">
        <Link href={`/user/${userData?.id}`}>
          <a>
            <Avatar size={48} src={userData?.avatar_url} alt={`${userData?.name}头像`} />
          </a>
        </Link>
        <div className="text-lg ml-4 truncate">{userData?.name}</div>
      </div>
      {/* 中间 */}
      <div className="mt-4 flex justify-around">
        <div className="text-center">
          <div className="text-base">关注者</div>
          <div>
            <Item isValidating={isValidating} data={data?.funs_count} />
          </div>
        </div>
        <div className="text-center">
          <div className="text-base">被收藏</div>
          <div>
            <Item isValidating={isValidating} data={data?.article_collection_count} />
          </div>
        </div>
        <div className="text-center">
          <div className="text-base">文章</div>
          <div>
            <Item isValidating={isValidating} data={data?.article_count} />
          </div>
        </div>
      </div>
      {/* 底部 */}
      <div className="text-gray-400 mt-8 flex justify-between">
        <div className="cursor-pointer" onClick={() => router.push("/user/settings/profile")}>
          账号设置
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            cookie.remove("token");
            router.reload();
          }}
        >
          退出登录
        </div>
      </div>
    </div>
  );
};

/** 登录用户的头像（根据userData自动获取链接）*/
const Avatar_: FC<AvatarProps> = memo(props => {
  let [userData] = useUserData();
  return (
    <>
      <Dropdown overlay={<Menu />} placement="bottomRight" trigger={["click"]}>
        <Avatar src={userData?.avatar_url} className="cursor-pointer" alt="头像" {...props} />
      </Dropdown>
    </>
  );
});
export default Avatar_;
