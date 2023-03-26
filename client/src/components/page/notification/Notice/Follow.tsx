import type { FC } from "react";
import { Avatar } from "antd";
import NoFollowLink from "@/components/next/NoFollowLink";
import dayjs from "dayjs";
import type { noticeFollowListType } from "@/pages/notification/[type]";
function _switch(type: keyof typeof map) {
  let map = {
    problem: ["问题", "有了采纳的答案"],
    article: ["博主", "发布了新的文章"],
  };

  let key = Object.keys(map).find(item => type.includes(item)) as string;
  return map[key as keyof typeof map];
}
const ArticleNotice: FC<{ data: noticeFollowListType }> = ({ data }) => {
  let _data = _switch(data.type as any);

  return (
    <>
      <div className="w-10 h-10">
        <NoFollowLink href={`/user/${data.label.user_data.id}`}>
          <Avatar size={40} src={data.label.user_data.avatar_url} alt="用户头像" />
        </NoFollowLink>
      </div>
      <div className="max-w-full ml-6 flex-1">
        <div className="w-3/4 truncate flex mt-0.5">
          你关注的{_data[0]}
          <NoFollowLink href={`/user/${data.label.user_data.id}`} className="font-bold mx-1">
            {data.label.user_data.name}
          </NoFollowLink>
          {_data[1]}
          <NoFollowLink
            href={`/${data.label.type}/${data.label.content_data.id}`}
            className="font-bold mx-1"
          >
            <div className="truncate">{data.label.content_data.title}</div>
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
