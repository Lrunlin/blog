import { Divider, Skeleton, Avatar } from "antd";
import useSWR from "swr";
import axios from "axios";
import useUserState from "@/store/user-data";
import { useRouter } from "next/navigation";
import Notice from "@/components/admin/page/index/notice";
import AdminLayout from "@/layout/Admin/Base";
import Image from "@/components/next/Image";
import Link from "next/link";

const Index = () => {
  let router = useRouter();
  let [userState] = useUserState();

  let { data, isValidating } = useSWR("statistics-data-index", () =>
    axios.get("/statistics/index").then(res => res.data.data)
  );
  return (
    <AdminLayout>
      {/* 顶部用户信息 */}
      <div className="p-5 bg-white shadow-sm flex">
        <Avatar size={80} src={userState?.avatar_url} alt="用户头像" />
        <div className="ml-4">
          <h2 className="mb-2 font-black">{userState?.name}</h2>
          <div>管理员</div>
        </div>
      </div>
      {/* 项目数据以及大屏入口 */}
      <div className="mt-4 flex justify-between items-start">
        <div className="w-full p-5 bg-white shadow-sm">
          <div className="text-lg flex justify-between">
            <span>开源项目</span>
            <span>{data && data.repository_data?.refresh_time}</span>
          </div>
          <Divider />
          {data ? (
            <div className="flex justify-between cursor-pointer">
              <Link
                href="/admin/statistics"
                className="text-center"
              >
                <Image width={48} height={48} src="/icon/admin/数据看板.svg" alt="data-icon" />
                <div className="mt-1"> 数据分析</div>
              </Link>
              <a
                className="text-center block"
                href={data?.repository_data?.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image width={48} height={48} src="/icon/admin/github.svg" alt="github" />
                <div className="mt-1">项目地址</div>
              </a>
              <a
                className="text-center block"
                href={data?.repository_data?.homepage}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image width={48} height={48} src="/icon/admin/homepage.svg" alt="homepage" />
                <div className="mt-1">网站首页</div>
              </a>
              <div className="text-center">
                <Image width={48} height={48} src="/icon/admin/star.svg" alt="star" />
                <div className="mt-1"> {data?.repository_data?.star_count}</div>
              </div>
              <div className="text-center">
                <Image width={48} height={48} src="/icon/admin/fork.svg" alt="fork" />
                <div className="mt-1"> {data?.repository_data?.fork_count}</div>
              </div>
              <div className="text-center">
                <Image width={48} height={48} src="/icon/admin/issues.svg" alt="issues" />
                <div className="mt-1"> {data?.repository_data?.issues_count}</div>
              </div>
              <div className="text-center">
                <Image width={48} height={48} src="/icon/admin/watch.svg" alt="watch" />
                <div className="mt-1"> {data?.repository_data?.watch_count}</div>
              </div>
            </div>
          ) : isValidating ? (
            <Skeleton active />
          ) : (
            <>加载错误</>
          )}
        </div>
      </div>
      {/* 消息 */}
      <div className="mt-8 p-5 bg-white shadow-sm">
        <div>
          <div className="text-lg">消息通知</div>
          <Divider />
          {data?.notice ? (
            <Notice data={data.notice} />
          ) : isValidating ? (
            <Skeleton active />
          ) : (
            <>加载错误</>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};
export default Index;
