import type { FC } from "react";
import { Avatar } from "antd";
import NoFollowLink from "@/components/next/NoFollowLink";
import dayjs from "dayjs";
import type { noticeAnswerListType } from "@/pages/notification/[type]";

const ArticleNotice: FC<{ data: noticeAnswerListType }> = ({ data }) => {
  return (
    <>
      <div className="w-10 h-10">
        <NoFollowLink href={`/user/${data.label.user_data.id}`}>
          <Avatar size={40} src={data.label.user_data.avatar_url} alt="用户头像" />
        </NoFollowLink>
      </div>
      <div className="ml-6 max-w-full flex-1">
        <div className="w-3/4 truncate flex mt-0.5">
          用户
          <NoFollowLink href={`/user/${data.label.user_data.id}`} className="font-bold mx-1">
            {data.label.user_data.name}
          </NoFollowLink>
          回答了你的问题
          <NoFollowLink
            href={`/${data.label.type}/${data.label.problem_data.id}`}
            className="font-bold truncate mx-1"
          >
            <div className="max-w-40 truncate">{data.label.problem_data.title}</div>
          </NoFollowLink>
          快去看看吧。
        </div>
        <div className="mt-2 text-gray-400">
          {dayjs(data.create_time).fromNow().replace(" ", "")}
        </div>
      </div>
    </>
  );
};
export default ArticleNotice;
