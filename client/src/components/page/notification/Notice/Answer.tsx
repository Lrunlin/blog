import type { FC } from "react";
import { Avatar } from "antd";
import { noticeAnswerListType } from "@/app/notification/[type]/page";
import dayjs from "@dayjs";
import NoFollowLink from "@/components/next/NoFollowLink";

const ArticleNotice: FC<{ data: noticeAnswerListType }> = ({ data }) => {
  return (
    <>
      <div className="h-10 w-10">
        <NoFollowLink href={`/user/${data.label.user_data.id}`}>
          <Avatar
            size={40}
            src={data.label.user_data.avatar_url}
            alt="用户头像"
          />
        </NoFollowLink>
      </div>
      <div className="ml-6 max-w-full flex-1">
        <div className="mt-0.5 flex w-3/4 truncate">
          用户
          <NoFollowLink
            href={`/user/${data.label.user_data.id}`}
            className="mx-1 font-bold"
          >
            {data.label.user_data.name}
          </NoFollowLink>
          回答了你的问题
          <NoFollowLink
            href={`/${data.label.type}/${data.label.problem_data.id}`}
            className="mx-1 truncate font-bold"
          >
            <div className="max-w-40 truncate">
              {data.label.problem_data.title}
            </div>
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
