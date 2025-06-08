"use client";

import { Avatar, Divider, Skeleton } from "antd";
import axios from "@axios";
import useFetch from "@/common/hooks/useFetch";
import Notice from "@/components/admin/page/index/notice";
import Image from "@/components/next/Image";
import useUserData from "@/store/user/user-data";

const Index = () => {
  let userData = useUserData((s) => s.data);

  let { data, isLoading } = useFetch(() =>
    axios.get("/statistics/index").then((res) => res.data.data),
  );
  return (
    <>
      {/* 顶部用户信息 */}
      <div className="flex bg-white p-5 shadow-sm">
        <Avatar size={80} src={userData?.avatar_url} alt="用户头像" />
        <div className="ml-4">
          <h2 className="mb-2 font-black">{userData?.name}</h2>
          <div>管理员</div>
        </div>
      </div>
      {/* 项目数据以及大屏入口 */}
      <div className="mt-4 flex items-start justify-between">
        <div className="w-full bg-white p-5 shadow-sm">
          <div className="flex justify-between text-lg">
            <span>开源项目</span>
            <span>{data && data.repository_data?.refresh_time}</span>
          </div>
          <Divider />
          {data ? (
            <div className="flex cursor-pointer justify-between">
              <a
                target="_blank"
                href="/admin/statistics"
                className="text-center"
              >
                <Image
                  width={48}
                  height={48}
                  src="/icon/admin/数据看板.svg"
                  alt="data-icon"
                />
                <div className="mt-1"> 数据分析</div>
              </a>
              <a
                className="block text-center"
                href={data?.repository_data?.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  width={48}
                  height={48}
                  src="/icon/admin/github.svg"
                  alt="github"
                />
                <div className="mt-1">项目地址</div>
              </a>
              <a
                className="block text-center"
                href={data?.repository_data?.homepage}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  width={48}
                  height={48}
                  src="/icon/admin/homepage.svg"
                  alt="homepage"
                />
                <div className="mt-1">网站首页</div>
              </a>
              <div className="text-center">
                <Image
                  width={48}
                  height={48}
                  src="/icon/admin/star.svg"
                  alt="star"
                />
                <div className="mt-1"> {data?.repository_data?.star_count}</div>
              </div>
              <div className="text-center">
                <Image
                  width={48}
                  height={48}
                  src="/icon/admin/fork.svg"
                  alt="fork"
                />
                <div className="mt-1"> {data?.repository_data?.fork_count}</div>
              </div>
              <div className="text-center">
                <Image
                  width={48}
                  height={48}
                  src="/icon/admin/issues.svg"
                  alt="issues"
                />
                <div className="mt-1">
                  {" "}
                  {data?.repository_data?.issues_count}
                </div>
              </div>
              <div className="text-center">
                <Image
                  width={48}
                  height={48}
                  src="/icon/admin/watch.svg"
                  alt="watch"
                />
                <div className="mt-1">
                  {" "}
                  {data?.repository_data?.watch_count}
                </div>
              </div>
            </div>
          ) : isLoading ? (
            <Skeleton active />
          ) : (
            <>加载错误</>
          )}
        </div>
      </div>
      {/* 消息 */}
      <div className="mt-4 bg-white p-5 shadow-sm">
        <div>
          <div className="text-lg">消息通知</div>
          <Divider />
          {data?.notice ? (
            <Notice data={data.notice} />
          ) : isLoading ? (
            <Skeleton active />
          ) : (
            <>加载错误</>
          )}
        </div>
      </div>
    </>
  );
};
export default Index;
