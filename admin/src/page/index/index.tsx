import { Divider, Empty, Skeleton } from "antd";
import useSWR from "swr";
import axios from "axios";
import useUserState from "@/store/user-state";
import { Link, useNavigate } from "react-router-dom";
import github from "@/assets/icon/github.svg";
import dataIcon from "@/assets/icon/数据看板.svg";
import homepage from "@/assets/icon/homepage.svg";
import star from "@/assets/icon/star.svg";
import fork from "@/assets/icon/fork.svg";
import issues from "@/assets/icon/issues.svg";
import watch from "@/assets/icon/watch.svg";

/** 返回展示用户基本信息的打招呼用于*/
function userMessage() {
  let hour = new Date().getHours();
  let greet =
    hour >= 5 && hour <= 11
      ? ["早上好", "开始一天的工作吧"]
      : hour >= 12 && hour <= 19
      ? ["下午好", "开始一天的工作吧"]
      : ["晚上好", "早一点休息吧"];
  return greet;
}
const Index = () => {
  let navigate = useNavigate();
  let [userState] = useUserState();
  let { data, error, isValidating } = useSWR("statistics-data-index", () =>
    axios.get("/statistics/index").then(res => res.data.data)
  );
  return (
    <>
      {/* 顶部用户信息 */}
      <div className="p-5 bg-white shadow-sm flex">
        <img className="w-20 h-20 rounded-full" src={userState.avatar_url} alt="用户头像" />
        <div className="ml-4">
          <h2 className="mb-2">
            {userMessage()[0]},<b className="mx-1">{userState.name}</b>,{userMessage()[1]}
          </h2>
          <div>{userState.auth == 1 && "管理员"}</div>
          <div>{userState.auth == 0 && "用户"}</div>
        </div>
      </div>
      {/* 项目数据以及大屏入口 */}
      <div className="mt-4 flex justify-between items-start">
        <div className="w-full mr-4 p-5 bg-white shadow-sm">
          <div className="text-lg flex justify-between">
            <span>开源项目</span>
            <span>{data && data.repository_data.refresh_time}</span>
          </div>
          <Divider />
          {error && <>加载错误</>}
          {isValidating && <Skeleton active />}
          {data && (
            <div className="flex justify-between cursor-pointer">
              <div className="text-center" onClick={() => navigate("/statistics")}>
                <img src={dataIcon} alt="data-icon" className="w-12 h-12" />
                <div className="mt-1"> 数据分析</div>
              </div>
              <a
                className="text-center block"
                href={data.repository_data.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={github} alt="github" className="w-12 h-12" />
                <div className="mt-1">项目地址</div>
              </a>
              <a
                className="text-center block"
                href={data.repository_data.homepage}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={homepage} alt="homepage" className="w-12 h-12" />
                <div className="mt-1">网站首页</div>
              </a>
              <div className="text-center">
                <img src={star} alt="star" className="w-12 h-12" />
                <div className="mt-1"> {data.repository_data.star_count}</div>
              </div>
              <div className="text-center">
                <img src={fork} alt="fork" className="w-12 h-12" />
                <div className="mt-1"> {data.repository_data.fork_count}</div>
              </div>
              <div className="text-center">
                <img src={issues} alt="issues" className="w-12 h-12" />
                <div className="mt-1"> {data.repository_data.issues_count}</div>
              </div>
              <div className="text-center">
                <img src={watch} alt="watch" className="w-12 h-12" />
                <div className="mt-1"> {data.repository_data.watch_count}</div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* 消息 */}
      <div className="mt-8 mr-4 p-5 bg-white shadow-sm">
        <div>
          <div className="text-lg">消息通知</div>
          <Divider />
          {error && <>加载错误</>}
          {isValidating && <Skeleton active />}
          {data && (
            <div>
              {!!data.links_count && (
                <div className="flex justify-between">
                  <div>
                    有 <b>{data.links_count}</b> 友情链接申请带处理
                  </div>
                  <Link to="/links">去看看</Link>
                </div>
              )}
              {!!data.comment_count && (
                <div className="flex justify-between">
                  <div>
                    有 <b>{data.comment_count}</b> 条新评论发布
                  </div>
                  <Link to="/comment">去看看</Link>
                </div>
              )}
              {!data.links_count && !data.links_count && <Empty description="没有新的消息" />}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Index;
